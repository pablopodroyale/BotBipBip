import DAO from './DAO.js'


class SellByProductDAO extends DAO {

    constructor(){
        super()
    }

    async getAll() {
        try {
            let result = this.client.query("select * from sell_by_product");
            return result;
        } catch (error) {
            return error;
        }

    }

    async getByID(id){
        try {
            let result;
            if (id != undefined) {
                result =  await  this.client.query(`SELECT * FROM sell_by_product WHERE SKU = '${id}'`);
            }else{
                result = await  this.getAll();
            }
            return result;
        } catch (error) {
            return error;
        }
    }

    async update(obj) {
        throw new Error('falta implementar update!')
    }

    async insert(obj){
        var sql = "INSERT INTO sell_by_product (LATITUDE, LONGITUDE,SELL_DATE, QUANTITY,SKU) VALUES ?";
        this.client.queryINSERT(sql,obj);
    }

    async delete(id) {
        throw new Error('falta implementar delete!')
    }

    async deleteAll() {
        var sql = "DELETE FROM sell_by_product";
        this.client.query(sql);
    }

    async getSellByProduct() {
        try {
            const query = 
            `SELECT 
            p.NAME, s.LATITUDE, s.LONGITUDE
             FROM
            sell_by_product s
                INNER JOIN
            product p ON (s.SKU = p.SKU)
                INNER JOIN
            product_type pt ON p.PRODUCT_TYPE_ID = pt.PRODUCT_TYPE_ID`
            let result = this.client.query(query);
            return result;
        } catch (error) {
            return error;
        }
    }

    async getSellByProductByCode(code) {
        try {
            const query = 
            `SELECT 
                p.NAME, s.LATITUDE, s.LONGITUDE
            FROM
                sell_by_product s
                    INNER JOIN
                product p ON (s.SKU = p.SKU)
                    INNER JOIN
                product_type pt ON p.PRODUCT_TYPE_ID = pt.PRODUCT_TYPE_ID
            where p.SKU='${code}'`
            let result = this.client.query(query);
            return result;
        } catch (error) {
            return error;
        }
    }
    
    async getSellByProductByName(productName) {
        try {
            const query = 
            `SELECT 
                p.NAME, s.LATITUDE, s.LONGITUDE
            FROM
                sell_by_product s
                    INNER JOIN
                product p ON (s.SKU = p.SKU)
                    INNER JOIN
                product_type pt ON p.PRODUCT_TYPE_ID = pt.PRODUCT_TYPE_ID
            where lower(p.NAME) like lower('%${productName}%')`
            let result = this.client.query(query);
            return result;
        } catch (error) {
            return error;
        }
    }

    async getSellByProductByProductType(productType) {
        try {
            const query = 
            `SELECT 
                p.NAME, s.LATITUDE, s.LONGITUDE
            FROM
                sell_by_product s
                    INNER JOIN
                product p ON (s.SKU = p.SKU)
                    INNER JOIN
                product_type pt ON p.PRODUCT_TYPE_ID = pt.PRODUCT_TYPE_ID
            where pt.PRODUCT_TYPE_ID='${productType}'`
            let result = this.client.query(query);
            return result;
        } catch (error) {
            return error;
        }
    }


}

export default SellByProductDAO;
