import Config from '../../Config.js'
import MySQLClient from './MySQLClient.js'
let mySQLClient = null

function getSQLClient() {
    if (!mySQLClient) {
        mySQLClient = new MySQLClient()
    }
    return mySQLClient
}

function getNullDbClient() {
    return new MySQLClient()
}

class DBClientFactory {
    static getDbClient() {
        switch (Config.config.db.client) {
            case 'mysql': return getSQLClient()
            default: return getSQLClient()
        }
    }
}

export default DBClientFactory