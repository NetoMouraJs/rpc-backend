import ILoadTvProgrammingUsecase from '~/domain/usecases/i-load-programming-tv.usecase'
import {IGetAllProgrammingTvRepo} from '~/infra/get-all-programming-tv.interface.repo'
import {IDateConvertHelper} from './helpers/data-convert.helper'
import ProgrammingTvModel from '~/domain/entities/ProgramingTvModel'
import {MissingParamsError} from '~/presentation/utils/errors'
import {IBuilderProgrammingTvModelHelper} from './helpers/builder-programming-tv-model.helper'

export default class LoadProgrammingTvUsecase implements ILoadTvProgrammingUsecase {
    private readonly _getAllProgrammingTvRepo: IGetAllProgrammingTvRepo
    private readonly _dateConvertHelper: IDateConvertHelper
    private readonly _builderProgrammingTvModel: IBuilderProgrammingTvModelHelper

    constructor(getAllProgrammingTvRepo: IGetAllProgrammingTvRepo, dateConvertHelper: IDateConvertHelper, builderProgrammingTvModel: IBuilderProgrammingTvModelHelper) {
        this._getAllProgrammingTvRepo = getAllProgrammingTvRepo
        this._dateConvertHelper = dateConvertHelper
        this._builderProgrammingTvModel = builderProgrammingTvModel
    }

    async load(date, broadcast: string): Promise<ProgrammingTvModel[]> {

        if (!date) {
            throw new MissingParamsError('date')
        }

        if (!broadcast) {
            throw new MissingParamsError('broadcast')
        }

        const dateConvert: Date = this._dateConvertHelper.convToDate(date)

        const programmingTv = await this._getAllProgrammingTvRepo.run(dateConvert, broadcast)

        const builderProgrammingTvModel: ProgrammingTvModel[] = this._builderProgrammingTvModel.build(programmingTv)

        return builderProgrammingTvModel
    }
}