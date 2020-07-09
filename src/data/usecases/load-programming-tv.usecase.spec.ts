import {MissingParamsError} from '~/presentation/utils/errors'
import {IGetAllProgrammingTvRepo} from '~/infra/get-all-programming-tv.interface.repo'
import ProgrammingTvModel from '~/domain/entities/ProgramingTvModel'
import LoadProgrammingTvUsecase from '~/data/usecases/load-programming-tv.usecase'
import {IDateConvertHelper} from '~/data/usecases/helpers/data-convert.helper'
import {IBuilderProgrammingTvModelHelper} from '~/data/usecases/helpers/builder-programming-tv-model.helper'

class BuilderProgrammingTvModelHelperSpy implements IBuilderProgrammingTvModelHelper {
    programmingTvModelMock: ProgrammingTvModel[]

    build(obj: any): ProgrammingTvModel[] {
        return this.programmingTvModelMock
    }
}

const makeBuilderProgrammingTvModelHelperSpy = () => {

    const builderProgrammingTvModelHelperSpy = new BuilderProgrammingTvModelHelperSpy()
    builderProgrammingTvModelHelperSpy.programmingTvModelMock = [
        new ProgrammingTvModel('any_title', 'any_description', false, new Date(1), new Date(1), 'any_logoUrl', 'any_imgUrl', 1),
    ]
    return builderProgrammingTvModelHelperSpy
}

class DateConvertHelperSpy implements IDateConvertHelper {
    dateMock: Date
    stringMock: string

    convToDate(value: string): Date {
        return this.dateMock
    }

    convToString(value: Date): string {
        return this.stringMock
    }
}

const makeDateConvertHelperSpy = () => {
    const dateConvertHelperSpy = new DateConvertHelperSpy()
    dateConvertHelperSpy.dateMock = new Date('2020-7-6')
    return dateConvertHelperSpy
}

class GetAllProgrammingTvRpcRepoSpec implements IGetAllProgrammingTvRepo {
    public date: Date
    public broadcaster: string
    public programmingTvsMock: any

    async run(date: Date, broadcaster: string): Promise<any[]> {
        this.date = date
        this.broadcaster = broadcaster
        return this.programmingTvsMock
    }
}

const makeGetAllProgrammingTvRpcRepoSpec = () => {
    const getAllProgrammingTvRpcRepoSpec = new GetAllProgrammingTvRpcRepoSpec()
    getAllProgrammingTvRpcRepoSpec.programmingTvsMock = []
    return getAllProgrammingTvRpcRepoSpec
}

class GetAllProgrammingTvRpcRepoSpecWithError implements IGetAllProgrammingTvRepo {
    run(date: Date, broadcaster: string): Promise<any> {
        throw new Error()
    }
}

const makeGetAllProgrammingTvRpcRepoSpecWithError = () => {
    return new GetAllProgrammingTvRpcRepoSpecWithError()
}

interface IMakeSut {
    sut: LoadProgrammingTvUsecase;
    getAllProgrammingTvRpcRepo: GetAllProgrammingTvRpcRepoSpec;
    dateConvertHelper: DateConvertHelperSpy
}

const makeSut = (): IMakeSut => {
    const getAllProgrammingTvRpcRepo = makeGetAllProgrammingTvRpcRepoSpec()
    const dateConvertHelper = makeDateConvertHelperSpy()
    const builderProgrammingTvModelHelper = makeBuilderProgrammingTvModelHelperSpy()

    const sut = new LoadProgrammingTvUsecase(getAllProgrammingTvRpcRepo, dateConvertHelper, builderProgrammingTvModelHelper)

    return {
        sut,
        getAllProgrammingTvRpcRepo,
        dateConvertHelper,
    }
}

describe('LoadRpcProgrammingTV', () => {
    test('Deve garantir que a data e a emissora seja passada para a dependencia do componente sobre teste', async () => {
        const {sut, getAllProgrammingTvRpcRepo} = makeSut()
        await sut.load(new Date('2020-7-6'), 'any_broadcast')

        return expect(getAllProgrammingTvRpcRepo.date).toEqual(new Date('2020-7-6'))
    })

    test('Deve garantir que se a data não for fornecida, lançar uma exceção MissingParams', async () => {
        const {sut} = makeSut()
        const promise = sut.load(undefined, undefined)

        return expect(promise).rejects.toThrow(new MissingParamsError('date'))
    })


    test('Deve garantir que se alguma exceção for lançada pela dependencia lance também', async () => {

        const sut = new LoadProgrammingTvUsecase(makeGetAllProgrammingTvRpcRepoSpecWithError(), makeDateConvertHelperSpy(), makeBuilderProgrammingTvModelHelperSpy())
        const promise = sut.load(undefined, undefined)

        return expect(promise).rejects.toThrow(new MissingParamsError('date'))
    })
})
