import {HttpRequest} from '~/application/helpers/http-request.helper'

export default interface BaseController {
    handle(httpRequest: HttpRequest): Promise<HttpResponse>
}