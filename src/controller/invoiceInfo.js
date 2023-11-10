import Invoice from "../model/invoice.js";




const createInvoice = async (req, res) =>{
    const {items, vat, total, subTotal, invoiceNumber, dueDate,client, paymentRecords} = req.body;
    try{
        await Invoice.create(([{items},{paymentRecords},{client}]), vat, total, subTotal, invoiceNumber, dueDate).then(
            (invoice) => {
                res.status(201).json({message: "Invoice generated successfully", invoice})
            }
        )
    } catch (err) {
        res.status(400).json({ message: "Failed to generate Invoice"})
    }
}

const updateInvoice = async (req, res) => {
  const {items, vat, total, subTotal, invoiceNumber, dueDate, client, paymentRecords} = req.body;
  const invoice = await Invoice.findById(req.params.id)
  if(invoice) {
    invoice.items = items
    invoice.vat = vat
    invoice.total = total
    invoice.subTotal = subTotal
    invoice.invoiceNumber = invoiceNumber
    invoice.dueDate = dueDate
    invoice.client = client
    invoice.paymentRecords = paymentRecords

    const updateInvoice = await invoice.save();
    //console.log.log(updateInvoice)
    res.status(200).json({ message: "Invoice updated successfully", invoice})
  } else {
    res.status(404).json({ message: "Invoice not found"})
  }
}

const getInvoiceById = async (req, res) => {
    const invoice = await Invoice.findById(req.params.id)
    if(invoice) {
        res.json(invoice)
       
    } else{
        res.status(400).json({ message:"Invoice not found"})
    }
}


const getAllInvoice = async (req, res) => {
  const invoice = await Invoice.find({})
  res.json(invoice)
}

const deleteInvoice = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await Invoice.findByIdAndDelete(id)
        res.status(201).json({ message: "Invoice Removed"})
    } catch (err) {
        res.status(400)
        .json({ message: "Invoice not found", error: err.message})
    }
}
export {createInvoice, updateInvoice, getInvoiceById, getAllInvoice, deleteInvoice}