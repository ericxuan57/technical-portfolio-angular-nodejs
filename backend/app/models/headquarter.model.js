module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'sede',
    {
      nombre: {
        type: Sequelize.STRING
      },
      sigla: {
        type: Sequelize.STRING
      },
      nombre_sede_exp: {
        type: Sequelize.STRING
      },
      tiempo_creacion: {
        type: Sequelize.DATE
      }
    },
    { timestamps: false, freezeTableName: true }
  );
};
