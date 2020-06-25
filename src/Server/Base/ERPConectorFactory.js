import ERPConnector from './ERPConnector.js'

let erpConnector = null

function getERPConnector() {
    if (!erpConnector) {
        erpConnector = new ERPConnector()
    }
    return erpConnector
}

class ERPConectorFactory {
    static getConnector() {
       return getERPConnector();
    }
}

export default ERPConectorFactory