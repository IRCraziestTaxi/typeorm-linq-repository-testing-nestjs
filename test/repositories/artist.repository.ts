import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { LinqRepository } from "typeorm-linq-repository";
import { Artist } from "../entities";

export class ArtistRepository extends LinqRepository<Artist> {
    public constructor(
        // NOTE: @InjectDataSource is required to force Nest to wait for the TypeORM connection to be established
        // before typeorm-linq-repository's LinqRepository attempts to get the repository from the data source.
        @InjectDataSource()
            dataSource: DataSource
    ) {
        super(dataSource, Artist);
    }
}
