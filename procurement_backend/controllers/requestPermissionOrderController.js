const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RequestPermissionOrderSchema = require('../models/RequestPermissionOrder');

router.get('/', async(req, res) => {
    try {
        const orders = await RequestPermissionOrderSchema.find();
        res.json(orders);
    }catch(err){
        res.json({ message : err});
    }
});

// Add many request permission orders to the database at once.
router.post('/many', async(req, res) => {
    let permissionOrders = req.body;

    for( let perOrder of permissionOrders){
        perOrder._id = mongoose.Types.ObjectId(perOrder._id);
        //console.log(perOrder._id);
    }

    RequestPermissionOrderSchema.collection.insertMany(permissionOrders, function (err, req_orders) {
        if(err){
            return console.error(err);
        } else {
            console.log("Multiple records inserted successfully");
            res.status(200).json('Multiple records inserted successfully');
        }
    });
    // for (let order of permissionOrders){
    //     //console.log(order.item);
    //     const requestPermissionOrder = new RequestPermissionOrderSchema({
    //         item: order.item,
    //         item_desc: order.item_desc,
    //         quantity: order.quantity,
    //         unit_price: order.unit_price,
    //         total_cost: order.total_cost,
    //         status: order.status,
    //         priority: order.priority,
    //         directOrder: order.directOrder
    //     });
    //
    //     await requestPermissionOrder.save()
    //         .then( dat_order => {
    //             res.json(dat_order);
    //         })
    //         .catch( err => {
    //             res.json({ message : err});
    //         });
    // };
});

//Using the RequestOrderID update the order details


//Delete one request permission order in the database at once
router.delete('/del/:orderId', async(req, res) => {
    let orderId = req.params.orderId;
    try{
        const deleteOrder = await RequestPermissionOrderSchema.findByIdAndDelete(orderId);
        res.status(200).json(deleteOrder);
    } catch(err){
        res.status(500).json({ message : err})
    }
});

//Update a Document in the collection by ID
router.put('/updorder/:orderId', async(req, res) => {
    console.log("Update document with ID : ", req.params.orderId);
    console.log("Body of the Update request : ", req.body );

    let update_orderId = req.params.orderId;
    let new_item = req.body.item;
    let new_item_desc = req.body.item_desc;
    let new_quantity = req.body.quantity;
    let new_unit_price =  req.body.unit_price;
    let new_total_cost = new_quantity * new_unit_price;
    let new_status = req.body.status;
    let new_priority = req.body.priority;

    // let update_obj = {
    //     item:""
    // };
    //
    // let update_with_obj = {
    //     item: "",
    //     quantity: 0,
    //     unit_price: 0,
    //     total_cost: 0,
    //     item_desc: "",
    //     priority: 0,
    //     status: "",
    //     directOrder: false
    // };
    //
    // update_obj.item = new_item;
    //
    // update_with_obj.item = new_item;
    // update_with_obj.item_desc = new_item_desc;
    // update_with_obj.quantity = new_quantity;
    // update_with_obj.unit_price = new_unit_price;
    // update_with_obj.total_cost = new_total_cost;
    // update_with_obj.status = new_status;
    // update_with_obj.priority = new_priority;

    await RequestPermissionOrderSchema.findByIdAndUpdate( update_orderId, {
            $set: {
                item: new_item,
                item_desc: new_item_desc,
                quantity: new_quantity,
                unit_price: new_unit_price,
                total_cost: new_total_cost,
                status: new_status,
                priority: new_priority,
                directOrder: false
            }
        },
        { new: true, useFindAndModify: false}, function (err, docs) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                console.log("Updated Request Permission Order : ", docs);
                res.json(docs);
            }
        });

    // const doc = await RequestPermissionOrderSchema.updateOne(update_obj, update_with_obj);
    // res.send(doc);
});

// delete one document by order item
router.delete('/delone', async(req, res) => {
    let del_ord = {
        item : ""
    };

    del_ord.item = req.body.item;

    const doc = await RequestPermissionOrderSchema.deleteOne(del_ord );
    res.send(doc);
});

//Delete many Request Permission Orders at once
router.delete('/delall', async(req, res) => {
    let permissionOrders = req.body;
    let permissionOrdersId = [];
    for (let order of permissionOrders) {
        permissionOrdersId.push(order._id);

        // await RequestPermissionOrderSchema.findByIdAndDelete(order._id, function (err, deleteOrders) {
        //     if (err){
        //         console.error(err);
        //         res.json({message : err.message, stack : err.stack});
        //     }
        //     else{
        //         res.json(deleteOrders);
        //     }
        // });
    }
    RequestPermissionOrderSchema.deleteMany({
        _id : {
            $in : permissionOrdersId
        }
    }, function (err, result) {
        if (err){
           res.send(err);
        } else {
            res.json('Multiple records deleted successfully');
        }
    })

});

module.exports = router;