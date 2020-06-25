/* eslint-disable no-unused-vars */
import DBClientFactory from '../db/DBClientFactory.js'

class DAO {

    constructor() {
        this.client = DBClientFactory.getDbClient()
    }

    async getAll() {
        throw new Error('falta implementar getAll!')
    }

    async getByID(id) {
        throw new Error('falta implementar getByID!')
    }

    async update(obj) {
        throw new Error('falta implementar update!')
    }

    async insert(obj) {
        throw new Error('falta implementar insert!')
    }

    async delete(id) {
        throw new Error('falta implementar delete!')
    }

    async getByID(id) {
        throw new Error('falta implementar getByID!')
    }
}

export default DAO