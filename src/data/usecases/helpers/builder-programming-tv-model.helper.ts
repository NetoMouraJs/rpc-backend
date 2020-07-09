import ProgrammingTvModel from '../../../domain/entities/ProgramingTvModel'

export interface IBuilderProgrammingTvModelHelper {
    build(obj: any): ProgrammingTvModel[]
}

const verifyOnAir = (time: number, start_time_tv: number, end_time_tv: number): boolean => {

    const validStart = new Date(start_time_tv * 1000).getTime()
    const validEnd = new Date(end_time_tv * 1000).getTime()

    return time >= validStart && time <= validEnd
}

export default class BuilderProgrammingTvModelHelper implements IBuilderProgrammingTvModelHelper {
    build(obj: any): ProgrammingTvModel[] {
        if (obj instanceof Object) {
            console.log(obj.data.programme.date)
            const programmingTvAPI = obj.data.programme.entries

            const dateNow: number = this.getTv()

            return programmingTvAPI.reduce((acum, programmingTv) => {
                const programmingTvModel = new ProgrammingTvModel()
                programmingTvModel.title = programmingTv.title
                programmingTvModel.description = programmingTv.description
                programmingTvModel.start_time = programmingTv.start_time
                programmingTvModel.end_time = programmingTv.end_time
                programmingTvModel.duration = programmingTv.duration_in_minutes
                programmingTvModel.imgUrl = programmingTv.custom_info.Graficos.ImagemURL
                programmingTvModel.logoUrl = programmingTv.custom_info.Graficos.LogoURL

                const onAir = verifyOnAir(dateNow, programmingTv.start_time, programmingTv.end_time)
                programmingTvModel.on_air = onAir

                acum.push(programmingTvModel)
                return acum
            }, [])
        }
        return []
    }

    getTv(): number {
        const dateNow = new Date(Date.now())
        // const dateNow = new Date(Date.now())

        let NextDayStart = 0

        // 0 - Domingo, 6 - Sabado
        const weekend = [0, 6]

        // 6 Sexta
        // 7 Sabado
        // 0 domingo

        console.log(dateNow.getDay())

        // Finais de semana rotacionao a programaçao mais tarde
        if (weekend.indexOf(dateNow.getDay()) > -1) {
            // Durante a final de semana as programaçoes começao de 5 Hrs da manha
            NextDayStart = 5
        } else {
            // Durante a semana as programaçoes começao de 4 Hrs da manha
            NextDayStart = 4
        }

        console.log(dateNow.getHours())

        if (dateNow.getHours() < NextDayStart) {
            const day = dateNow.getDate()
            dateNow.setDate(day - 1)
        }

        return dateNow.getTime()
    }
}