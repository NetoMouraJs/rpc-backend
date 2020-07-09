import express, {Application} from 'express'

import RouterConfig from './router.config'

class App {
    private readonly server: Application

    constructor() {
        this.server = express()
        this.setupConfig(this.server)
    }

    run() {
        return this.server
    }

    setupConfig(app: Application) {
        RouterConfig.inject(app)
    }
}

export default new App().run()