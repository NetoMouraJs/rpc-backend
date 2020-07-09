export interface IGetAllProgrammingTvRepo {
    run(date: Date, broadcaster: string): Promise<any>
}