const voucherController = require("../controllers/VoucherController");

const router = require("express").Router();

router.get("/", voucherController.getAllVouchers);

router.post("/", voucherController.addVoucher);

router.delete("/:voucherId", voucherController.deleteVoucher);

module.exports = router;