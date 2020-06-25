import ClientExternalApi from './ClientExternalApi.js';
import ResponseCodesEnum from '../Model/Enum/ResponseCodesEnum.js';
import MessaggeEnum from '../Model/Enum/MessaggeEnum.js';
import ResponseFactory from '../Base/ResponseFactory.js';
import Response from '../Model/Response.js';
// import express from 'express';
class ClientService {
    async getClientById(userId) {
        // [FIXME] I'm hardcoding this shit. This should be a switch

        let kMarkup;
        try {
            const telegramId = {
                "telegramId": userId
            }

            const result = await new ClientExternalApi().getClientById(telegramId);
            let evalCode = result.response.code.toString();
            if (evalCode == ResponseCodesEnum.RES_404) {
                kMarkup = {
                    "parse_mode": "Markdown",
                    "reply_markup": {
                        "one_time_keyboard": true,
                        "keyboard": [[{
                            text: "registrarse",
                            request_contact: true
                        }]]
                    }
                };
                return new Response(false, ResponseCodesEnum.RES_404, MessaggeEnum.SHOW_REGISTER, kMarkup);
            } else if (evalCode == ResponseCodesEnum.RES_200) {
                return new Response(false, ResponseCodesEnum.RES_200, MessaggeEnum.ALREADY_REGISTERED, false);
            }else if (result.response.code == ResponseCodesEnum.RES_503) {
                return new Response(true, ResponseCodesEnum.RES_503, ResponseCodesEnum.RES_503_STR, false);
            } else if (evalCode == ResponseCodesEnum.RES_600) {
                return new Response(true, ResponseCodesEnum.RES_600, MessaggeEnum.SHOW_TOKEN_ERROR, false);
            } else if (evalCode == ResponseCodesEnum.RES_601) {
                return new Response(true, ResponseCodesEnum.RES_601, ResponseCodesEnum.RES_601_STR, false);
            } else if (evalCode == ResponseCodesEnum.RES_602) {
                return new Response(true, ResponseCodesEnum.RES_602, ResponseCodesEnum.RES_602_STR, false);
            } else if (evalCode == ResponseCodesEnum.RES_603) {
                return new Response(true, ResponseCodesEnum.RES_603, ResponseCodesEnum.RES_603_STR, false);
            } else {
                return new Response(true, ResponseCodesEnum.RES_500, ResponseCodesEnum.RES_500_STR, false);
            }
        } catch (error) {
            return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_500, null, null);
        }

    }


    async createClient(userData) {
        let kMarkup;
        try {

            const party = {
                "name": userData["name"],
                "lastName": userData["lastName"],
                "movilePhone": userData["phone"],
                "mail": userData["email"]
            }

            const customer = {
                "telegramId": userData["telegramId"],
                "party": party
            }

            const result = await new ClientExternalApi().createClient(customer);
            if (result.response.code == ResponseCodesEnum.RES_404) {
                kMarkup = {
                    "parse_mode": "Markdown",
                    "reply_markup": {
                        "one_time_keyboard": true,
                        "keyboard": [[{
                            text: "registrarse",
                            request_contact: true
                        }]]
                    }
                };
                return new Response(false, ResponseCodesEnum.RES_404, MessaggeEnum.SHOW_REGISTER, kMarkup);
            } else if (result.response.code == ResponseCodesEnum.RES_600) {
                return new Response(true, ResponseCodesEnum.RES_600, MessaggeEnum.SHOW_TOKEN_ERROR, false);
            }else if (result.response.code == ResponseCodesEnum.RES_503) {
                return new Response(true, ResponseCodesEnum.RES_503, ResponseCodesEnum.RES_503_STR, false);
            } else {
                return new Response(false, ResponseCodesEnum.RES_404, MessaggeEnum.ALREADY_REGISTERED, false);
            }
        } catch (error) {
            return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_500, null, null);
        }

    }
}

export default ClientService;