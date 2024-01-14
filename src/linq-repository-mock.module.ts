import { DynamicModule, Module, Provider } from "@nestjs/common";
import { DataSource } from "typeorm";
import { EntityRepositoryRecordsPair, MockLinqRepository, dataSourceMockFactory } from "typeorm-linq-repository-testing";
import { EntityBase } from "typeorm-linq-repository/src/types/EntityBase";

const mockRepositoriesProvider = (pairs: EntityRepositoryRecordsPair<unknown>[]): Provider[] => pairs.map(p => ({
    provide: p.repository,
    useFactory: () => new MockLinqRepository(p.records, p.returnResultsController)
}));

@Module({})
export class LinqRepositoryMockModule {
    public static withMockRecords<
        T1 extends EntityBase
    >(
        appRepositories: Provider[],
        pair1: EntityRepositoryRecordsPair<T1>
    ): DynamicModule;
    public static withMockRecords<
        T1 extends EntityBase,
        T2 extends EntityBase
    >(
        appRepositories: Provider[],
        pair1: EntityRepositoryRecordsPair<T1>,
        pair2: EntityRepositoryRecordsPair<T2>
    ): DynamicModule;
    public static withMockRecords<
        T1 extends EntityBase,
        T2 extends EntityBase,
        T3 extends EntityBase
    >(
        appRepositories: Provider[],
        pair1: EntityRepositoryRecordsPair<T1>,
        pair2: EntityRepositoryRecordsPair<T2>,
        pair3: EntityRepositoryRecordsPair<T3>
    ): DynamicModule;
    public static withMockRecords<
        T1 extends EntityBase,
        T2 extends EntityBase,
        T3 extends EntityBase,
        T4 extends EntityBase
    >(
        appRepositories: Provider[],
        pair1: EntityRepositoryRecordsPair<T1>,
        pair2: EntityRepositoryRecordsPair<T2>,
        pair3: EntityRepositoryRecordsPair<T3>,
        pair4: EntityRepositoryRecordsPair<T4>
    ): DynamicModule;
    public static withMockRecords<
        T1 extends EntityBase,
        T2 extends EntityBase,
        T3 extends EntityBase,
        T4 extends EntityBase,
        T5 extends EntityBase
    >(
        appRepositories: Provider[],
        pair1: EntityRepositoryRecordsPair<T1>,
        pair2: EntityRepositoryRecordsPair<T2>,
        pair3: EntityRepositoryRecordsPair<T3>,
        pair4: EntityRepositoryRecordsPair<T4>,
        pair5: EntityRepositoryRecordsPair<T5>
    ): DynamicModule;
    public static withMockRecords<
        T1 extends EntityBase,
        T2 extends EntityBase,
        T3 extends EntityBase,
        T4 extends EntityBase,
        T5 extends EntityBase,
        T6 extends EntityBase
    >(
        appRepositories: Provider[],
        pair1: EntityRepositoryRecordsPair<T1>,
        pair2: EntityRepositoryRecordsPair<T2>,
        pair3: EntityRepositoryRecordsPair<T3>,
        pair4: EntityRepositoryRecordsPair<T4>,
        pair5: EntityRepositoryRecordsPair<T5>,
        pair6: EntityRepositoryRecordsPair<T6>
    ): DynamicModule;
    public static withMockRecords<
        T1 extends EntityBase,
        T2 extends EntityBase,
        T3 extends EntityBase,
        T4 extends EntityBase,
        T5 extends EntityBase,
        T6 extends EntityBase,
        T7 extends EntityBase
    >(
        appRepositories: Provider[],
        pair1: EntityRepositoryRecordsPair<T1>,
        pair2: EntityRepositoryRecordsPair<T2>,
        pair3: EntityRepositoryRecordsPair<T3>,
        pair4: EntityRepositoryRecordsPair<T4>,
        pair5: EntityRepositoryRecordsPair<T5>,
        pair6: EntityRepositoryRecordsPair<T6>,
        pair7: EntityRepositoryRecordsPair<T7>
    ): DynamicModule;
    public static withMockRecords<
        T1 extends EntityBase,
        T2 extends EntityBase,
        T3 extends EntityBase,
        T4 extends EntityBase,
        T5 extends EntityBase,
        T6 extends EntityBase,
        T7 extends EntityBase,
        T8 extends EntityBase
    >(
        appRepositories: Provider[],
        pair1: EntityRepositoryRecordsPair<T1>,
        pair2: EntityRepositoryRecordsPair<T2>,
        pair3: EntityRepositoryRecordsPair<T3>,
        pair4: EntityRepositoryRecordsPair<T4>,
        pair5: EntityRepositoryRecordsPair<T5>,
        pair6: EntityRepositoryRecordsPair<T6>,
        pair7: EntityRepositoryRecordsPair<T7>,
        pair8: EntityRepositoryRecordsPair<T8>
    ): DynamicModule;
    public static withMockRecords<
        T1 extends EntityBase,
        T2 extends EntityBase,
        T3 extends EntityBase,
        T4 extends EntityBase,
        T5 extends EntityBase,
        T6 extends EntityBase,
        T7 extends EntityBase,
        T8 extends EntityBase,
        T9 extends EntityBase
    >(
        appRepositories: Provider[],
        pair1: EntityRepositoryRecordsPair<T1>,
        pair2: EntityRepositoryRecordsPair<T2>,
        pair3: EntityRepositoryRecordsPair<T3>,
        pair4: EntityRepositoryRecordsPair<T4>,
        pair5: EntityRepositoryRecordsPair<T5>,
        pair6: EntityRepositoryRecordsPair<T6>,
        pair7: EntityRepositoryRecordsPair<T7>,
        pair8: EntityRepositoryRecordsPair<T8>,
        pair9: EntityRepositoryRecordsPair<T9>
    ): DynamicModule;
    public static withMockRecords<
        T1 extends EntityBase,
        T2 extends EntityBase,
        T3 extends EntityBase,
        T4 extends EntityBase,
        T5 extends EntityBase,
        T6 extends EntityBase,
        T7 extends EntityBase,
        T8 extends EntityBase,
        T9 extends EntityBase,
        T10 extends EntityBase
    >(
        appRepositories: Provider[],
        pair1: EntityRepositoryRecordsPair<T1>,
        pair2: EntityRepositoryRecordsPair<T2>,
        pair3: EntityRepositoryRecordsPair<T3>,
        pair4: EntityRepositoryRecordsPair<T4>,
        pair5: EntityRepositoryRecordsPair<T5>,
        pair6: EntityRepositoryRecordsPair<T6>,
        pair7: EntityRepositoryRecordsPair<T7>,
        pair8: EntityRepositoryRecordsPair<T8>,
        pair9: EntityRepositoryRecordsPair<T9>,
        pair10: EntityRepositoryRecordsPair<T10>
    ): DynamicModule;
    public static withMockRecords<
        T1 extends EntityBase,
        T2 extends EntityBase,
        T3 extends EntityBase,
        T4 extends EntityBase,
        T5 extends EntityBase,
        T6 extends EntityBase,
        T7 extends EntityBase,
        T8 extends EntityBase,
        T9 extends EntityBase,
        T10 extends EntityBase
    >(
        appRepositories: Provider[],
        pair1: EntityRepositoryRecordsPair<T1>,
        pair2?: EntityRepositoryRecordsPair<T2>,
        pair3?: EntityRepositoryRecordsPair<T3>,
        pair4?: EntityRepositoryRecordsPair<T4>,
        pair5?: EntityRepositoryRecordsPair<T5>,
        pair6?: EntityRepositoryRecordsPair<T6>,
        pair7?: EntityRepositoryRecordsPair<T7>,
        pair8?: EntityRepositoryRecordsPair<T8>,
        pair9?: EntityRepositoryRecordsPair<T9>,
        pair10?: EntityRepositoryRecordsPair<T10>
    ): DynamicModule {
        const definedPairs = [
            pair1,
            pair2,
            pair3,
            pair4,
            pair5,
            pair6,
            pair7,
            pair8,
            pair9,
            pair10
        ].filter(p => !!p);
        const providers = [
            ...appRepositories,
            {
                provide: DataSource,
                useFactory: dataSourceMockFactory
            },
            ...mockRepositoriesProvider(definedPairs)
        ];

        return {
            providers,
            exports: providers,
            module: LinqRepositoryMockModule
        };
    }
}
