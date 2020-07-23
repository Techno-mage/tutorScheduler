module.exports = function(sequelize, DataTypes) {
    var Tutor = sequelize.define("Tutor", {
      profile: DataTypes.STRING

    });

    Tutor.associate = function(models){
        Tutor.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Tutor;
  };