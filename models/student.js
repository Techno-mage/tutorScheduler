module.exports = function(sequelize, DataTypes) {
    var Student = sequelize.define("Student", {
      profile: DataTypes.STRING

    });

    Student.associate = function(models){
        Student.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Student;
  };
  