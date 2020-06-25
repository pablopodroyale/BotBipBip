import SessionStates from '../src/Server/Service/Sessions_states.js'
import config from '../src/Config.js';
import Sessions_states from '../src/Server/Service/Sessions_states.js';

const crearCliente = () => {
    const SignUp = async(userId, msg, userData) =>{
        let mockSignUpState = new Sessions_states.SignUpState();
        mockSignUpState.action(userId, msg, userData);
        
    }

    // const GetAll = async() =>{
        
    //     const getOptions = {
    //         method : 'GET',
    //         uri : resourceUri + "/GetAll",
    //         json : true,
    //     }

    //     return await request(getOptions);
    // }

    // const GetByDni = async(dni) =>{
        
    //     const getOptions = {
    //         method : 'GET',
    //         uri : resourceUri + "/GetByDni",
    //         json : true,
    //         qs: {
    //             dni: dni // -> uri + '?dni=54548'
    //         }
    //     }

    //     return await request(getOptions);
    // }

    // const GetByAge = async(minAge,maxAge) =>{
        
    //     const getOptions = {
    //         method : 'GET',
    //         uri : resourceUri + "/GetByAge",
    //         json : true,
    //         qs: {
    //             minAge: minAge, // -> uri + '?dni=54548',
    //             maxAge : maxAge
    //         }
    //     }

    //     return await request(getOptions);
    // }
    // const Update = async(estudiante) =>{
    //     const postOptions = {
    //         method : 'PUT',
    //         uri : resourceUri,
    //         json : true,
    //         body : null
    //     }

    //     if (estudiante) {
    //         // estModel = new Estudiante.Estudiante(estudiante.nombre,estudiante.apellido,estudiante.edad,estudiante.dni);
    //         let body = {
    //             data : Estudiante
    //         }
    //         var jsonDataObj = {
    //             'nombre': estudiante.nombre,
    //             'apellido': estudiante.apellido,
    //             'edad': estudiante.edad,
    //             'dni': estudiante.dni,
    //             'id': estudiante.id
    //         };
    //         postOptions.body = jsonDataObj
    //     }
    //     return await request(postOptions);
    // }
    // const Delete = async(id) =>{
    //     const options = {
    //         method : 'DELETE',
    //         uri : resourceUri ,
    //         json : true,
    //         qs: {
    //             id: id // -> uri + '?dni=54548'
    //         }
    //     }
    //     return await request(options);
    // }

    return {
        SignUp,
        // GetAll,
        // GetByDni,
        // GetByAge,
        // Update,
        // Delete
    }

}

export default{
    crearCliente
}