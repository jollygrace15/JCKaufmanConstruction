const express = require("express");
const router = express.Router();

// import in the Forms
const { bootstrapField, createServiceForm } = require('../forms');

// #1 import in the Product model
const {Service} = require('../models/index.js')

router.get('/', async (req,res)=>{
    // #2 - fetch all the products (ie, SELECT * from products)
    let services = await Service.collection().fetch();
    res.render('services/index', {
        'services': services.toJSON() // #3 - convert collection to JSON
    })
})

router.get('/create', async (req, res) => {
    const serviceForm = createServiceForm();
    res.render('services/create',{
        'form': serviceForm.toHTML(bootstrapField)
    })
})

router.post('/create', async(req,res)=>{
    const serviceForm = createServiceForm();
    serviceForm.handle(req, {
        'success': async (form) => {
            const service = new Service();
            service.set('name', form.data.name);
            service.set('min-rate', form.data.min-rate);
            service.set('max-rate', form.data.max-rate);
            service.set('description', form.data.description);
            await service.save();
            res.redirect('/services');

        }
    })
})


module.exports = router;