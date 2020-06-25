import ResponseCodesEnum from '../Model/Enum/ResponseCodesEnum.js';
import ResponseFactory from '../Base/ResponseFactory.js';
import BotFactory from '../Base/BotFactory.js';
import SalesOrderExternalApi from './SalesOrderExternalApi.js';
import SalesOrderDAO from '../Datos/SalesOrderDAO.js';
import Mapper from '../Helper/Mapper.js';
import SalesOrderDetailsDAO from '../Datos/SalesOrderDetailsDAO.js';
import SellByProductDAO from '../Datos/SellByProductDAO.js';


class SalesOrderService {

    async CreateOrder(order) {
        try {
            const result = await new SalesOrderExternalApi().Create(order);
            if (result.response.code == ResponseCodesEnum.RES_600) {

            } else if (result.response.code == ResponseCodesEnum.RES_402) {
                return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_402, null, "El pedido no fue tomado, Error en datos", false);
            } else if (result.response.code == ResponseCodesEnum.RES_200) {
                order.id = result.saleOrderId
                order.status = result.statusCode
                for (var i = 0; i < order.salesOrderDetail.length; i++) {
                    order.salesOrderDetail[i].saleOrderId = result.saleOrderId;
                }
                const saleOrder = new SalesOrderDAO();
                const saleOrderDetail = new SalesOrderDetailsDAO();
                const promise = saleOrder.insert(Mapper.mapSaleOrderToMatrix(order));
                promise.then((result) => {
                    const detailProm = saleOrderDetail.insert(Mapper.mapSaleOrderDetailToMatrix(order));
                })
                return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_200, null, "Pedido creado con éxito, cuando sea confirmado se le enviara el nro de pedido", false);
            } else {
                return ResponseFactory.CreateResponse(result.response.code, null);
            }
        } catch (error) {
            return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_500, null);
        }
    }

    updateOrder(telegramId, orderId,orderNumber, statusCode,status) {
        const saleOrder = new SalesOrderDAO();
        const promise = saleOrder.updateSaleOrderStatus(orderId,orderNumber,statusCode);
        let bot = BotFactory.getBotInstance();
        let message = `Tu Orden: ${orderNumber} esta ${status}`;
        bot.Bot.sendMessage(telegramId, message);
    }

    closeOrder(telegramId, orderId,orderNumber, statusCode,status) {
        const saleOrderDao = new SalesOrderDAO();
        const saleOrderDetailDao=new SalesOrderDetailsDAO();
        const sellByProductDAO=new SellByProductDAO();
        const promise = saleOrderDao.updateSaleOrderStatus(orderId,orderNumber,statusCode);
        promise.then((result) => {
           let detprom=saleOrderDetailDao.getBySaleOrderID(orderId);
           detprom.then((result) => {
            const detailProm = sellByProductDAO.insert(Mapper.mapSaleOrderDetailInfoToMatrix(result));
            })
        })
        let bot = BotFactory.getBotInstance();
        let message = `Tu Orden: ${orderNumber} Fue ${status}. Gracias por utilizar nuestros servicios!!!`;
        bot.Bot.sendMessage(telegramId, message);
    }
}

export default SalesOrderService;