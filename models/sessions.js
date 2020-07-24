module.exports = function(sequelize, DataTypes) {
    var Session = sequelize.define("Session", {
      sessionDetails: DataTypes.TEXT,
      startTime: DataTypes.DATE

    });

    Session.associate = function(models){
        Session.belongsTo(models.Tutor, {
            foreignKey: {
                allowNull: false
            }
        })
        Session.belongsTo(models.Student, {
            
        })
    }
    return Session;
  };