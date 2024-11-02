const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/active', adminController.getActiveUsers);
router.post('/create', adminController.createUser);
router.put('/update/:id', adminController.updateUser);
router.delete('/delete/:id', adminController.deleteUser);

module.exports = router;

