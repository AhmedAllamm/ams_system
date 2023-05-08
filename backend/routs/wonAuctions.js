// const express = require('express');
// const router = express.Router();

// router.get('/won-auctions', async (req, res) => {
//   try {
//     const wonAuctions = await Auction.find({ winner: req.user._id }).populate('purchaseHistory.buyer');
//     res.json(wonAuctions);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Server Error');
//   }
// });

// module.exports = router;