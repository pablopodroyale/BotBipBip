class Response{
    /**
     * 
     * @param {*} error boolean. Se verifica para saber como manipular al objeto
     * @param {*} codigo código de status
     * @param {*} mensaje Si hubo error esta en este campo el mensaje
     * @param {*} obj Es la respuesta que se le manda al bot tal cual la necesita.  
     */
    constructor(error, codigo, mensaje, respuesta){
        this.error = error;
        this.codigo = codigo;
        this.mensaje = mensaje;
        this.obj = respuesta;
    }
}

export default Response;