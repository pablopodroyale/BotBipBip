import ERPConectorFactory from '../Base/ERPConectorFactory.js';
import config from '../../Config.js';
import ResponseCodesEnum from '../Model/Enum/ResponseCodesEnum.js';
import ResponseFactory from '../Base/ResponseFactory.js';

class SalesOrderExternalApi {

    async Create(order) {
        try {
            const result = await ERPConectorFactory.getConnector().getWithParams(order,config.URL_CREATE_ORDER);
            return result;
        } catch (error) {
            return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_500, null);
        }

    }
}

export default SalesOrderExternalApi;