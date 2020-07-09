import express, {Application} from 'express'

class MiddlewaresConfig {
    static inject(app: Application) {
        //Cors
        app.use((req, res, next) => {
            res.set('access-control-allow-origin', '*')
            res.set('access-control-allow-methods', '*')
            res.set('access-control-allow-headers', '*')
            next()
        })

        app.use(express.json())
    }
}

export default MiddlewaresConfig