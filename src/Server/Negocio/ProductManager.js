
class ProductManager   {

    constructor() {
        if (!ProductManager.instance) {
            ProductManager.instance = new ProductManager();
        }
    }
  
    getInstance() {
        return ProductManager.instance;
    }
    
    UpdateProductTypeCache(lstProds){
        //Guardar lista en base de datos 
    }
  }
  
  export default ProductManager;