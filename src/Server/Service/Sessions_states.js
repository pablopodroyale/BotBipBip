import ProductService from './ProductService.js';
import ClientService from './ClientService.js';
import ResponseCodesEnum from '../Model/Enum/ResponseCodesEnum.js';
import productFlow from '../Model/Enum/FlowEnum.js'
import Mapper from '../Helper/Mapper.js';
import dotenv from 'dotenv';
import SalesOrderService from './SalesOrderService.js';
import MessaggeEnum from '../Model/Enum/MessaggeEnum.js';
import getSession from '../Base/SessionFactory.js';
import SellByProductService from './SellByProductService.js';
import SalesOrder from '../Model/SalesOrder.js';
import SalesOrderDetail from '../Model/SalesOrderDetail.js';
dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

/**
 * Registration Logic:
 *  - LogInState : Ask for phone Or gives Order Logic
 *  - RequestLocationState: Store phone number and ask for location
 *  - AskRegisterEmailState
 *  - StoreEmailState
 *  - ValidatingEmailState
 * 
 * Order Logic:
 *  - SelectProductState
 *  - SelectProductTypeState
 */

/**
 * Product State
 */
class SelectProductState {
    async listProductTypes(producTypeId) {
        const ret = await new ProductService().getProductsByCategory(producTypeId);
        let result;
        //No hay productos en esta categoría :(
        if (ret.codigo == ResponseCodesEnum.RES_200) {
            result = {
                "mensaje": ret.mensaje,
                "obj": ret.obj,
            }
            this.nextState = this;
            return result
        }
        else { //Something whent wrong
            result = {
                "mensaje": ret.mensaje,
                "obj": null
            }
            return result
        }
    }

    async listProducts() {
        const ret = await new ProductService().getProductType();
        let result;
        if (ret.codigo == ResponseCodesEnum.RES_200) {
            result = {
                "mensaje": ret.mensaje,
                "obj": ret.obj,
            }
            this.nextState
        }
        else { //Something whent wrong
            result = {
                "mensaje": ret.mensaje,
                "obj": null,
            }
        }
        return result
    }

    async storeItem(sku, name, price, userData) {
        //Buscar el item en la lista. SI esta agrego 1, Si no creo uno lo mapeo y lo agrego
        let result;
        let item = this.getItemBySku(userData.order, sku);
        if (item != undefined) {
            item.product.quantity += 1;
        } else {
            let formattedItem = {
                product: {
                    sku: sku,
                    name: name,
                    quantity: 1,
                    price: parseFloat(price)
                }
            }
            userData.order.push(formattedItem)
        }
        result = await this.listProducts();
        result["mensaje"] = "Item agregado";
        return result
    }
    async deleteItem(sku, userData) {
        //Buscar el item en la lista. SI esta agrego 1, Si no creo uno lo mapeo y lo agrego
        let result;
        let item = this.getItemBySku(userData.order, sku);
        userData.order.splice(item,1);
        result = await this.listProducts();
        result["mensaje"] = "Item Elimiando";
        return result
    }


    getItemBySku(lst, sku) {
        let item = lst.find(x => x.product.sku === sku);
        return item;
    }

    async emptyCart(userData) {
        userData.order = []
        let result = await this.listProducts();
        result["mensaje"] = "Carrito vaciado";
        userData.order = [];
        this.nextState = new SignUpState();
        return result

    }

    async listCart(userData) {
        let result = await this.listProducts();
        let order = userData.order;
        let msg = "Tu carrito tiene:\n";
        //Aca metodo texto
        let ret = Mapper.MapCartList(order);
        let opts = {
            parse_mode: 'Markdown',
            reply_markup: JSON.stringify({
              inline_keyboard: ret
            })
          };
        result = {
            mensaje: "Tu carrito tiene los siguientes productos:",
            obj: opts,
            nextState: this
        }
        return result
    }
    async createOrder(userId, item, userData) {
        let result;
        let ret;
        if (userData.location === null) {
            result = {
                "mensaje": "Necesitamos tu ubicación para crear el pedido. Proba del celu",
                "obj": null,
            }
            userData.order = [];
            this.nextState = new SignUpState();
            return result;
        }

        let fuckingOrder = userData.order;
        if (fuckingOrder.length == 0) {
            result = {
                "mensaje": MessaggeEnum.MUST_ADD_PRODS,
                "obj": null,
            }
            this.nextState = this;
            return result;
        } else {
            let saleOrder = new SalesOrder(userId, userData.location.latitude, userData.location.longitude);
            for (var i = 0; i < userData.order.length; i++) {
                let det = new SalesOrderDetail(userData.order[i].product.quantity, userData.order[i].product.price, userData.order[i].product.sku);
                saleOrder.addDetails(det);
            }
            const saleOrderService = new SalesOrderService();
            ret = await saleOrderService.CreateOrder(saleOrder);
            result = {
                "mensaje": ret.mensaje,
                "obj": null,
            }
            userData.order = [];
            this.nextState = new SignUpState();
            return result
        }
    }


    async action(userId, msg, userData) {
        console.log("askLocationState")
        this.nextState = new SelectProductState();
        if (typeof msg === 'string') {// It came from buttons
            let option = msg.split(".");
            //I should really use switches
            if (option[0] == productFlow.TO_PRODUCTS_BY_SELECTED_CATEGORY) {
                return this.listProductTypes(option[1])
            }
            if (option[0] == productFlow.TO_ADD_PRODUCT) { // Add product to carrito
                let sku = option[1];
                let name = option[2];
                let price = option[3];
                return this.storeItem(sku, name, price, userData)
            }
            if (option[0] == productFlow.TO_EMPTY_CART) { //empty cart
                return this.emptyCart(userData)
            }
            if (option[0] == productFlow.TO_MY_ORDER) { //ver pedido
                return this.listCart(userData)
            }
            if (option[0] == productFlow.TO_DELETE_ITEM) { //Eliminar item
                let sku = option[1];
                return this.deleteItem(sku,userData)
            }
            if (option[0] == productFlow.TO_CONFIRM_ORDER) { //A confirmar pedido
                return this.createOrder(userId, userData, userData)
            }
            else { //From productTypes to Products
                let result = this.listProducts(); //Productos por categoría4

                return result
            }
        } else {
            if (msg.hasOwnProperty("location")) {
                userData.location = msg.location;
            }
            let result = this.listProducts();
            return result
        }

    }
}

/**
 * Store E-mail and generate Email validation
 */
class AskRegisterEmailState {
    async action(userId, msg, userData) {

        let result;
        let valid = this.isEmailValid(msg.text);
        if (valid) {
            userData["email"] = msg.text
            const service = new ClientService()
            const ret = await service.createClient(userData);
            result = {
                "mensaje": MessaggeEnum.REGISTER_SUCESS,
                "obj": null
            }
            this.nextState = new SignUpState();
        } else {
            result = {
                "mensaje": MessaggeEnum.ERROR_EMAIL,
                "obj": null
            }
            this.nextState = this;
        }
        

        return result

    }

    isEmailValid(email) {
        let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
        if (!email)
            return false;

        if (email.length > 254)
            return false;

        var valid = emailRegex.test(email);
        if (!valid)
            return false;

        // Further checking of some things regex can't handle
        var parts = email.split("@");
        if (parts[0].length > 64)
            return false;

        var domainParts = parts[1].split(".");
        if (domainParts.some(function (part) { return part.length > 63; }))
            return false;

        return true;
    }
}

/**
 * Store Phone number and ask for E-mail
 */
//TODO: Add a validation for cancel sending phone number
class StorePhoneState {
    async action(userId, msg, userData) {
        let result;
        try{
            userData["phone"] = msg.contact.phone_number

            result = {
                "mensaje": MessaggeEnum.GIVE_ME_MAIL,
                "obj": null
            }
            this.nextState = new AskRegisterEmailState();
        }catch(err){
            let kMarkup = {
                "parse_mode": "Markdown",
                "reply_markup": {
                    "one_time_keyboard": true,
                    "keyboard": [[{
                        text: "registrarse",
                        request_contact: true
                    }]]
                }
            };
            result = {
                "mensaje": MessaggeEnum.ERROR_PHONE,
                "obj": kMarkup
            }
            this.nextState = this;
        }
        
        return result
    }
}

/**
 * Ask location before ordering
 */
class askLocationState {
    async action(userId, msg, userData) {
        console.log("askLocationState")
        let option = {
            "parse_mode": "Markdown",
            "reply_markup": {
                "one_time_keyboard": true,
                "keyboard": [[{
                    text: "Dar Ubicación",
                    request_location: true
                }]]
            }
        };

        let result = {
            "mensaje": "¡Genial! Para validar que llegamos a tu zona por favor danos tu ubicación",
            "obj": option

        }
        this.nextState = new SelectProductState();
        return result
    }
}

/*
 * State LogIn 
 */
class SignUpState {
    async action(userId, msg, userData) {
        console.log("SignUpState")
        let result;
        const client = new ClientService();
        const ret = await client.getClientById(userId);

        if (ret.error) {
            this.nextState = this;
            if (ret.codigo==ResponseCodesEnum.RES_503){
                session.close();
                ret.mensaje=ResponseCodesEnum.RES_503_STR;
            }
            return ret;
        } else {
            //Si existe
            if (ret.codigo == ResponseCodesEnum.RES_200) {
                let res = new askLocationState().action(userId, msg, userData);
                this.nextState = new SelectProductState();
                return res
            } else if (ret.codigo == ResponseCodesEnum.RES_404) {
                //no existe
                this.nextState = new StorePhoneState();
                userData["telegramId"] = userId;
                userData["name"] = msg.chat.first_name;
                userData["lastName"] = msg.chat.last_name;
                return ret;
            }
        }
        return result;
    }
}

export default {
    SignUpState,
    SelectProductState,
    StorePhoneState,
}