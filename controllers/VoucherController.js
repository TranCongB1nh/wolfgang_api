const Voucher = require("../models/voucherModel");
const User = require('../models/userModel');

const voucherController = {
    getAllVouchers: async (req, res) => {
        try {
            const vouchers = await Voucher.find();
            return res.status(200).json(vouchers);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    addVoucher: async (req, res) => {
        try {
            const voucher = new Voucher(req.body);
            const savedVoucher = await voucher.save();
            return res.status(200).json(savedVoucher);
        }
        catch (err) {
            return res.status(500).json(err);
        }
    },

    deleteVoucher: async (req, res) => {
        try {
            const voucherId = req.params.voucherId;
            const voucher = await Voucher.findByIdAndDelete(voucherId);
            if (!voucher) return res.status(404).json({ message: 'Voucher not found' });

            await User.updateMany(
                { vouchers: voucherId },
                { $pull: { vouchers: voucherId } }
            );

            return res.status(200).json({ message: 'Voucher deleted successfully from users' });
        }
        catch (err) {
            return res.status(500).json(err);
        }
    }
};

module.exports = voucherController;