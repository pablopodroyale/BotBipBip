import express from 'express'
import SalesOrderService from '../Service/SalesOrderService.js';

function getSalesOrderRouter() {
    const router = express.Router()
    router.get('/', async (req, res) => {

    })

    router.post('/updateOrder', async (req, res) => {
        try {
            let obj=JSON.parse(JSON.stringify(req.body));
            new SalesOrderService().updateOrder(obj.telegramId, obj.saleOrderId,obj.orderNumber, obj.statusCode,obj.status)
            res.send("ok");
        } catch (err) {
            res.send(err);
        }
    })
    router.post('/closeOrder', async (req, res) => {
        try {
            let obj=JSON.parse(JSON.stringify(req.body));
            new SalesOrderService().closeOrder(obj.telegramId, obj.saleOrderId,obj.orderNumber, obj.statusCode,obj.status);
        res.send("ok");
    } catch (err) {
        res.send(err);
    }
    })


    return router
}
export default getSalesOrderRouter;
