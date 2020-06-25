import request from 'request-promise';

import config from '../../Config.js';

class ERPConnector {
    async login() {
       const User = {
            user: '',
            password: ''
        };
        const toSend = Object.create(User);
        toSend.user = config.ERP_USER;
        toSend.password = config.ERP_PASS;
        const getOptions = {
            method: 'GET',
            uri: config.URL_LOGIN,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authorization
            },
            body: {
                "params": JSON.stringify(toSend)
            }
        }
        const result = await request(getOptions);
        return result.token;
    }

    async manageToken() {
        const getOptions = {
            method: 'GET',
            uri: config.URL_VALIDATE_TOKEN,
            json: true,
            headers: {
                'Authorization': this.authorization
            }
        }
        const result = await request(getOptions);
       if (result.token===null){
           const tokenNuevo =await this.login();
           this.authorization=tokenNuevo;
       }
    }

   async getWithParams(objectToSend, url) {
        const token = await this.manageToken();
        const getOptions = {
            method: 'GET',
            uri: url,
            json: true,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.authorization
            },
            body: {
                "params": JSON.stringify(objectToSend)
            }
        }
        return request(getOptions);
    }

    async get(url) {
        const token = await this.manageToken();
        const getOptions = {
            method: 'GET',
            uri: url,
            json: true,
            headers: {
                'Authorization': this.authorization
            }
        }
        return request(getOptions);
    }
}

export default ERPConnector;
