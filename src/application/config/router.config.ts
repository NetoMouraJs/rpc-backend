import {Router, Application} from 'express'
import ExpressControllerAdapter from '../adapters/express-controller.adapter'
import GetAllProgrammingTvRepo from '../../infra/repositories/get-all-programming-tv.repo'
import DataConvertHelper from '../../data/usecases/helpers/data-convert.helper'
import LoadProgrammingTvUsecase from '../../data/usecases/load-programming-tv.usecase'
import IndexProgrammersTvController
    from '../../presentation/controllers/index-programmers-tv/index-programmers-tv.controller'
import BuilderProgrammingTvModelHelper from '../../data/usecases/helpers/builder-programming-tv-model.helper'

const routerBuild = Router()

class RouterConfig {
    private static loadRoutesAPI() {
        routerBuild.route('/programming-tv').get(ExpressControllerAdapter.adapt(
            new IndexProgrammersTvController(
                new LoadProgrammingTvUsecase(
                    new GetAllProgrammingTvRepo(),
                    new DataConvertHelper(),
                    new BuilderProgrammingTvModelHelper(),
                ),
            ),
        ))
    }

    static inject(app: Application): void {
        RouterConfig.loadRoutesAPI()
        app.use('/api', routerBuild)
    }
}

export default RouterConfig