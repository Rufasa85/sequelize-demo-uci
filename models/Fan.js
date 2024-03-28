const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Fan extends Model {}

Fan.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false
    }
},{
    sequelize
});

module.exports=Fan