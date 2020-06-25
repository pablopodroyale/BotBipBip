import DBClient from "./DBClient"

class NullDBClient extends DBClient {

    constructor() {
        super()
    }

    async connect() {
    }

    async disconnect() {
    }

    async getClient() {
        throw new CustomError(500, "no se ha configurado ningun cliente de bd para conectarse", true)
    }

    async getDb() {
        throw new CustomError(500, "no se ha configurado ningun cliente de bd para conectarse", true)
    }
}

export default NullDBClient