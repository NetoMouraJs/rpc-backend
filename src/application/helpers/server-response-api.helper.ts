import {ServerError} from '../../presentation/utils/errors/server.error'

class ServerResponseApiHelper {
    static ok(body: any): HttpResponse {
        const data = body

        return {
            statusCode: 200,
            body: data,
        }
    }

    static serverError(): HttpResponse {
        return {
            statusCode: 500,
            body: new ServerError().message,
        }
    }
}

export default ServerResponseApiHelper