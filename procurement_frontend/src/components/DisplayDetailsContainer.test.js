import React from 'react';
import { shallow, mount } from 'enzyme';
import DisplayDetailsContainer from './DisplayDetailsContainer';

let buttonClicked = false;
let approveBtn = false;

// Unit testing on DisplayDetailsContainer component
describe("<DisplayDetailsComponent />", () => {

    // Mocking this.props()
    const displayDetailsProps = {
        curSelectedObjectData:{
            _id:'5f85a0dffb6606914c9367e1',
            index:1,
            item:"Sand",
            quantity:80,
            total_cost:120500,
            item_desc:"Sand of 80 Cubes",
            edit_order:false,
            unit_price:5800,
            priority:6,
            status:"Pending"
        },
        handleEditOrder: () => {
            buttonClicked = true;
            displayDetailsProps.curSelectedObjectData.edit_order = true;
            //console.log("HandleEditOrder clicked !", buttonClicked);
        },
        onDeleteOrder: (e, index, orderId) => {
            console.log("Delete Order clicked");
        },
        onFormUpdate: (e, index, orderId) => {
            console.log("FOrm Update triggered !");
        },
        handleOrderApprove: (e, index) => {
            approveBtn = true;
            displayDetailsProps.curSelectedObjectData.status = "Approve";
        },
        handleOrderDecline: (e, index) => {
            displayDetailsProps.curSelectedObjectData.status = "Decline";
        },
        handleOrderHold: (e, index) => {
            displayDetailsProps.curSelectedObjectData.status = "Pending";
        }
    };


    it('DisplayComponent Approve button click event', () => {
        const wrapper = shallow(<DisplayDetailsContainer {...displayDetailsProps} />);
        const approveButton = wrapper.find('button.btn.btn-success.mx-3.text-white');
        approveButton.simulate('click');
        console.log("Approve btn clicked ? : ", approveBtn );
        expect(displayDetailsProps.curSelectedObjectData).toEqual(expect.objectContaining({ status : "Approve" }));
    });

    it('DisplayComponent Decline button click event', () => {
        const wrapper = shallow(<DisplayDetailsContainer {...displayDetailsProps} />);
        const declineButton = wrapper.find('button.btn.btn-danger.mx-3.text-white');
        declineButton.simulate('click');
        expect(displayDetailsProps.curSelectedObjectData).toEqual(expect.objectContaining({ status : "Decline" }));
    });

    it('DisplayComponent Hold button click event', () => {
        const wrapper = shallow(<DisplayDetailsContainer {...displayDetailsProps} />);
        const holdButton = wrapper.find('button.btn.btn-secondary.mx-3.text-white');
        holdButton.simulate('click');
        expect(displayDetailsProps.curSelectedObjectData).toEqual(expect.objectContaining({ status : "Pending" }));
    });

    it('DisplayComponent edit button test', () => {
        const wrapper = mount(<DisplayDetailsContainer {...displayDetailsProps} />);
        const editButton = wrapper.find('.edit.badge.badge-pill.badge-warning');
        editButton.simulate('click');
        //console.log("res value : ", res);
        expect(buttonClicked).toBe(true);
    });

    it('DisplayComponent edit button test 02', () => {
        const wrapper = mount(<DisplayDetailsContainer {...displayDetailsProps} />);
        const editButton = wrapper.find('.edit.badge.badge-pill.badge-warning');
        editButton.simulate('click');
        expect(displayDetailsProps.curSelectedObjectData.edit_order).toBe(true);       // Strict Equality
    });

});