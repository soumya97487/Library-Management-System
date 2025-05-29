const express = require('express');
const router = express.Router();
const controller = require('../controllers/loanController');

router.get('/', controller.getAllLoan);
router.get('/:id', controller.getLoanById);
router.post('/', controller.createLoan);
router.put('/:id', controller.updateLoan);
router.delete('/:id', controller.deleteLoan);

module.exports = router;

