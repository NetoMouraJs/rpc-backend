import searchBroadCasterCodeHelper from './helper/search-code-broradcaster.helper'
import {IGetAllProgrammingTvRepo} from '../get-all-programming-tv.interface.repo'
import globoApiServerHelper from './helper/globo-api-server.helper'

class GetAllProgrammingTvRepo implements IGetAllProgrammingTvRepo {

    async run(date: Date, broadcaster: string): Promise<any> {
        const broadCasterID = searchBroadCasterCodeHelper(broadcaster)
        // Ano - Mes - Dia
        const apiResponse = await globoApiServerHelper.get(`/${broadCasterID}/?date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate().toString()}`)
        return apiResponse
    }
}

export default GetAllProgrammingTvRepo