import express from 'express'
// import DbClientFactory from '../server/db/DBClientFactory.js'
// import { getCategoriasServicio } from './Negocio/Erp/CategoriaNegocio.js'
import BotFactory from './Base/BotFactory.js';
import Config from '../Config.js';
import DBClientFactory from './db/DBClientFactory.js';
import getUserRouter from './Router/UserRouter.js';
import getSalesOrderRouter from './Router/SalesOrderRouter.js';
import getProductRouter from './Router/ProductRouter.js';
import getSellByProductRouter from './Router/SellByProductRouter.js';
// import getUserRouter from './Router/UserRouter.js.js';
import ProductService from './Service/ProductService.js';
import bodyParser from 'body-parser';

class App {
    constructor() {
        const bot = BotFactory.getBotInstance(Config.BOT_TYPE, Config.BOT_TOKEN).getBot();
        this.bot = bot;

        this.dbClient = DBClientFactory.getDbClient()

        const app = express()
        app.use(express.json())
        app.use(bodyParser.urlencoded({ extended: false }));
        app.set('json spaces', 4);
        app.use('/telegram_api/User', getUserRouter())
        app.use('/telegram_api/Product', getProductRouter())
        app.use('/telegram_api/SalesOrder', getSalesOrderRouter())
        app.use('/telegram_api/SellByProduct', getSellByProductRouter())
        this.app = app;
        const productService = new ProductService();
        productService.updateDatabase();
    }

    getBot() {
        return this.bot;
    }

    getDBClient() {
        return this.dbClient;
    }

    //    setOnReady(cb) {
    //         this.app.on('app_ready', cb)
    //     }

    async start(port) {
        // await this.dbClient.connect()

        //NO CAMBIAR, DEJAR SIN EL IF
        port = 8081

        const server = this.app.listen(port, () => {
            const actualPort = server.address().port
            this.app.emit("app_ready", actualPort)
        })
    }

    async disconnect() {
        await this.dbClient.disconnect()
    }

    async testMySQL() {
        await this.dbClient.test()
    }
}
export default App
