const express = require("express");
const router = express.Router();

// #1 import in the Product model
const {Service} = require('../models/index.js')

router.get('/', async (req,res)=>{
    // #2 - fetch all the products (ie, SELECT * from products)
    let services = await Service.collection().fetch();
    res.render('services/index', {
        'services': services.toJSON() // #3 - convert collection to JSON
    })
})

module.exports = router;