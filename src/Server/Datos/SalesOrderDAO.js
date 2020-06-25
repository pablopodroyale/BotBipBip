import DAO from './DAO.js'


class SalesOrderDAO extends DAO {

    constructor(){
        super()
    }

    async getAll() {
        throw new Error('falta implementar getAll!')
    }

    async getByID(id) {
        throw new Error('falta implementar getByID!')
    }

    async update(obj) {
        throw new Error('falta implementar update!')
    }

    async insert(obj){
        var sql = "INSERT INTO sales_order (SALES_ORDER_ID, STATUS, TOTAL, LATITUDE, LONGITUDE, CLIENT_TELEGRAM_ID) VALUES ?";
        this.client.queryINSERT(sql,obj);
    }

    async updateSaleOrderStatus(id,number,status){
        var sql = "UPDATE sales_order SET STATUS = '"+status+"', SALES_ORDER_NUMBER = '"+number+"' WHERE (SALES_ORDER_ID = '"+id+"')"
        this.client.query(sql);
    }

    async delete(id) {
        throw new Error('falta implementar delete!')
    }

    async deleteAll() {
        throw new Error('falta implementar delete!')
    }


}

export default SalesOrderDAO;
