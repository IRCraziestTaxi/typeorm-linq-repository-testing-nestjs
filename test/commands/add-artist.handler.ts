import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CommandResult, GenericResponse, Rejection } from "@responsekit/core";
import { Mapper } from "ts-simple-automapper";
import { Artist } from "../entities";
import { ArtistRepository, ArtistTypeRepository } from "../repositories";
import { AddArtistCommand } from "./add-artist.command";

@CommandHandler(AddArtistCommand)
export class AddArtistHandler implements ICommandHandler<AddArtistCommand> {
    public constructor(
        private readonly _artistRepository: ArtistRepository,
        private readonly _artistTypeRepository: ArtistTypeRepository,
        private readonly _mapper: Mapper
    ) {}

    public async execute(command: AddArtistCommand): Promise<CommandResult<number>> {
        const existingNameArtist = await this._artistRepository
            .getOne()
            .where(a => a.name)
            .equal(command.name);

        if (existingNameArtist) {
            throw Rejection.BadRequest("An artist with that name already exists.");
        }

        const artistType = await this._artistTypeRepository.getById(command.artistTypeId);

        if (!artistType) {
            throw Rejection.BadRequest("Invalid artist type ID.");
        }

        const addArtist = this._mapper.map(command, new Artist());
        const createdArtist = await this._artistRepository.create(addArtist);

        return new GenericResponse({
            value: createdArtist.id
        });
    }
}
