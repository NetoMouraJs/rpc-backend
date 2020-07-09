export class MissingParamsError extends Error {
    constructor(paramName: string) {
        super(`Parameter missing: ${paramName}`)
        this.name = 'MissingParamsError'
    }
}