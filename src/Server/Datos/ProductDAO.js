import DAO from './DAO.js'


class ProductDAO extends DAO {

    constructor(){
        super()
    }

    async getAll() {
        try {
            let result = this.client.query("select * from product");
            return result;
        } catch (error) {
            return error;
        }

    }

    async getByID(id){
        try {
            let result = this.client.query(`SELECT * FROM product WHERE PRODUCT_ID = '${id}'`);
            return result;
        } catch (error) {
            return error;
        }
    }

    /*async getByProductTypeByID(id){
        try {
            let result = this.client.query(`SELECT * FROM product WHERE PRODUCT_TYPE_ID = '${id}'`);
            return result;
        } catch (error) {
            return error;
        }
    }*/

    async update(obj) {
        throw new Error('falta implementar update!')
    }

    async insert(obj){
        var sql = "INSERT INTO product (NAME, PRICE, SKU, BRAND_NAME, PRODUCT_TYPE_ID) VALUES ?";
        this.client.queryINSERT(sql,obj);
    }

    async insertOrUpdate(obj){
        var sql = 
        "INSERT INTO product " + 
        "(NAME, PRICE, SKU, BRAND_NAME, PRODUCT_TYPE_ID) VALUES ? AS new " +
        "ON DUPLICATE KEY UPDATE " + 
        "NAME = new.NAME," +
        "PRICE = new.PRICE";
        this.client.queryINSERT(sql,obj);
    }

    async delete(id) {
        throw new Error('falta implementar delete!')
    }

    async deleteAll() {
        var sql = "DELETE FROM product";
        this.client.query(sql);
    }


}

export default ProductDAO;
