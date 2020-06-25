import Config from '../../Config.js'
import SessionHandler from '../Service/Sessions.js'
let session = null

function getSession() {
    if (!session) {
        session = new SessionHandler()
    }
    return session
}



export default getSession;