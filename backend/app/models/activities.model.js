module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'actividades_idi',
    {
      nombre: {
        type: Sequelize.STRING
      },
      sigla: {
        type: Sequelize.STRING
      },
      tiempo_creacion: {
        type: Sequelize.DATE
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};
