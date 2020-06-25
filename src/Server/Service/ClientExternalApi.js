import ERPConnector from '../Base/ERPConnector.js';
import config from '../../Config.js';
import ResponseCodesEnum from '../Model/Enum/ResponseCodesEnum.js';
import ResponseFactory from '../Base/ResponseFactory.js';
import Mapper from '../Helper/Mapper.js';

class ClientExternalApi extends ERPConnector {
    async getClientById(id) {
        try {
            const result = await new ERPConnector().getWithParams(id,config.URL_GET_CUSTOMER_BY_ID);
            return result;
        } catch (error) {
            return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_500, null);
        }
    }

    async createClient(client) {
        try {
            const result = await new ERPConnector().getWithParams(client,config.URL_CREATE_CUSTOMER);
            return result;
        } catch (error) {
            return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_500, null);
        }
    }
}

export default ClientExternalApi;