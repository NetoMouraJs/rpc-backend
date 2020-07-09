export default class ProgrammingTvModel {
    title: string
    description: string
    on_air: boolean
    start_time: Date
    end_time: Date
    logoUrl: string
    imgUrl: string
    duration: number

    constructor(title?: string, description?: string, on_air?: boolean, start_time?: Date, end_time?: Date, logoUrl?: string, imgUrl?: string, duration?: number) {
        this.title = title
        this.description = description
        this.start_time = start_time
        this.end_time = end_time
        this.logoUrl = logoUrl
        this.imgUrl = imgUrl
        this.duration = duration
    }
}
