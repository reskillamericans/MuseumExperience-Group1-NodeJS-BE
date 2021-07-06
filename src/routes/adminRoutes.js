const express = require('express');
const router = express.Router();
const AdminCtrl = require('../controllers/adminController');

// post route for admins
router.post('/admins', AdminCtrl.createAdmin);

//fetch admins
router.get('/admins', AdminCtrl.fetchAdmin);

//fetch single admin
router.get('/admins/:id', AdminCtrl.fetchSingleAdmin);

//send questions to admin via /admins/admin_id/questions
router.post('/admins/:id/questions', AdminCtrl.addQuizToAdmin)

module.exports = router;
