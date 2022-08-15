const {
  createOKResponse,
  createErrorResponse,
} = require("../factories/responses/api");

const db = require('../models');

exports.getNecessaryInfo = async (req, res) => {
  const activities = await db.activities.findAll();
  const dependency = await db.dependency.findAll();
  const headquarter = await db.headquarter.findAll();

  const count = await db.projectCode.count() + 1;
  const orderNumber = count.toString().padStart(3, '0');

  const today = new Date();
  const years = [];
  let startYear = 1980;  
  let currentYear = today.getFullYear();
  while ( startYear <= currentYear ) {
      years.push(currentYear --);
  }

  const projectCodes = {activities, dependency, headquarter, orderNumber, years, today};

  return res.json(projectCodes);
};

exports.addNewProjectCode = async (req, res) => {
  try {
    const newData = await db.projectCode.create({
      actividades_idi_id: req.body.activities,
      dependencia_id: req.body.dependency,
      sede_id: req.body.headquarter,
      numero_orden: req.body.orderNumber,
      año: req.body.year,
    });
    return res.json({
      status: 'success',
      data: newData
    });
  } catch (error) {
    return createErrorResponse({
      errors: error.errors,
      msg: error.message,
    });
  }
};