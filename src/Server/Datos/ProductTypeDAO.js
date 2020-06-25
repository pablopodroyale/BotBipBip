import DAO from './DAO.js'


class ProductTypeDAO extends DAO {

    constructor(){
        super()
    }

    async getAll() {
        try {
            const query = 
            `SELECT
                t.CODE, t.DESCRIPTION, t.PRODUCT_TYPE_ID
            FROM
                product_type AS t
            WHERE
                exists (select 1 from product p where p.PRODUCT_TYPE_ID=t.PRODUCT_TYPE_ID)`;
            let result = this.client.query(query);
            return result;
        } catch (error) {
            return error;
        }
      
    }
   
    async getByID(id){
        try {
            let result = this.client.query(`SELECT * FROM product WHERE PRODUCT_TYPE_ID = '${id}'`);
            return result;
        } catch (error) {
            return error;
        }
    }

    async getByProductTypeByID(id){
        try {
            let result = this.client.query(`SELECT * FROM product_type WHERE PRODUCT_TYPE_ID = '${id}'`);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update(obj) {
        throw new Error('falta implementar update!')
    }
   
    async insert(obj){
        var sql = "INSERT INTO product_type (PRODUCT_TYPE_ID , DESCRIPTION, CODE) VALUES ?";
        this.client.queryINSERT(sql,obj);
    }

    async insertOrUpdate(obj){
        var sql = 
                "INSERT INTO product_type " + 
                "(PRODUCT_TYPE_ID , DESCRIPTION, CODE) VALUES ? AS new " +
                "ON DUPLICATE KEY UPDATE " + 
                "DESCRIPTION = new.DESCRIPTION, " +
                "CODE = new.CODE";
        this.client.queryINSERT(sql,obj);
    }

    async delete(id) {
        throw new Error('falta implementar delete!')
    }

    async deleteAll() {
        var sql = "DELETE FROM product_type";
        this.client.query(sql);
    }
   
    
}

export default ProductTypeDAO;