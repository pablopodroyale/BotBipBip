
class SalesOrder {

    constructor(telegramID, latitude,logitude) {
        this.id = '';
        this.number = '';
        this.status = '';
        this.total = 0;
        this.latitude = latitude;
        this.longitude = logitude;
        this.telegramId = telegramID;
        this.salesOrderDetail = [];
    }

    addDetails(detail) {
        this.total=this.total+(detail.price*detail.quantity);
        this.salesOrderDetail.push(detail);
    }
}

export default SalesOrder;
