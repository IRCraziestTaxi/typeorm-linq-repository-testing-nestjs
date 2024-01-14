import { Test, TestingModule } from "@nestjs/testing";
import { GenericResponse, Rejection } from "@responsekit/core";
import { TsSimpleAutomapperModule } from "ts-simple-automapper-nestjs";
import { nameof } from "ts-simple-nameof";
import { MockLinqRepositoryReturnResultsController } from "typeorm-linq-repository-testing";
import { Artist, ArtistType } from "../entities";
import { RepositoriesMockModule } from "../modules/repositories-mock.module";
import { ArtistRepository, ArtistTypeRepository, appRepositories } from "../repositories";
import { AddArtistCommand } from "./add-artist.command";
import { AddArtistHandler } from "./add-artist.handler";

describe(nameof(AddArtistHandler), () => {
    const mockArtistType1 = new ArtistType();
    mockArtistType1.id = 1;
    mockArtistType1.name = "Painter";
    const mockArtistType2 = new ArtistType();
    mockArtistType2.id = 2;
    mockArtistType2.name = "Musician";
    const mockArtist = new Artist();
    mockArtist.artistTypeId = 1;
    mockArtist.name = "John Doe";
    const returnResultsController = new MockLinqRepositoryReturnResultsController<Artist>();
    let handler: AddArtistHandler;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TsSimpleAutomapperModule.forRoot(),
                RepositoriesMockModule.withMockRecords(
                    appRepositories,
                    {
                        records: [mockArtist],
                        repository: ArtistRepository,
                        returnResultsController
                    },
                    {
                        records: [mockArtistType1, mockArtistType2],
                        repository: ArtistTypeRepository
                    }
                )
            ],
            providers: [AddArtistHandler]
        }).compile();

        handler = module.get<AddArtistHandler>(AddArtistHandler);
    });

    it("should add artist if IDs are valid and no artist with same name exists", async () => {
        const command = new AddArtistCommand();
        command.artistTypeId = mockArtistType1.id;
        command.name = "Jane Doe";
        returnResultsController.createComparerSequence(a => a.name === command.name);
        const result = await handler.execute(command);
        expect(result).toBeInstanceOf(GenericResponse);
    });

    it("should throw rejection if artist with same name exists", async () => {
        const command = new AddArtistCommand();
        command.artistTypeId = mockArtistType1.id;
        command.name = mockArtist.name;
        returnResultsController.createComparerSequence(a => a.name === command.name);
        let rejection: Rejection;

        try {
            await handler.execute(command);
        }
        catch (error) {
            rejection = error;
        }

        expect(rejection).toBeInstanceOf(Rejection);
        expect(rejection.message).toBe("An artist with that name already exists.");
    });

    it("should throw rejection if invalid artist type ID is provided", async () => {
        const command = new AddArtistCommand();
        command.artistTypeId = 3;
        command.name = "Jane Doe";
        returnResultsController.createComparerSequence(a => a.name === command.name);
        let rejection: Rejection;

        try {
            await handler.execute(command);
        }
        catch (error) {
            rejection = error;
        }

        expect(rejection).toBeInstanceOf(Rejection);
        expect(rejection.message).toBe("Invalid artist type ID.");
    });
});
