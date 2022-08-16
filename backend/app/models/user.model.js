module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'usuario',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        required: true,
      },
      usuario: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true,
      },
      tiempo_creacion: {
        type: Sequelize.DATE
      },
    },
    { timestamps: false, freezeTableName: true }
  );
};
