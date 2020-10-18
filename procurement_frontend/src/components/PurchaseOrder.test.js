import React from 'react';
import { shallow, mount } from 'enzyme';
import PurchaseOrder from "./PurchaseOrder";

describe("<PurchaseOrder />", () => {

    const purchaseOrderProps = {
        callAPIGetAllOrders : jest.fn(async() => {
            const url = "http://localhost:3000/order";
            await global.fetch(url).then( res => res.json()).then(data => { console.log("Data from API call : ", data) })
                .catch( err => { console.log({ Err_message: err})});
        })
    };


    beforeEach(() => {
        const wrapper = mount( <PurchaseOrder {...purchaseOrderProps} />);
    });

    it('call API - fetch data ', async() => {
        //expect(purchaseOrderProps.callAPIGetAllOrders).toBeCalled();
        expect(await purchaseOrderProps.callAPIGetAllOrders).toHaveBeenCalledTimes(1);
    });
});