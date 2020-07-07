import { TvProgrammingModel } from '@/domain/entities/TvProgramingModel';

export interface LoadTvProgrammingUsecase {
    load(date:Date, broadcaster:string):Promise<TvProgrammingModel[]>        
}

