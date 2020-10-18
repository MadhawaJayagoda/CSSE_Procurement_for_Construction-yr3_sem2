import React, {Component} from 'react';
import './DisplayDetailsContainer.css';

class DisplayDetailsContainer extends Component {

    render() {

        //console.log("Display Details props : ", this.props);
        const { _id, index, item, quantity, total_cost, item_desc, edit_order, unit_price, priority, status} = this.props.curSelectedObjectData;

        return (
            <div className="justify-content-center" style={{marginLeft: "12rem"}}>
                <div className="card mx-5 w-75">
                    <div className="card-header">
                        <h4 className="card-title "> Order Details</h4>
                        <span className="text-muted"> Select an requisition order from table below </span>
                    </div>
                    <div className="modifyOps">
                        <span className="edit badge badge-pill badge-warning" onClick={this.props.handleEditOrder} >
                           <i className="fa fa-pencil" aria-hidden="true" style={{fontSize:"18px"}} ></i>
                        </span>
                        <span className="delete badge badge-pill badge-danger" onClick={(e) => {this.props.onDeleteOrder(e, index, _id) }} >
                            <i className="fa fa-trash" aria-hidden="true" style={{fontSize:"18px"}}></i>
                        </span>
                    </div>
                    <div className="card-body" style={{height: 'auto'}}>
                        { edit_order ? (
                            <form>
                                <div className="form-group">
                                    <label>Material Item</label>
                                    <input type="text" className="form-control" id="material_ordered" name="item" value={item} onChange={this.props.onFormChange} />
                                </div>
                                <div className="form-group">
                                    <label>Quantity</label>
                                    <input type="text" className="form-control" id="material_quantity" name="quantity" value={quantity} onChange={this.props.onFormChange} />
                                </div>
                                <div className="form-group">
                                    <label> Unit Cost of the Item </label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <div className="input-group-text"> LKR </div>
                                        </div>
                                        <input type="text" className="form-control" id="item_unit_price" name="unit_price" value={unit_price} onChange={this.props.onFormChange} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label> Item Order Description </label>
                                    <textarea  type="text" className="form-control" id="item_desc" name="item_desc" value={item_desc} onChange={this.props.onFormChange} />
                                </div>
                                <div className="form-group">
                                    <label> Priority Level </label>
                                    <input type="text" className="form-control" id="item_priority" name="priority" value={priority} onChange={this.props.onFormChange} />
                                </div>
                                <br/>
                                <br/>
                                <div className="align-content-center text-center" >
                                    <button className="update btn btn-warning text-dark" style={{fontSize:"18px", borderRadius: "20px"}} onClick={(e) => {this.props.onFormUpdate(e, index, _id)}} >Update Order Requisition Details</button>
                                </div>
                            </form>
                        ) : (
                        <form>
                            <div className="form-group">
                                <label>Material Item</label>
                                <input type="text" className="form-control" id="material_ordered" name="material_ordered" value={item} readOnly />
                            </div>
                            <div className="form-group">
                                <label>Quantity</label>
                                <input type="text" className="form-control" id="material_quantity" name="material_quantity" value={quantity}  readOnly />
                            </div>
                            <div className="form-group">
                                <label> Approximate Total Cost </label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"> LKR </div>
                                    </div>
                                    <input type="text" className="form-control" id="total_cost" name="total_cost" value={total_cost} readOnly />
                                </div>
                            </div>
                            <div className="form-group">
                                <label> Item Order Description </label>
                                <textarea  type="text" className="form-control" id="item_desc" name="item_desc" value={item_desc} readOnly />
                            </div>
                            <br/>
                            <br/>
                            <div className="align-content-center text-center">
                                <button type="submit" id="approveBtn" className="btn btn-success mx-3 text-white" style={{
                                    width: "12rem",
                                    height: "3rem",
                                    borderRadius: "20px",
                                    marginRight: "3rem",
                                    fontSize: "20px"
                                }} onClick={(e) => {this.props.handleOrderApprove(e, index)}} > Approve
                                </button>
                                <button type="submit" className="btn btn-danger mx-3 text-white" style={{
                                    width: "12rem",
                                    height: "3rem",
                                    borderRadius: "20px",
                                    marginLeft: "3rem",
                                    fontSize: "20px"
                                }} onClick={(e) => { this.props.handleOrderDecline(e, index) }}>Decline
                                </button>
                                <button type="submit" className="btn btn-secondary mx-3 text-white" style={{
                                    width: "12rem",
                                    height: "3rem",
                                    borderRadius: "20px",
                                    marginLeft: "3rem",
                                    fontSize: "20px"
                                }} onClick={(e) => { this.props.handleOrderHold(e, index) }}> Hold
                                </button>
                            </div>
                        </form> )}
                    </div>
                </div>
            </div>
        );
    }
}

export default DisplayDetailsContainer;