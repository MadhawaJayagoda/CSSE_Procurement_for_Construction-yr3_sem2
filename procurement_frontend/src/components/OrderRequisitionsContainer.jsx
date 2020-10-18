import React, {Component} from 'react';
import RequestPermissionTable from "./RequestPermissionTable";
import DirectOrdersTable from "./DirectOrdersTable";

class OrderRequisitionsContainer extends Component {
    render() {

        return (
            <div className="card mx-5" >
                <div className="card-header">
                    <h5 className="card-title "> Purchase requisition orders </h5>
                </div>
                <div className="card-body">
                    <div className="card text-center">
                        <div className="card-header" style={{backgroundColor:"#797979"}}>
                            <ul className="nav nav-tabs card-header-tabs">
                                <button className={ this.props.requestPermissionState ? "nav-item nav-link  active mx-1" : "nav-item nav-link mx-1"}  onClick={this.props.onClickRequestPermissionOrders} >
                                    Requesting Permission
                                </button>
                                <button className={ this.props.directOrdersState ? "nav-item nav-link  active mx-1" : "nav-item nav-link mx-1"} onClick={this.props.onClickDirectOrders} >
                                    Direct Orders
                                </button>
                            </ul>
                        </div>
                        <div>
                            { this.props.requestPermissionState  ? <RequestPermissionTable requestPermissionOrdersDataSet={this.props.requestPermissionOrdersDataSet}
                                                                                           onSelectRow={this.props.onSelectRow}
                                                                                            /> : this.props.directOrdersState ? <DirectOrdersTable /> : null }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderRequisitionsContainer;