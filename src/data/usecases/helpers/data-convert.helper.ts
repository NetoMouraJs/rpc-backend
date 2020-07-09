export interface IDateConvertHelper {
    convToDate(value: string): Date

    convToString(value: Date): string
}

export default class DataConvertHelper implements IDateConvertHelper {

    convToDate(value: string): Date {
        return new Date(value)
    }

    convToString(value: Date): string {
        throw new Error('Method not Implemented')
    }
}