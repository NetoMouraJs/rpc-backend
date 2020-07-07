import { TvProgrammingModel } from '@/domain/entities/TvProgramingModel';

export interface LoadTvProgrammingRpcUsecase {
    load(date:Date):Promise<TvProgrammingModel[]>        
}

