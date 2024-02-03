# typeorm-linq-repository-testing-nestjs
Testing helpers for typeorm-linq-repository in a NestJS application.

## Foreword
This library is an extension of [typeorm-linq-repository-testing](https://github.com/IRCraziestTaxi/typeorm-linq-repository-testing) that makes testing [typeorm-linq-repository](https://github.com/IRCraziestTaxi/typeorm-linq-repository) in a NestJS application significantly easier.

The sample tests in this repository make use of the CQRS pattern using `@nestjs/cqrs`, but you can adapt the test cases to your use case if you are doing something different.

## Extending LinqRepositoryMockModule
In order to use `LinqRepositoryMockModule`, you must extend it in your own module that imports and exports your application's repositories.

`repositories-mock.module.ts`
```ts
import { Module } from "@nestjs/common";
import { DataSource } from "typeorm";
import { dataSourceMockFactory } from "typeorm-linq-repository-testing";
import { LinqRepositoryMockModule } from "typeorm-linq-repository-testing-nestjs";
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
```

## Using your extended LinqRepositoryMockModule
Import the module in your unit tests as follows:

`add-artist.handler.spec.ts`
```ts
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
```

## MockLinqRepositoryReturnResultsController
Notice the following line in the above code snippet:

```ts
const returnResultsController = new MockLinqRepositoryReturnResultsController<Artist>();
```

`MockLinqRepositoryReturnResultsController` is the crux of using this library. It allows you to tell your unit test cases what you expect from the repository for a given scenario and return different mock results based on each scenario.

Note that, although the line setting up how to return results is the same in each test case:

```ts
returnResultsController.createComparerSequence(a => a.name === command.name);
```

Since `command.name` is different in each test case, each test case will receive the intended mocked entity from the mock repository given the scenario you are testing.

`MockLinqRepositoryReturnResultsController.createComparerSequence` takes a comma separated list of anonymous functions that will be used during the test case currently being executed. The order of comparer functions provided for the current usage of `createComparerSequence` is the order in which each instance of `getOne` or `getAll` is called on the mock repository during the code path being tested.

A simple `getById` will not use this functionality; it simply returns the record passed in each mock repository's `records` array whose `id` (or equivalent configured property) property matches the argument provided to `getById`.

When testing code that uses `getOne` or `getAll`, however, if you provided a `MockLinqRepositoryReturnResultsController` to the mock repository, then you must provide one comparer function per instance of `getOne` or `getAll` encountered during the code path being tested for the test case calling `createComparerSequence`. If no `MockLinqRepositoryReturnResultsController` was provided, then the mock repository will simply return the first record for `getOne` or all records for `getAll`.

Therefore, if the code path being tested calls `getOne` or `getAll` with a `where` or similar defined, you must provide a `MockLinqRepositoryReturnResultsController` to the mock repository and you must provide a sequence of comparer functions whose length matches the number of times `getOne` and `getAll` are collectively called in the code path being tested.

Note that the sample code above depicts a simple scenario in which `getOne` is only called once in the code being tested. If the repository being mocked in the code being tested has multiple instances of `getOne` and/or `getAll`, then more than one comparer function must be passed to `createComparerSequence`.

```ts
returnResultsController.createComparerSequence(
    x => /* ... */,
    x => /* ... */,
    // ...
);
```

If at any time `getOne` or `getAll` is called on the mock repository and not enough comparer functions were provided to `createComparerSequence`, an error will be thrown with the message `"Comparer function was not found."`. If `createComparerSequence` was not called for each test case where it is needed, then an error will be thrown with the message `"Comparer sequence was not found."`.
