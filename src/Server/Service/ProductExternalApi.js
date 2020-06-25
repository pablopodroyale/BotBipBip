import ERPConectorFactory from '../Base/ERPConectorFactory.js';
import config from '../../Config.js';
import ResponseCodesEnum from '../Model/Enum/ResponseCodesEnum.js';
import ResponseFactory from '../Base/ResponseFactory.js';

class ProductExternalApi {

    async getProductType() {
        try {
            const result = await ERPConectorFactory.getConnector().get(config.URL_PRODUCT_TYPE);
            return result;
        } catch (error) {
            return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_500, null);
        }

    }

    async getProducts() {
        try {
            const result = await ERPConectorFactory.getConnector().get(config.URL_PRODUCT);
            return result;
        } catch (error) {
            return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_500, null);
        }

    }
}

export default ProductExternalApi;