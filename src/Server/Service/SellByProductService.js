import SellByProductDAO from '../Datos/SellByProductDAO.js';

class SellByProductService {

   async CreateRow(sbProd) {
      try {
         await new SellByProductDAO().insert(sbProd);
      } catch (error) {
         //Crear un log
      }
   }

   getSBProds(prodId) {
      //traer los sbp de la base
      const result = new SellByProductDAO().getByID(prodId);
      return result;
   }

   getAllSellByProducts() {
      const result = new SellByProductDAO().getSellByProduct();
      return result;
   }

   getSellByProductByProductType(productType) {
      const result = new SellByProductDAO().getSellByProductByProductType(productType);
      return result;
   }

   getSellByProductByName(name) {
      const result = new SellByProductDAO().getSellByProductByName(name);
      return result;
   }

   getSellByProductByCode(code) {
      const result = new SellByProductDAO().getSellByProductByCode(code);
      return result;
   }
}

export default SellByProductService;