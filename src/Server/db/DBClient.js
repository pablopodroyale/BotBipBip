class DBClient {

    async connect() {
        throw new Error("falta implementar 'connect' en subclase!")
    }

    async disconnect() {
        throw new Error("falta implementar 'disconnect' en subclase!")
    }

    async getClient() {
        throw new Error("falta implementar 'getClient' en subclase!")
    }

    async query() {
        throw new Error("falta implementar 'getDb' en subclase!")
    }
}

export default DBClient