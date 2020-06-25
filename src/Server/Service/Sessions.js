import lodash from 'lodash';
import States from './Sessions_states.js';

/*
* Class to handle all the conection
*/
class SessionHandler {
    constructor() {
        this.users = [];
        this.operative = true
    }

    /**
     * Use me to get UserSession or return Error
     * [TODO] - Make an expiration datetime remover
     */
    getUserSession(userId) {
        //console.log(userId);
        let user = lodash.filter(this.users, x => x.userId === userId);
        //console.log(user);
        if (user.length != 0) {
            console.log(`I know you. Hello m8 last msg ${user[0].timeStamp}`);
            user[0].setTimeStamp();
            return user[0];
        }
        return null;
    }

    /**
     * Mothod to get UserSession or Create One if does not exist
     */
    getOrAdd(userId) {
        console.log("I'm On it")
        if (this.users.length == 0) {
            console.log("I'm empty");
            let newUser = new UserSession(userId);
            this.users.push(newUser);
            return newUser;
        } else {
            let user = this.getUserSession(userId)
            if (user) {
                return user
            } else {
                console.log("Hey! I dont know you m8")
                let newUser = new UserSession(userId);
                this.users.push(newUser);
                return newUser
            }
        }

        // Something when terrible wrong
        return -1
    }

    /**
     * Use me to get UserSession or return Error
     * [TODO] - Make an expiration datetime remover
     */
    open() {
        this.operative = true
    }
    close() {
        this.operative = false
    }

    isOpen() {
        return this.operative
    }

}

// TODO: This should go somewhere else
class UserData {
    constructor() {
        this.name = null;
        this.lastName = null;
        this.phone = null;
        this.email = null;
        this.location = null;
        this.order = [];
    }
    static getOrderById(oderId) {
        let order = this.order.filter(x => x.orderId == orderId);
        return order;
    }
}
/*
* Class to handle user session
*/
class UserSession {
    constructor(UserId) {
        this.userId = UserId;
        this.timeStamp = Date.now();
        this.userData = new UserData();
        // this.state = new SignUpState();
        // this.state =  new States.SelectProductTypeState();
        this.state = new States.SignUpState();
    }

    setTimeStamp() {
        this.timeStamp = Date.now();
    }

    async action(msg) {
        let res = await this.state.action(this.userId, msg, this.userData)
        this.state = this.state.nextState
        return res
    
    }

}

export default SessionHandler;