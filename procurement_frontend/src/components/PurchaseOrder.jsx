import React, {Component} from 'react';
import RequestPermissionTable from "./RequestPermissionTable";
import DirectOrdersTable from "./DirectOrdersTable";
import DisplayDetailsContainer from "./DisplayDetailsContainer";
import OrderRequisitionsContainer from "./OrderRequisitionsContainer";
var uniqid = require('uniqid');

class PurchaseOrder extends Component {
    constructor(props) {
        super(props);
        this.state={
            directOrdersBtnState : false,
            requestPermissionBtnState : true,
            currentOrderItem: {
                _id: "",
                index : -1,
                item: '',
                quantity : 0,
                unit_price : 0,
                total_cost : 0,
                item_desc : '',
                priority : 0,
                status : '',
                edit_order : false
            },
            allOrders: [],
                // {
                //     "item": "cement",
                //     "item_desc": " Need at least 200 bags of cement for the upcoming two weeks work in the construction site at Malabe",
                //     "quantity": 18,
                //     "unit_price": 3200,
                //     "total_cost": null,
                //     "status": null,
                //     "priority": 5,
                //     "directOrder": true
                // },
                // {
                //     "item": "sand",
                //     "item_desc": "80 cubes of sand for the upcoming two weeks work in the construction site at Malabe",
                //     "quantity": 80,
                //     "unit_price": 8500,
                //     "total_cost": null,
                //     "status": "pending",
                //     "priority": 8,
                //     "directOrder": false
                // },
                // {
                //     "item": "Titanium",
                //     "item_desc": " Need at least 100 kg of Titanium for the Marble Work on the floor",
                //     "quantity": 100,
                //     "unit_price": 10200,
                //     "total_cost": null,
                //     "status": "Pending",
                //     "priority": 5,
                //     "directOrder": false
                // },
                // {
                //     "item": "Metal",
                //     "item_desc": "40 cubes of Metal for the upcoming two weeks work in the construction site at Malabe",
                //     "quantity": 40,
                //     "unit_price": 5400,
                //     "total_cost": null,
                //     "status": "Accepted",
                //     "priority": 2,
                //     "directOrder": false
                // }

            requestPermissionOrders : [],
            directOrders : []
        };

        this.callAPIGetAllOrders = this.callAPIGetAllOrders.bind(this);
        this.callAPIAddRequestPermissionOrders = this.callAPIAddRequestPermissionOrders.bind(this);
        this.callAPIUpdateRequestPermissionOrder = this.callAPIUpdateRequestPermissionOrder.bind(this);
        this.callAPIDeleteRequestPermissionOrder = this.callAPIDeleteRequestPermissionOrder.bind(this);
        this.callAPIDeleteMultipleRequestPermissionOrders = this.callAPIDeleteMultipleRequestPermissionOrders.bind(this);
        this.handleOnClickDirectOrders = this.handleOnClickDirectOrders.bind(this);
        this.handleOnClickRequestPermissionOrders = this.handleOnClickRequestPermissionOrders.bind(this);
        this.handleTestBtnClick = this.handleTestBtnClick.bind(this);
        this.handleOnSelectRow = this.handleOnSelectRow.bind(this);
        this.handleOnClickApprove = this.handleOnClickApprove.bind(this);
        this.handleOnClickDecline = this.handleOnClickDecline.bind(this);
        this.handleOnClickHold = this.handleOnClickHold.bind(this);
        this.handleOnclickEditOrder = this.handleOnclickEditOrder.bind(this);
        this.handleFormOnChange = this.handleFormOnChange.bind(this);
        this.handleFormUpdates = this.handleFormUpdates.bind(this);
        this.arrayDataCalculateTotal = this.arrayDataCalculateTotal.bind(this);
        this.handleOnClickDeleteOrder = this.handleOnClickDeleteOrder.bind(this);
        this.acceptedOrderArrayGenerateReferenceId = this.acceptedOrderArrayGenerateReferenceId.bind(this);
    }

    async callAPIGetAllOrders(){
        console.log("CallAPIGetAllOrders Hit !!!");
        const url = "http://localhost:3000/order";
        await fetch(url).then( res => res.json()).then(data => { this.setState({ allOrders: data}) }).catch( err => { console.log({ Err_message: err})});
    };

    async callAPIAddRequestPermissionOrders(requestPermissionOrders){
        const url = "http://localhost:3000/request/many";
        const requestOptions = {
            method : 'POST',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(requestPermissionOrders)
        };
        await fetch(url, requestOptions).then(res => res.json())
            .then( data => {
                console.log(data);
            })
            .catch( err => {
                console.log({ Err_message : err})
            });
    }

    async callAPIUpdateRequestPermissionOrder( reqOrderId,requestPermissionOrder){
        const url = "http://localhost:3000/request/updorder/" + reqOrderId;
        const requestOptions = {
            method : 'PUT',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(requestPermissionOrder)
        };
        await fetch(url, requestOptions)
            .then(res => res.json())
            .then( data => {
                console.log(data);
            })
            .catch( err => {
                console.log({ Err_message : err})}
            );
    }

    async callAPIDeleteRequestPermissionOrder( reqOrderId){
        const url = "http://localhost:3000/request/del/"+ reqOrderId;
        const requestOptions = {
            method : 'DELETE'
        };
        await fetch(url, requestOptions)
            .then(res => res.json())
            .then( data => {
                console.log(data)
            })
            .catch( err => {
                console.log({ Err_message : err})}
            );
    }

    async callAPIDeleteMultipleRequestPermissionOrders(reqPermissionOrders){
        const url = "http://localhost:3000/request/del/";
        const requestOptions = {
            method : 'DELETE',
            headers : { 'Content-Type': 'application/json' },
            body : JSON.stringify(reqPermissionOrders)
        };
        await fetch(url, requestOptions)
            .then(res => res.json())
            .then( data => {
                console.log(data)
            })
            .catch( err => {
                console.log({ Err_message : err})}
            );
    }

    async componentDidMount() {

        await this.callAPIGetAllOrders();

        let dataNew = [...this.state.allOrders];
        let requestPermissionOrdersNew = [];
        let directOrdersNew = [];

        dataNew.map( item => {

            // Calculate the total Cost for the order based on the unit price and the Quantity values of the each item
            item.total_cost = item.unit_price * item.quantity;

             //  If the status of the order is null, assign the status value of "Pending"
            if (item.status === null) {
                if (!item.directOrder) {
                    item.status = "pending";
                }
            } else if(item.status == "Accepted"){
                if (!item.hasOwnProperty('referenceId')){
                    //console.log("Accepted order does not have a reference");

                    /*
                     *  Generates a unique sequential reference for the Accepted Orders
                     *   based on the timestamp, processID and the machine name
                     */
                    let uniqReferenceByTime = uniqid.time();
                    let uniqReferenceByItem = uniqid(item.item);

                    // 30 bytes Unique Sequential Reference for Accepted Orders
                    let uniqueReference = uniqid(uniqReferenceByTime, uniqReferenceByItem);

                    item["referenceId"] = uniqueReference;
                    //console.log("Item with unique sequential reference : ", item);
                }
            }
        });

        dataNew.map( item => {
           if(!item.directOrder) {
               requestPermissionOrdersNew.push(item);
           } else if (item.directOrder) {
               directOrdersNew.push(item);
           }
        });

        //Adding all the RequestPermissionOrders to the database
        this.callAPIAddRequestPermissionOrders(requestPermissionOrdersNew);

        this.setState({
            allOrders: dataNew,
            requestPermissionOrders: requestPermissionOrdersNew,
            directOrders: directOrdersNew
        });
    }

    /**
     *
     * @param ordersArray - Accepted Orders
     * @returns {*}  -  Accepted Orders with Unique sequential reference
     */
    acceptedOrderArrayGenerateReferenceId(ordersArray){
        ordersArray.map(item => {
            if (item.status == "Accepted") {
                if (!item.hasOwnProperty('referenceId')) {
                    //console.log("Accepted order does not have a reference");

                    /*
                     *  Generates a unique sequential reference for the Accepted Orders
                     *   based on the timestamp, processID and the machine name
                     */
                    let uniqReferenceByTime = uniqid.time();
                    let uniqReferenceByItem = uniqid(item.item);

                    // 30 bytes Unique Sequential Reference for Accepted Orders
                    let uniqueReference = uniqid(uniqReferenceByTime, uniqReferenceByItem);

                    item["referenceId"] = uniqueReference;
                    //console.log("Item with unique sequential reference : ", item);
                }
            }
        });
        return ordersArray;
    }

    arrayDataCalculateTotal(ordersArray){
        ordersArray.map( item => {
            item.total_cost = item.unit_price * item.quantity;
        });
        return ordersArray;
    }

    handleFormOnChange(e){
        let curObject = {...this.state.currentOrderItem};

        curObject[e.target.name] = e.target.value;

        //console.log("Current Object Form Change: ", curObject);
        this.setState({
            currentOrderItem: curObject
        })
        //console.log("Form change values : ", curObject);
    }

    async handleFormUpdates(e, itemIndex, item_id){
        e.preventDefault();
        //console.log("Form Update item index : ", itemIndex);
        let curObject = {...this.state.currentOrderItem};

        curObject.edit_order = false;
        curObject.total_cost = curObject.unit_price * curObject.quantity;

        //console.log("Current Object Form update: ", curObject);

        let requestPermissionOrdersNew = [...this.state.requestPermissionOrders];
        //console.log("Form update requestPermission array : ", requestPermissionOrdersNew);

        requestPermissionOrdersNew[itemIndex] = curObject;
        //requestPermissionOrdersNew = this.arrayDataCalculateTotal(requestPermissionOrdersNew);



        console.log("Update permissionRequest Order : ", item_id);

        console.log("Update Request order curObject :", curObject);
        //console.log("Updated requestPermissionArray : ", requestPermissionOrdersNew);
        this.setState({
            requestPermissionOrders : requestPermissionOrdersNew,
            currentOrderItem: curObject
        });
        await this.callAPIUpdateRequestPermissionOrder( item_id, this.state.currentOrderItem);
    }

    handleOnSelectRow(info){
        //console.log("handleButtonClick Selected data :" , info);
        let curObject = {...this.state.currentOrderItem};
        curObject._id = info.original._id;
        curObject.index = info.index;
        curObject.item = info.original.item;
        curObject.quantity = info.original.quantity;
        curObject.total_cost = info.original.total_cost;
        curObject.item_desc = info.original.item_desc;
        curObject.unit_price = info.original.unit_price;
        curObject.priority = info.original.priority;
        curObject.status = info.original.status;

        //console.log("handle on select row curObject : ", curObject);
        this.setState({
            currentOrderItem : curObject
        });
    }

    async handleOnClickDeleteOrder(e, itemIndex, reqOrderId){
        e.preventDefault();

        let requestPermissionOrdersNew = [...this.state.requestPermissionOrders];
        let requestPermissionOrdersNewUpdated = requestPermissionOrdersNew.filter((order, indexVal) => {
            if(indexVal !== itemIndex){
                return order;
            }
        });

        await this.callAPIDeleteRequestPermissionOrder(reqOrderId);

        this.setState({
            requestPermissionOrders : requestPermissionOrdersNewUpdated,
            currentOrderItem: {
                index : -1,
                item: '',
                quantity : 0,
                unit_price : 0,
                total_cost : 0,
                item_desc : '',
                priority : 0,
                status : '',
                edit_order : false
            }
        })
    }

    handleOnclickEditOrder(){
        let curObject = {...this.state.currentOrderItem};
        curObject.edit_order = true;

        this.setState({
            currentOrderItem : curObject
        })
    }

    async handleOnClickApprove(e, itemIndex){
        e.preventDefault();
        //console.log("Approved Order", itemIndex);

        let requestPermissionOrdersNew = this.state.requestPermissionOrders;
        let curOrderObject = this.state.currentOrderItem;

        //console.log("Modify this item :" , requestPermissionOrdersNew[itemIndex]["status"]);
        requestPermissionOrdersNew[itemIndex]["status"] = "Accepted";

        let requestPermissionOrdersNewRef = this.acceptedOrderArrayGenerateReferenceId(requestPermissionOrdersNew);

        //console.log("After modification order items : ", requestPermissionOrdersNew);
        this.setState({
            requestPermissionOrders : requestPermissionOrdersNewRef
        });
        await this.callAPIDeleteMultipleRequestPermissionOrders(requestPermissionOrdersNew);
        await this.callAPIAddRequestPermissionOrders(requestPermissionOrdersNewRef);
    }

    handleOnClickDecline(e, itemIndex){
        e.preventDefault();
        //console.log("Approved Order", itemIndex);

        let requestPermissionOrdersNew = this.state.requestPermissionOrders;
        let curOrderObject = this.state.currentOrderItem;

        //console.log("Modify this item :" , requestPermissionOrdersNew[itemIndex].status );
        requestPermissionOrdersNew[itemIndex].status = "Declined";

        //console.log("After modification order items : ", requestPermissionOrdersNew);
        this.setState({
            requestPermissionOrders : requestPermissionOrdersNew
        })
    }

    handleOnClickHold(e, itemIndex){
        e.preventDefault();
        //console.log("Approved Order", itemIndex);

        let requestPermissionOrdersNew = this.state.requestPermissionOrders;
        let curOrderObject = this.state.currentOrderItem;

        //console.log("Modify this item :" , requestPermissionOrdersNew[itemIndex].status );
        requestPermissionOrdersNew[itemIndex]["status"] = "Pending";

        //console.log("After modification order items : ", requestPermissionOrdersNew);
        this.setState({
            requestPermissionOrders : requestPermissionOrdersNew
        })
    }

    handleOnClickDirectOrders(){
        //console.log("Direct orders button clicked");
        this.setState({
            directOrdersBtnState: true,
            requestPermissionBtnState: false,
        })
    }

    handleOnClickRequestPermissionOrders(){
        //console.log("Request permission button clicked");
        this.setState({
            requestPermissionBtnState : true,
            directOrdersBtnState : false
        })
    }

    handleTestBtnClick(){
        console.log("All orders : ", this.state.allOrders);
        console.log("Request Permission Orders : ", this.state.requestPermissionOrders);
        console.log("Direct Orders : ", this.state.directOrders);
    }

    render() {
        return (
            <div>
                <DisplayDetailsContainer curSelectedObjectData={this.state.currentOrderItem}
                                         handleOrderApprove={this.handleOnClickApprove}
                                         handleOrderDecline={this.handleOnClickDecline}
                                         handleOrderHold={this.handleOnClickHold}
                                         handleEditOrder={this.handleOnclickEditOrder}
                                         onFormChange={this.handleFormOnChange}
                                         onFormUpdate={this.handleFormUpdates}
                                         onDeleteOrder={this.handleOnClickDeleteOrder}
                />
                <br/>
                <br/>
                <div>
                    <OrderRequisitionsContainer requestPermissionState={this.state.requestPermissionBtnState}
                                                directOrdersState={this.state.directOrdersBtnState}
                                                onClickRequestPermissionOrders={this.handleOnClickRequestPermissionOrders}
                                                onClickDirectOrders={this.handleOnClickDirectOrders}
                                                requestPermissionOrdersDataSet={this.state.requestPermissionOrders}
                                                onSelectRow={this.handleOnSelectRow}
                    />
                </div>

                <br/>
                <br/>
                <br/>
                <br/>
                <button className="btn btn-warning" onClick={this.handleTestBtnClick} > Test Button </button>
            </div>
        );
    }
}

export default PurchaseOrder;