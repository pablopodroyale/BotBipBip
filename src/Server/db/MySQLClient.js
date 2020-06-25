import DBClient from "./DBClient.js";
import mysql from 'mysql';

import dotenv from 'dotenv'
dotenv.config();

const DEV_DB_HOST = process.env.DEV_DB_HOST
const DEV_DB_USER = process.env.DEV_DB_USER
const DEV_DB_PASSWORD = process.env.DEV_DB_PASSWORD
const DEV_DB_DATABASE = process.env.DEV_DB_DATABASE
const DEV_DB_PORT = process.env.DEV_DB_PORT

class MySQLClient extends DBClient {

    constructor() {
        super()
        this.connected = false
        const client = mysql.createConnection({
            host: DEV_DB_HOST,
            user: DEV_DB_USER,
            password: DEV_DB_PASSWORD,
            database: DEV_DB_DATABASE,
            port: DEV_DB_PORT,
            insecureAuth: true
        });
        this.client = client;
    }

    async connect() {
        try {
            await this.client.connect()
            this.connected = true
        } catch (error) {
            throw new Error("hubo un error al conectarse a mysql")
        }
    }

    async disconnect() {
        try {
            await this.client.end()
            this.connected = false
        } catch (error) {
            throw new Error("hubo un error al conectarse a mysql")
        }
    }

    async getClient() {
        if (!this.connected) {
            await this.connect()
            this.connected = true
        }
        return this.client
    }

    async query(querySentence) {
        let result
        const client = this.client;
        return new Promise((resolve, reject) => {
            // client.beginTransaction(function(err) {
            //     if (err) { return reject(err); }
            client.query(querySentence, function (error, results, fields) {
                if (error) {
                    return client.rollback(function () {
                        return reject(error);
                    });
                } else {
                    console.log(results);
                    // let prom = Promise.resolve(results)
                    // prom.then(function(data){
                    //     return data;
                    // });
                    return resolve(results);
                }
            });
            // });
        });
        // return result
    }

    async queryINSERT(querySentence, obj) {
        let result
        if (typeof obj != undefined && obj.length != 0) {
            const client = this.client;
            result = await client.beginTransaction(function (err) {
                if (err) { throw err; }
                client.query(querySentence, [obj], function (error, results, fields) {
                    if (error) {
                        return client.rollback(function () {
                            throw error;
                        });
                    }

                    client.commit(function (err) {
                        if (err) {
                            return client.rollback(function () {
                                throw err;
                            });
                        }
                        console.log('success!');
                    });
                });
            });
        }
        return result;
    }

    async getFromDB() {

    }

}

export default MySQLClient
