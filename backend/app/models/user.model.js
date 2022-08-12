module.exports = (sequelize, Sequelize) => {
  return sequelize.define(
    'user',
    {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.ENUM({
          values: ['male', 'female']
        }),
      },
      phone: {
        type: Sequelize.STRING
      },
      deleted_at: {
        type: Sequelize.DATE
      },
      soft_delete: {
        type: Sequelize.TINYINT
      },
      is_super_admin: {
        type: Sequelize.TINYINT
      },
    }
  );
};
