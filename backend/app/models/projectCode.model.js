module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'codigo_proyecto',
    {
      actividades_idi_id: {
        type: Sequelize.INTEGER
      },
      dependencia_id: {
        type: Sequelize.INTEGER
      },
      sede_id: {
        type: Sequelize.INTEGER
      },
      numero_orden: {
        type: Sequelize.INTEGER
      },
      año: {
        type: Sequelize.INTEGER
      },
      tiempo_creacion: {
        type: Sequelize.DATE
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};
