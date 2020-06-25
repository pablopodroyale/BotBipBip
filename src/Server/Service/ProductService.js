import ProductExternalApi from './ProductExternalApi.js';
import ERPConnector from '../Base/ERPConnector.js';
import config from '../../Config.js';
import Response from '../Model/Response.js';
import ResponseCodesEnum from '../Model/Enum/ResponseCodesEnum.js';
import ResponseFactory from '../Base/ResponseFactory.js';
import Mapper from '../Helper/Mapper.js';
import MessaggeEnum from '../Model/Enum/MessaggeEnum.js';
import ProductTypeDAO from '../Datos/ProductTypeDAO.js';
import ProductDAO from '../Datos/ProductDAO.js';
import BotFactory from '../Base/BotFactory.js';

class ProductService   {

    async getProductTypeFromERP(){
      try {
         const result =   await new ProductExternalApi().getProductType();
         //agregamos los datos del ERP
         let pTypes = Mapper.mapProductTypeListToMatrix(result);
         const productTypeDAO = new ProductTypeDAO()
         const prom = productTypeDAO.insertOrUpdate(pTypes);
         return prom;

     } catch (error) {
         return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_500,null);
     }
    }

   async getProductType(){
      let resp;
        const result = await new ProductTypeDAO().getAll();
        if (result.length == 0) {
          resp =  ResponseFactory.CreateResponse(ResponseCodesEnum.RES_604,null,"No hay productos" ,false);

        }else{
          const pTypes = Mapper.MapJsonToButtonsProductType(result);
          let opts = {
              parse_mode: 'Markdown',
              reply_markup: JSON.stringify({
                inline_keyboard: pTypes
              })
            };
            resp =  ResponseFactory.CreateResponse(ResponseCodesEnum.RES_200,opts,MessaggeEnum.SHOW_CATEGORIES,true);
        }
        return resp;
    }

    async getProductsByCategory(idCat){
      let resp;
        const catSelected = await new ProductTypeDAO().getByProductTypeByID(idCat);
        const result = await new ProductTypeDAO().getByID(idCat);
      if (result.length == 0) {
        resp =  ResponseFactory.CreateResponse(ResponseCodesEnum.RES_604,null,"Lo sentimos, no hay productos en esta categoría. Probaste con un yogurt" ,false);
      }else{
        const pTypes = Mapper.MapJsonToButtonsProducts(result);
        let opts = {
            parse_mode: 'Markdown',
            reply_markup: JSON.stringify({
              inline_keyboard: pTypes
            })
          };
          resp =  ResponseFactory.CreateResponse(ResponseCodesEnum.RES_200,opts,"Mis " + catSelected[0].DESCRIPTION + " son:" ,true);
      }
       return resp;
   }

    async getProductsFromERP(){
      try {
        const result = await new ProductExternalApi().getProducts();
        //agregamos los datos del ERP
        let prods = Mapper.mapProductListToMatrix(result);
        const productDAO = new ProductDAO()
        const prom = productDAO.insertOrUpdate(prods);
        return prom;
      } catch (error) {
          return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_500,null);
      }
    }

    async deleteProducts(){

      const productDAO = new ProductDAO()
      const prom = productDAO.deleteAll();
      return prom;
    }

  async deleteProductTypes() {
    const productTypeDAO = new ProductTypeDAO()
    const prom = productTypeDAO.deleteAll();
    return prom;
  }

    responsefromErp(mensaje,sku, name, price, isOffer){
      let bot = BotFactory.getBotInstance();
      let response = {
        NAME: name,
        SKU:sku,
        PRICE: price
      }
      if (isOffer) {
        let lst = [];
        let obj = {
          NAME:name,
          SKU:sku,
          PRICE:price
        }
        lst.push(obj);
        const pTypes = Mapper.MapJsonToButtonsProducts(lst);
        let opts = {
            parse_mode: 'Markdown',
            reply_markup: JSON.stringify({
              inline_keyboard: pTypes
            })
          };
          bot.Bot.sendMessage("1084012981",mensaje,opts);
      }else{
        bot.Bot.sendMessage("1084012981",mensaje);
      }
      
      return result;
      // bot.Bot.sendMessage("1084012981",response);
  }

  /*
  UPDATE A LO GRONE
  updateDatabase() {
    //delete productos y después tipo de productos
    const promise = this.deleteProducts();
    promise.then(firstResult => {
      const deletePromise = this.deleteProductTypes()
      deletePromise.then(secondRresult => {
        //insert tipo de productos y después productos
        const insertPromise = this.getProductTypeFromERP();
        insertPromise.then((thirdResult) => {
          this.getProductsFromERP();
        })
      })
    })
  }
  */
  updateDatabase() {
    //update insert de productos y después tipo de productos
    const promise = this.getProductTypeFromERP();
    promise.then((thirdResult) => {
      this.getProductsFromERP();
    })
  }

  deleteDatabase(){
    const promise = this.deleteProducts();
    promise.then(firstResult => {
      const deletePromise = this.deleteProductTypes()
    })
  }

}

  export default ProductService;
