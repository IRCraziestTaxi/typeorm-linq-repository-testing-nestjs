import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import { dataSourceMockFactory } from "typeorm-linq-repository-testing";
import { LinqRepositoryMockModule } from "../../src";
import { appRepositories } from "../repositories";

@Module({
    providers: [
        ...appRepositories,
        {
            provide: DataSource,
            useFactory: dataSourceMockFactory
        }
    ],
    exports: [
        ...appRepositories
    ]
})
export class RepositoriesMockModule extends LinqRepositoryMockModule {}
