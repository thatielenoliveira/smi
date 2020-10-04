const express = require('express');
const router = express.Router();

const MedicineController = require('../controllers/medicine');

const authenticationMiddleware = require('../config/passport').authenticationMiddleware;
const isAdminMiddleware = require('../controllers/auth').isAdminMiddleware;

router.get('/insertMedicine', authenticationMiddleware, function (req, res, next) {
    MedicineController.getPatients(req, res);
  });
  
router.post('/insertMedicine', authenticationMiddleware, function (req, res, next) {
    MedicineController.createMedicine(req, res);
    });

router.get('/medicines', authenticationMiddleware, function (req, res, next) {
    MedicineController.getMedicines(req, res);
    });

router.get('/editMedicine/:id', authenticationMiddleware, function (req, res, next) {
    MedicineController.findMedicine(req, res);
    });

router.post('/editMedicine/:id', authenticationMiddleware, function (req, res, next) {
    MedicineController.updateMedicine(req, res);
    });

router.get('/deleteMedicine/:id', authenticationMiddleware, function (req, res) {
    MedicineController.deleteMedicine(req, res);  
    });

module.exports = router;