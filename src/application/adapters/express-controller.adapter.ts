import {Request, RequestHandler, Response} from 'express'
import BaseController from '../../presentation/controllers/base.controller'
import {HttpRequest} from '../helpers/http-request.helper'

class ExpressControllerAdapter {
    static adapt(controller: BaseController): RequestHandler {
        if (!controller.handle) {
            throw new Error('Method handle on controller not exists')
        }

        return async (request: Request, response: Response) => {
            const {body, params, query} = request

            const httpRequest: HttpRequest = {body, params, query}

            const httpResponse: HttpResponse = await controller.handle(httpRequest)

            response.status(httpResponse.statusCode).json({
                body: httpResponse.body,
            })
        }
    }
}

export default ExpressControllerAdapter