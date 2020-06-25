import DAO from './DAO.js'


class SalesOrderDetailsDAO extends DAO {

    constructor(){
        super()
    }

    async getAll() {
        throw new Error('falta implementar getAll!')
    }

    async getByID(id) {
        throw new Error('falta implementar getByID!')
    }

    async getBySaleOrderID(saleOrderId) {
        try {
            const query = 
            `SELECT 
                s.LATITUDE, s.LONGITUDE, NOW() as SELL_DATE, sd.QUANTITY, sd.SKU
             FROM
                sales_order_detail sd
                    INNER JOIN
                sales_order s ON (sd.SALES_ORDER_ID = s.SALES_ORDER_ID)
            where s.SALES_ORDER_ID='${saleOrderId}'`
            let result = this.client.query(query);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update(obj) {
        throw new Error('falta implementar update!')
    }

    async insert(obj){
        var sql = "INSERT INTO sales_order_detail (QUANTITY,PRICE,SALES_ORDER_ID,SKU) VALUES ?";
        this.client.queryINSERT(sql,obj);
    }

    async delete(id) {
        throw new Error('falta implementar delete!')
    }

    async deleteAll() {
        throw new Error('falta implementar delete!')
    }


}

export default SalesOrderDetailsDAO;
