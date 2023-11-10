import express from "express";
import { createInvoice, updateInvoice, getInvoiceById,getAllInvoice, deleteInvoice} from "../controller/invoiceInfo.js";


const router = express.Router()

router.post("/createInvoice", createInvoice)
router.put("/updateInvoice/:id", updateInvoice)
router.get("/getInvoiceById/:id", getInvoiceById)
router.get("/getAllInvoice", getAllInvoice)
router.delete("/deleteInvoice/:id", deleteInvoice)





export default router;