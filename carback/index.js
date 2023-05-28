import express from "express";
const app = express();
import path from "path";
import cors from 'cors';
import mongoose from "mongoose";
const port = 4000;



app.use(cors());

app.use(express.json());

// export const connect = async () => {
 mongoose.connect('mongodb://localhost:27017/car');
// };
// await connect();
const ProductSchema = new mongoose.Schema({
    car_name: String,
    years: String,
    price: Number,
    color : String,
    milage : Number,
    power : Number,
    speed : Number,
});
const DealerSchema = new mongoose.Schema({
    car_name: String,
    Kms: Number,
    Original_Paint: String,
    Number_Accident : Number,
    Number_Buyer : Number,
    Registration_Place : String,
    
});
const Car = mongoose.model('cardetails',ProductSchema);
const Dealer = mongoose.model('dealer',DealerSchema);


app.post('/in',async (req,res)=>{
    let data = await Car(req.body);
    let result = await data.save();
    res.send(result);
});
app.get('/', async (req,res)=>{
    let data = await Car.find();
    // console.log(data);
    res.send(data);
});



app.delete('/delete/:_id',async (req,res)=>{
    // console.log(req.params._id);
    let data = await Car.deleteMany({ _id : req.params._id});
    res.send(data);
});

app.get('/search/:k', async(req,res)=>{
    console.log(req.params.k);
    let data = await Car.find(
        {
            "$or":[
                {"car_name" : { $regex : req.params.k }}
            ]
        }
    )
    console.log(data);
    res.send(data);
});


app.get('/dealer', async (req,res)=>{
    let data = await Dealer.find();
    // console.log(data);
    res.send(data);
});
app.post('/del',async (req,res)=>{
    let data = await Dealer (req.body);
    let result = await data.save();
    res.send(result);
});

app.listen(port,()=>{
    console.log("server is started.. now");
});