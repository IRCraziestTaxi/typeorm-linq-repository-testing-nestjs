import { Ignore, MapFrom } from "ts-simple-automapper";
import { nameof } from "ts-simple-nameof";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ArtistType } from "./artist-type.entity";
import { AddArtistCommand } from "../commands/add-artist.command";

@Entity()
export class Artist {
    @Ignore()
    @ManyToOne(() => ArtistType, at => at.artists)
    @JoinColumn({ name: nameof<Artist>(a => a.artistTypeId) })
    public artistType: ArtistType;

    @MapFrom(() => AddArtistCommand)
    @Column({ nullable: false })
    public artistTypeId: number;

    @Ignore()
    @PrimaryGeneratedColumn()
    public id: number;

    @MapFrom(() => AddArtistCommand)
    @Column({ nullable: false })
    public name: string;
}
