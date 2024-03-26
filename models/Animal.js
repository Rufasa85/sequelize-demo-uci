const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Animal extends Model {}

Animal.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false
    },
    species: {
        type: DataTypes.STRING,
        allowNull:false
   },
    color: {
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:"gray"
   }
},{
    sequelize
});

module.exports=Animal