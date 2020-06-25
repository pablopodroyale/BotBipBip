import ProductTypeDAO from '../Datos/ProductTypeDAO.js';

class ETLNegocio{
    constructor(){
      
    }
    async BadgeProccess(){
        //Traer las categorias del Product external api
        //Las mapeo si es necesario
        let productTypes = [
            ['1','1', 'Alfajores'],
            ['2','2', 'Gaseosas'],
          ];
          //Mandarlas al product type dao
         const ret = await new ProductTypeDAO().insert(productTypes);

    }
}

export default ETLNegocio;