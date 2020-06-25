// import ProductExternalApi from './ProductExternalApi.js';
import ResponseCodesEnum from '../Model/Enum/ResponseCodesEnum.js';
import ResponseFactory from '../Base/ResponseFactory.js';
import Mapper from '../Helper/Mapper.js';
import MessaggeEnum from '../Model/Enum/MessaggeEnum.js';
import BotFactory from '../Base/BotFactory.js';

class UserService   {
   
    // async getProductType(){
    //   try {
    //      const result = await new ProductExternalApi().getProductType();
    //      const pTypes = Mapper.MapJsonToProductType(result);
    //      let opts = {
    //          parse_mode: 'Markdown',
    //          reply_markup: JSON.stringify({
    //            inline_keyboard: pTypes
    //          })
    //        };
    //      return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_200,opts,MessaggeEnum.SHOW_CATEGORIES);s
    //  } catch (error) {
    //      return ResponseFactory.CreateResponse(ResponseCodesEnum.RES_500,null);
    //  }
    // }

    responsefromErp(response){
        let bot = BotFactory.getBotInstance();
        let result = ResponseFactory.CreateResponse(response,MessaggeEnum.CLIENT_ADD,false);
        if (result.codigo != 200) {
            bot.Bot.sendMessage("1084012981",result.mensaje);
        }else{
            bot.Bot.sendMessage("1084012981",result.mensaje);
        }
        return result;
        // bot.Bot.sendMessage("1084012981",response);
    }
    
  }
  
  export default UserService;