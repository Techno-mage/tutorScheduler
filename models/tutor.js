module.exports = function(sequelize, DataTypes) {
    var Tutor = sequelize.define("Tutor", {
      tutorProfile: DataTypes.TEXT

    });

    Tutor.associate = function(models){
        Tutor.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })

        Tutor.hasMany(models.Session, {
            onDelete: "cascade"
        })
    }
    return Tutor;
  };

 