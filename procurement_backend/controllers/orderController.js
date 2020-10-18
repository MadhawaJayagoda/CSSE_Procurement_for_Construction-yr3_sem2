const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const RequestPermissionOrderSchema = require('../models/RequestPermissionOrder');

router.get('/', async (req, res) =>{
    try {
        const orders = await Order.find();
        res.json(orders);
    }catch(err){
        res.json({ message : err});
    }
});

//get a specific order
router.get('/:itemId', async (req, res) => {
    try {
        const orderItem = await Order.findById(req.params.itemId);
        res.json(orderItem);
    }catch(err){
        res.json({ message : err});
    }
});

router.post('/', async(req, res) => {
   //console.log(req.body);
    const order = new Order({
        item: req.body.item,
        item_desc: req.body.item_desc,
        quantity: req.body.quantity,
        unit_price: req.body.unit_price,
        total_cost: req.body.total_cost,
        status: req.body.status,
        priority: req.body.priority,
        directOrder: req.body.directOrder
    });

    try {
        const dat_order = await order.save();
        res.json(dat_order);
    } catch(err){
        res.json({ message : err});
    }
});

module.exports = router;