import mongoose from "mongoose";



const invoiceSchema = mongoose.Schema({
    items:[{ itemName: String, unitPrice: String, quantity: String, discount: String, vat:Number, totla: Number, subTotal: Number}],
    vat: Number,
    total:Number,
    subTotal:Number,
    invoiceNumber: String,
    dueDate: Date,
    client:[{name: String, email: String, phone: String, address: String, invoiceNumber: String}],
    paymentRecords:[{ amountPaid: Number, datePaid:Date, paymentMethod: String, paidBy: String}],
    createdAt:{
        type: Date,
        default: new Date()
    }
},{
    timestamps: true
})

const Invoice = mongoose.model("Invoice", invoiceSchema)

export default Invoice;