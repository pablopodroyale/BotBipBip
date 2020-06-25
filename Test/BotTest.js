import crearCliente from './Cliente.js';
import Config from '../src/Config.js';
const id_chat = '1084012981';

import app from '../src/Server/app.js';

async function TestSignUpNotExistClient(cliente){
    
    // let testFailed = false;
    let response;
    try {
        response =  await cliente.SignUp(id_chat,null,null);
          
    } catch (error) {
       console.log(error)
    }
    return response;
    // let estudiante = new Estudiante.Estudiante('Pablo','Podgaiz',35,31090720);
};



async function main() {
    const tests = [
        TestSignUpNotExistClient,
    ]

    const server = await new app();
    server.start()

    const cli = await crearCliente.crearCliente();
    let done = 0;
    let passed = 0;
    let errors = 0;

    console.log('Running tests...\n');

    for (const test of tests) {
       
        const result = await test(cli);
        
        done ++;
    }
    console.log("Done:" + done);
    console.log("Passed:" +passed);
    console.log("Failed:" + errors);
}

export default main;


