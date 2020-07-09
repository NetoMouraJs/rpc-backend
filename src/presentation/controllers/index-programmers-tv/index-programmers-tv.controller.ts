import {HttpRequest} from '~/application/helpers/http-request.helper'
import ServerResponseApiHelper from '~/application/helpers/server-response-api.helper'
import BaseController from '../base.controller'
import ILoadTvProgrammingUsecase from '~/domain/usecases/i-load-programming-tv.usecase'

class IndexProgrammersTvController implements BaseController {
    private readonly _loadProgrammingTv: ILoadTvProgrammingUsecase

    constructor(loadProgrammingTv: ILoadTvProgrammingUsecase) {
        this._loadProgrammingTv = loadProgrammingTv
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {
            const {date, broadcast} = httpRequest.query

            const programmingTvs = await this._loadProgrammingTv.load(date, broadcast)

            return ServerResponseApiHelper.ok(programmingTvs)
        } catch (e) {
            const err: Error = e

            return ServerResponseApiHelper.serverError()
        }
        return Promise.resolve(undefined)
    }
}

export default IndexProgrammersTvController