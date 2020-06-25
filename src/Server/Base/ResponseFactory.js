import Response from '../Model/Response.js';
import ResponseCodesEnum from '../Model/Enum/ResponseCodesEnum.js';

class ResponseFactory{
    /**
     * 
     * @param {*} code 
     * @param {*} obj 
     */
    static CreateResponse(code, obj, messagge, isMarkup) {
        let response;
        if (code == undefined) {
            response = new Response(true, ResponseCodesEnum.RES_500, ResponseCodesEnum.RES_500_STR, null);
        } else {
            if (code == ResponseCodesEnum.RES_200) {
                if (isMarkup) {
                    response = new Response(false, ResponseCodesEnum.RES_200, messagge, obj);
                } else {
                    response = new Response(false, ResponseCodesEnum.RES_200, messagge, null);
                }
            } else if (code == ResponseCodesEnum.RES_400) {
                response = new Response(true, ResponseCodesEnum.RES_400, ResponseCodesEnum.RES_400_STR, null);
            } else if (code == ResponseCodesEnum.RES_500) {
                response = new Response(true, ResponseCodesEnum.RES_500, ResponseCodesEnum.RES_500_STR, null);
            } else if (code == ResponseCodesEnum.RES_503) {
                response = new Response(true, ResponseCodesEnum.RES_503, ResponseCodesEnum.RES_503_STR, null);
            } else if (code == ResponseCodesEnum.RES_600) {
                response = new Response(false, ResponseCodesEnum.RES_600, ResponseCodesEnum.RES_600_STR, null);
            } else if (code == ResponseCodesEnum.RES_601) {
                response = new Response(false, ResponseCodesEnum.RES_601, ResponseCodesEnum.RES_601_STR, null);
            } else if (code == ResponseCodesEnum.RES_602) {
                response = new Response(false, ResponseCodesEnum.RES_602, ResponseCodesEnum.RES_602_STR, null);
            } else if (code == ResponseCodesEnum.RES_603) {
                response = new Response(false, ResponseCodesEnum.RES_603, ResponseCodesEnum.RES_603_STR, null);
            } else if (code == ResponseCodesEnum.RES_604) {
                response = new Response(false, ResponseCodesEnum.RES_604, messagge, null);
            } else {
                response = new Response(true, ResponseCodesEnum.RES_500, ResponseCodesEnum.RES_500_STR, null);
            }
        }
        return response;
    }

    static CreateResponseFromERP(obj,messagge,isMarkup){
        let response;
        if (obj == null) {
            response =  new Response(true,ResponseCodesEnum.RES_500,ResponseCodesEnum.RES_500_STR,null);
        }else{
            switch (obj.toString()) {
                case ResponseCodesEnum.RES_200 :
                    if (isMarkup) {
                        response =  new Response(false,ResponseCodesEnum.RES_200,messagge,obj);
                    }else{
                        response =  new Response(false,ResponseCodesEnum.RES_200,messagge,null);
                    }
                    break;
                case ResponseCodesEnum.RES_400:
                    response =  new Response(true,ResponseCodesEnum.RES_400,ResponseCodesEnum.RES_400_STR,null);
                    break;
                case ResponseCodesEnum.RES_500:
                    response =  new Response(true,ResponseCodesEnum.RES_500,ResponseCodesEnum.RES_500_STR,null);
                    break;
                case ResponseCodesEnum.RES_600:
                    response =  new Response(false,200, ResponseCodesEnum.RES_600,ResponseCodesEnum.RES_600_STR,null);
                    break;
                 default:
                    response =  new Response(true,ResponseCodesEnum.RES_500,ResponseCodesEnum.RES_500_STR,null);
                    break;
             }
        }
         return response;
    }
 
 }
 
 export default ResponseFactory;