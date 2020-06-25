import TelegramBot from 'node-telegram-bot-api';

class Telegram {

    constructor(token) {
       this.Bot = new TelegramBot(token,{polling : true});
    }

   getBot(){
       return this.Bot;
    }
  }

  export default Telegram; 