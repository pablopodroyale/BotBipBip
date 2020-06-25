import Button from '../Model/Button.js';
import FlowEnum from '../Model/Enum/FlowEnum.js';
import FunctionHelper from '../Helper/FunctionHelper.js';
const SEPARATOR = ".";
const BUTTON_CANCEL = {
    text: "Vaciar Pedido",
    callback_data: FlowEnum.TO_EMPTY_CART + SEPARATOR + "-1"
};
const BUTTON_SHOW_ORDER = {
    text: "Ver pedido",
    callback_data: FlowEnum.TO_MY_ORDER + SEPARATOR + "-1"
};
const BUTTON_RETURN_TO_PRODUCT_TYPE = {
    text: "Volver a Categorías",
    callback_data: FlowEnum.TO_PRODUCT_TYPE + SEPARATOR + "-1"
};
const BUTTON_CREATE_ORDER = {
    text: "Crear Pedido",
    callback_data: FlowEnum.TO_CONFIRM_ORDER + SEPARATOR + "-1"
};



class Mapper {
    MapFromOrderNodeToSellsByProduct
    static MapFromOrderNodeToSellsByProduct(products,location){
        let sellByProdList = products
        let matrix = [];
        let date = FunctionHelper.getMySqlDateNow();
        // let date = new Date().toISOString().split('T')[0] + ' '  + new Date().toTimeString().split(' ')[0];
        if (typeof sellByProdList != undefined) {
          if(sellByProdList.length != 0){
              for (var i = 0; i < sellByProdList.length; i++) {
                  var item = [];
                  date
                  item.push(location.latitude)
                  item.push(location.longitude)
                  item.push(date);
                  item.push(sellByProdList[i].product.quantity)
                  item.push(sellByProdList[i].product.sku)
                  matrix.push(item)
              }
          } else {
              console.log("error")
          }
        }
        return matrix;
        // let SellByProduct = {
        //         SKU: product.sku,
        //         SELL_DATE: new Date.now(),
        //         LATITUDE : location != null ? location.latitude : null,
        //         LONGITUDE : location != null ? location.longitude : null,
        //         QUANTITY: product.quantity
        //     }
        // return SellByProduct;
    }
    static MapFromOrderNodeToERP(userID,userData){
        let products = [];
        userData.order.forEach(element => {
            let product = {
                sku: element.product.sku,
                quantity: element.product.quantity

            }
            products.push(product);
        });
        let salesOrder = {
                customerId: userID,
                // latitude : userData.location != null ?userData.location.latitude : null,
                // longitude : userData.location != null ?userData.location.longitude : null,
                products: products
            }
        return salesOrder;
    }

    static MapCartList(order){
        let arrOfArrs = [];
        let catsArr = [];
          let acum = 0;
        for (let index = 0; index < order.length; index++) {
            const element = order[index].product;
            let obj = {
                text: element.name + "  x" +  element.quantity + "u $" + (element.price * element.quantity),
                callback_data: FlowEnum.TO_DELETE_ITEM + SEPARATOR + element.sku
            }
            let deleteButton = {
                text: "\u274C",
                callback_data: FlowEnum.TO_DELETE_ITEM + SEPARATOR + element.sku
            }
            acum += (element.price * element.quantity);
            catsArr.push(obj);
            catsArr.push(deleteButton);
            arrOfArrs.push(catsArr);
            catsArr = [];
        }

        let totalButton = {
            text: "Total: $"  + acum,
            callback_data: "-1"
        }
        catsArr.push(totalButton);

        arrOfArrs.push(catsArr);

        // result["mensaje"] = msg;
        // for (var i = 0; i < catsArr.length; i++) {
        //     let arrAux = [];
        //     arrAux.push(catsArr[i]);
        //     arrOfArrs.push(arrAux);
        // }

        return arrOfArrs;
    }

    static MapJsonToButtonsProductType(source) {
        let arrOfArrs = [];
        let catsArr = [];
        let resJson = source;
        for (let index = 0; index < resJson.length; index++) {
            const element = resJson[index];
            let obj = {
                text: element.DESCRIPTION,
                callback_data: FlowEnum.TO_PRODUCTS_BY_SELECTED_CATEGORY + SEPARATOR + element.PRODUCT_TYPE_ID
            }
            catsArr.push(obj);
        }
        catsArr = this.addOptionsToProductType(catsArr);
        for (var i = 0; i < catsArr.length; i++) {
            let arrAux = [];
            arrAux.push(catsArr[i]);
            arrOfArrs.push(arrAux);
        }

        return arrOfArrs;
    }

    static MapJsonToButtonsProducts(source) {
        let arrOfArrs = [];
        let catsArr = [];
        let resJson = source;
        for (let index = 0; index < resJson.length; index++) {
            const element = resJson[index];
            let obj = {
                text: element.NAME + " $" + element.PRICE,
                callback_data: FlowEnum.TO_ADD_PRODUCT + SEPARATOR + element.SKU + SEPARATOR + element.NAME + SEPARATOR + element.PRICE
            }
            catsArr.push(obj);
        }
        catsArr = this.addOptionsToProducts(catsArr);
        for (var i = 0; i < catsArr.length; i++) {
            let arrAux = [];
            arrAux.push(catsArr[i]);
            arrOfArrs.push(arrAux);
        }

        return arrOfArrs;
    }

    static mapSaleOrderToMatrix(obj) {
        let matrix = [];
        if (typeof obj != undefined) {
                var item = [];
                item.push(obj.id);
                item.push(obj.status);
                item.push(obj.total);
                item.push(obj.latitude);
                item.push(obj.longitude);
                item.push(obj.telegramId);
                matrix.push(item);
        }
        return matrix;
    }

    static mapSaleOrderDetailToMatrix(obj) {
        let matrix = [];
        if (typeof obj != undefined) {
            let details = obj.salesOrderDetail;
            for (var i = 0; i < details.length; i++) {
                var item = [];
                item.push(details[i].quantity);
                item.push(details[i].price);
                item.push(obj.id);
                item.push(details[i].product);
                matrix.push(item);
            }
        }
        return matrix;
    }

    static mapSaleOrderDetailInfoToMatrix(obj) {
        let matrix = [];
        if (typeof obj != undefined) {
            for (var i = 0; i < obj.length; i++) {
                var item = [];
                item.push(obj[i].LATITUDE);
                item.push(obj[i].LONGITUDE);
                item.push(obj[i].SELL_DATE);
                item.push(obj[i].QUANTITY);
                item.push(obj[i].SKU);
                matrix.push(item);
            }
        }
        return matrix;
    }

    static mapProductTypeListToMatrix(obj) {
        let productTypeList = obj.productTypes
        let matrix = []

        if (typeof productTypeList != undefined) {
          if(productTypeList.length != 0){
              for (var i = 0; i < productTypeList.length; i++) {
                  var item = [];
                  item.push(productTypeList[i].oid)
                  item.push(productTypeList[i].description)
                  item.push(productTypeList[i].code)
                  matrix.push(item)
              }
          } else {
              console.log("No hay tipos de productos/categorias en el ERP")
          }
        }
        return matrix;
    }

    static addOptionsToProductType(arr) {
        arr.push(BUTTON_CANCEL);
        arr.push(BUTTON_SHOW_ORDER);
        arr.push(BUTTON_CREATE_ORDER);
        return arr;
    }

    static addOptionsToProducts(arr) {
    arr.push(BUTTON_RETURN_TO_PRODUCT_TYPE);
    // arrOfArrs.push(BUTTON_SHOW_ORDER);
    return arr;
    }

    static mapProductListToMatrix(obj) {
        let productList = obj.products
        let matrix = []
        if (typeof productList != undefined){
          if(productList.length != 0){
              for(var i = 0; i < productList.length ; i++){
                  var item = [];
                  item.push(productList[i].name)
                  item.push(productList[i].price)
                  item.push(productList[i].skuCode)
                  item.push(productList[i].brand)
                  item.push(productList[i].type.oid)
                  matrix.push(item)
              }
          } else {
              console.log("No hay productos en el ERP o no se cargó una lista de precios")
          }
        }
        return matrix;
    }
}

export default Mapper;
