import express from 'express'
import ProductService from '../Service/ProductService.js';
// import session from '../../main_telegram.js'

function getProductRouter() {
    const router = express.Router()

    router.get('/', async (req, res) => {
        try {
            res.send("res");
            new ProductService().responsefromErp(req.query.mensaje, req.query.SKU, req.query.NAME, req.query.PRICE, req.query.isOffer);
        } catch (err) {
            console.log(err);
        }
    })

    router.get('/reopen', async (req, res) => {
        try {
            res.send("HEYY TAMOS DE VUELTA!!!");
            console.log("HEYY TAMOS DE VUELTA!!!");
            session.open()
            new ProductService().updateDatabase();
        } catch (err) {
            console.log(err);
        }
    })

    router.get('/close', async (req, res) => {
        try {
            res.send("Vamos a cerrar");
            console.log("Vamo a cerrar");
            session.close()
        } catch (err) {
            console.log(err);
        }
    })

    router.put('/', async (req, res) => {
        const productService = new ProductService();
        productService.updateDatabase();
         // TODO: Avisarle a la session que la cocina está abierta
        res.send("res");
    })

    return router
}
export default getProductRouter;
