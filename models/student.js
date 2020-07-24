module.exports = function(sequelize, DataTypes) {
    var Student = sequelize.define("Student", {
      studentProfile: DataTypes.TEXT

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
  