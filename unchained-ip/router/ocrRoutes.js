const express = require('express');
const router = express.Router();
const { performOCR } = require('../controllers/ocr-controller.js');
const { uploadOCR } = require('../middlewares/multers3.js'); // adjust path if needed

router.post('/ocr', uploadOCR, performOCR);

module.exports = router;
