import express from 'express'
import SellByProductService from '../Service/SellByProductService.js';

function getSellByProductRouter() {
    const router = express.Router()
    
    router.post('/getAllSellByProducts', async (req, res) => {
        try {
            let ret  = await new SellByProductService().getAllSellByProducts();
            res.send(ret);
        } catch (err) {
            res.status(err.estado).json(err)
        }
    })

    router.post('/getSellByProductByCode', async (req, res) => {
        let obj=JSON.parse(JSON.stringify(req.body));
        try {
            let ret  = await new SellByProductService().getSellByProductByCode(obj.value);
            res.send(ret);
        } catch (err) {
            res.status(err.estado).json(err)
        }
    })
    
    router.post('/getSellByProductByName', async (req, res) => {
        let obj=JSON.parse(JSON.stringify(req.body));
        try {
            let ret  = await new SellByProductService().getSellByProductByName(obj.value);
            res.send(ret);
        } catch (err) {
            res.status(err.estado).json(err)
        }
    })

    router.post('/getSellByProductByProductType', async (req, res) => {
        let obj=JSON.parse(JSON.stringify(req.body));
        try {
            let ret  = await new SellByProductService().getSellByProductByProductType(obj.value);
            res.send(ret);
        } catch (err) {
            res.status(err.estado).json(err)
        }
    })
    
    return router
}
export default getSellByProductRouter;
