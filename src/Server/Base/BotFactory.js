import BotBrandEnum from '../Model/Enum/BotBrandEnum.js';
import Telegram from '../Model/Telegram.js';
let telegramBot = null

function getBotInstance(token) {
    if (!telegramBot) {
        telegramBot = new Telegram(token)
    }
    return telegramBot
}


// class BotFactory{
//    static CreateBot(brand,token){
//        let bot;
//         switch (brand) {
//             case BotBrandEnum.TELEGRAM_BOT:
//                 bot =  new Telegram(token);
//                 break;
//             default:
//                 bot = new Telegram(token);
//                 break;
//         }
//         return bot;
//    }


class BotFactory{
   static getBotInstance(brand,token){
       let bot;
        switch (brand) {
            case BotBrandEnum.TELEGRAM_BOT:
                bot =  getBotInstance(token);
                break;
            default:
                bot = getBotInstance(token);
                break;
        }
        return bot;
   }

}
export default BotFactory;