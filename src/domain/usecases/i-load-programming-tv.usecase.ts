import ProgrammingTvModel from '@/domain/entities/ProgramingTvModel'

export default interface ILoadTvProgrammingUsecase {
    load(date: string, broadcaster: string): Promise<ProgrammingTvModel[]>
}

