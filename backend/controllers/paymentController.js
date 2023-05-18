const Payment = require('../models/PaymentModel')
const mongoose = require('mongoose')

// get all payments
const getPayments = async (req , res) => {
    const payments = await Payment.find({}).sort({createdAt: -1})

    res.status(200).json(payments)
}

//get a single payment
const getPayment = async(req , res) => {
   const {id} = req.params

   if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such payment'})
   }

   const payment = await Payment.findById(id)

   if(!payment){
    return res.status(404).json({error: 'No such Payment!'})
   }
   res.status(200).json(payment)
}

//create a new payment
const createPayment = async (req , res) =>{
    const {user  ,orderID , amount ,pmethod ,dmethod ,address ,district ,country ,phoneNo, dStatus } = req.body

    const errors = {};

    if (!pmethod) {
        errors.pmethod = 'Payment method is required';
      }
      if (!dmethod) {
        errors.dmethod = 'Delivery method is required';
      }
      if (!address) {
        errors.address = 'Address is required';
      }
      if (!district) {
        errors.district = 'District is required';
      }
      if (!country) {
        errors.country = 'Country is required';
      }
      if (!phoneNo) {
        errors.phoneNo = 'Phone number is required';
      }
     

      //add doc to db
      try{
        const payment = await Payment.create({user  ,orderID ,amount ,pmethod ,dmethod ,address ,district ,country ,phoneNo, dStatus})
        res.status(200).json(payment)
      }catch(error){
        res.status(400).json({error: error.message})
      }
  }


//delete a payment
const deletePayment = async (req , res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such payment'})
       }

    const payment = await Payment.findByIdAndDelete({_id: id})

    if(!payment){
        return res.status(404).json({error: 'No such Payment!'})
       }
       res.status(200).json(payment)

}

//update a payment
const updatePayment = async (req , res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such payment'})
       }

    const payment = await Payment.findByIdAndUpdate({_id:id} , {
        ...req.body
    },
    { new: true })
    
    if(!payment){
        return res.status(404).json({error: 'No such Payment!'})
       }
       console.log("payment", payment)
       res.status(200).json(payment) 

}

// // get payments for a specific user
// const getUserPayments = async (req, res) => {
//     const {user} = req.params

//     if(!mongoose.Types.ObjectId.isValid(user)) {
//         return res.status(404).json({error:'No such user'})
//     }

//     const payment = await Payment.find({user:user})

//     if (!payment) {
//         return res.status(404).json({error: 'No installments'})
//     }
    
//     res.status(200).json(payment)
// }


const getUserPayments = async (req, res) => {
    try {
        const { user } = req.params;

        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(404).json({ error: 'No such user' });
        }

        const payments = await Payment.find({ user });

        if (payments.length === 0) {
            return res.status(404).json({ error: 'No payments' });
        }

        res.status(200).json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};


module.exports = {
    createPayment,
    getPayment,
    getPayments,
    deletePayment,
    updatePayment,
    getUserPayments
}