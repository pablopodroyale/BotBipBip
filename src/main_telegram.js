import SessionHandler from './Server/Service/Sessions.js'
import BotServer from './Server/app.js'
import Config from './Config.js';
import enumMsg from './Server/Model/Enum/ResponseCodesEnum.js'

const server = new BotServer();
const bot = server.getBot();


//////////////////////////////////////////////////////////////
const session = new SessionHandler();
server.start(Config.config.port);

/************************************************************
 * Esto esta para asegurarse que el servidor
 * siempre termine adecuadamente
*/

process.stdin.resume();//so the program will not close instantly

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler.bind(null, { exit: true }));
process.on('SIGUSR2', exitHandler.bind(null, { exit: true }));

/*************************************************************/

/**
 * Basic Bot listener  
 */
bot.onText(/./, (msg) => {
  // Catch any msg and process it with a nice state pattern
  let chatId = msg.chat.id;
  console.log(chatId);
  if (session.isOpen()) { // Are we open?
    session.getOrAdd(chatId).action(msg)
      .then(function (result) {
        if (result.obj) {
          bot.sendMessage(chatId, result.mensaje, result.obj);
        } else {
          bot.sendMessage(chatId, result.mensaje);
        }
      });
  } else { // We are not
    bot.sendMessage(chatId, enumMsg.RES_503_STR);
  }
});

// Button callback
bot.on('callback_query', data => {
  let option = data.data.toString();
  console.log(option);

  let chatId = data.from.id;
  if (session.isOpen()) { // Are we open?
    let userSession = session.getUserSession(chatId) //get session
    if (userSession) {
      console.log("I've got you fam")
      userSession.action(option)
        .then(function (result) {
          if (result.obj) {
            bot.sendMessage(chatId, result.mensaje, result.obj);
          } else {
            bot.sendMessage(chatId, result.mensaje);
          }
        });
    } else {
      let msg = "No se como lo hiciste pero entraste donde no debias"
      bot.sendMessage(chatId, msg);
    }
  } else { // We are not
    bot.sendMessage(chatId, enumMsg.RES_503_STR);
  }

});

// Store phone and ask for Email
bot.on("contact", (msg) => {
  console.log(msg.contact)
  let chatId = msg.chat.id;
  if (session.isOpen()) { // Are we open?
    let userSession = session.getUserSession(chatId) //get session
    if (userSession) {
      console.log("You are someone")
      userSession.action(msg)
        .then(function (result) {
          // TODO: Fix this. Idk how to check for obj not null
          if (result.obj) {
            bot.sendMessage(chatId, result.mensaje, result.obj);
          } else {
            bot.sendMessage(chatId, result.mensaje);
          }
        });
    } else {
      let msg = "No se como lo hiciste pero entraste donde no debias"
      bot.sendMessage(chatId, msg);
    }
  } else { // We are not
    bot.sendMessage(chatId, enumMsg.RES_503_STR);
  }
});

// Store phone and ask for Email
bot.on("location", (msg) => {
  console.log(msg.location)
  let chatId = msg.chat.id;
  if (session.isOpen()) { // Are we open?
    let userSession = session.getUserSession(chatId) //get session
    if (userSession) {
      userSession.location = msg.location;
      userSession.action(msg)
        .then(function (result) {
          if (result.obj) {
            bot.sendMessage(chatId, result.mensaje, result.obj);
          } else {
            bot.sendMessage(chatId, result.mensaje);
          }
        });
    } else {
      let msg = "No se como lo hiciste pero entraste donde no debias"
      bot.sendMessage(chatId, msg);
    }
  } else { // We are not
    bot.sendMessage(chatId, enumMsg.RES_503_STR);
  }
});


async function exitHandler(options, exitCode) {
  // await app.disconnect()

  if (options.cleanup) {
    await app.disconnect()
    console.log('\nprograma finalizado normalmente')
  }
  if (exitCode || exitCode === 0) {
    console.log(`\nprograma finalizado con codigo: ${exitCode}`)
  }
  if (options.exit) {
    process.exit()
  }
}

export default session;