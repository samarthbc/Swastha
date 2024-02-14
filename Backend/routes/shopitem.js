const express = require('express');
const router = express.Router();
const ShopItem = require('../models/ShopItem')
const { body, validationResult } = require('express-validator');
const multer = require('multer')
const path = require('path')

// A middleware used to parse the incoming post request into JSON
router.use(express.json());

// To create a new shop item
router.post('/createitem', async (req, res) => {
    try {
        let item = await ShopItem.create({
            name: req.body.name,
            description: req.body.description,
            manuDate: req.body.manuDate,
            expDate: req.body.expDate,
            mrp: req.body.mrp,
            sp: req.body.sp,
        })
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error })
        console.log(error)
    }
})

// Get all items
router.get('/getall',async (req,res)=>{
    let allitem = await ShopItem.find()
    return res.status(200).json(allitem)
})

// Get single item by id
router.post('/getone',async(req,res)=>{
    let itemId = req.body.id
    let reqitem = await ShopItem.findById(itemId)
    res.status(200).json(reqitem)
})

// Update item by id
router.post('/update',async(req,res)=>{
    let itemId = req.body.id;
    let reqitem = await ShopItem.findById(itemId)
    Object.assign(reqitem, req.body)
    await reqitem.save()
    res.status(200).json(reqitem)
})

// Update itemimg
// Setting up a folder to store images using multer
const storage = multer.diskStorage({
    destination:(req,res,cb) => {
      cb(null,"public/shop")
    },
    filename:(req,file,cb) => {
      cb(null, file.fieldname+"_"+Date.now()+path.extname(file.originalname))
    }
  })
  
const upload = multer({
    storage: storage
  })

router.post('/updateimg/:id',upload.single('file'),async(req,res)=>{
    
    let itemId = req.params.id;
    try{
        let item = await ShopItem.findById(itemId)
        Object.assign(item,{itemImg:`shop/${req.file.filename}`})
        await item.save()
        res.status(200).json({"success":true})
    } catch(error){
        res.status(500).json({"error":error})
        console.log(error)
    }
})


module.exports = router