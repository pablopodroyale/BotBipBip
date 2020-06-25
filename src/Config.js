import dotenv from 'dotenv'
dotenv.config();
const BOT_TYPE = "Telegram";
const BOT_TOKEN = process.env.TELEGRAM_BOT;

const URL_PRODUCT_TYPE = 'http://localhost:8080/IntegratedBussinesManagerWeb/rest/productTypes';
const URL_PRODUCT = 'http://localhost:8080/IntegratedBussinesManagerWeb/rest/products';
const URL_LOGIN = 'http://localhost:8080/IntegratedBussinesManagerWeb/rest/login';
const URL_VALIDATE_TOKEN = 'http://localhost:8080/IntegratedBussinesManagerWeb/rest/validateToken';
const URL_GET_CUSTOMER_BY_ID = "http://localhost:8080/IntegratedBussinesManagerWeb/rest/getCustomerByTelegramID";
const URL_CREATE_CUSTOMER = "http://localhost:8080/IntegratedBussinesManagerWeb/rest/createCustomer";
const URL_CREATE_ORDER = "http://localhost:8080/IntegratedBussinesManagerWeb/rest/createOrder";

const ERP_USER = process.env.ERP_USER;
const ERP_PASS = process.env.ERP_PASS;
const currentEnv = 'dev'

const envs = {
    prod: {
        port: process.env.PROD_PORT,
        mode: process.env.PROD_MODE,
        db: {
            client: process.env.PROD_DB_CLIENT,
            name: process.env.PROD_DB_NAME,
            cnxStr: process.env.PROD_DB_CNX_STR
        }
    },
    dev: {
        port: process.env.DEV_PORT,
        mode: process.env.DEV_MODE,
        db: {
            client: process.env.DEV_DB_CLIENT,
            name: process.env.DEV_DB_NAME,
            dbPath: process.env.DEV_DB_PATH
        },
        erp:{
            user: process.env.ERP_USER,
            password : process.env.ERP_PASS
        }
    }
}

const config = {
    port: envs[currentEnv].port,
    mode: envs[currentEnv].mode,
    db: envs[currentEnv].db,
    debugLevel: process.env.DEBUG_LEVEL || 5
}


export default{
    BOT_TYPE,
    BOT_TOKEN,
    URL_PRODUCT_TYPE,
    URL_PRODUCT,
    URL_LOGIN,
    URL_GET_CUSTOMER_BY_ID,
    URL_VALIDATE_TOKEN,
    URL_CREATE_CUSTOMER,
    URL_CREATE_ORDER,
    ERP_USER,
    ERP_PASS,
    config
}
