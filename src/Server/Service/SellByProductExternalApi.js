import ERPConectorFactory from '../Base/ERPConectorFactory.js';
import config from '../../Config.js';

class SellByProductExternalApi {

    async Send(obj) {
        try {
            ERPConectorFactory.getConnector().getWithParams(obj,config.URL_PRODUCT_TYPE);
        } catch (error) {
         //Loggear
        }
    }
}

export default SellByProductExternalApi;