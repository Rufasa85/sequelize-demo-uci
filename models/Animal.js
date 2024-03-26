const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Animal extends Model {}

Animal.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false,
         validate:{
            isAlpha:true,
            len:[4]
         }
    },
    species: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[4]
        }
   },
    color: {
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:"gray",
        validate:{
            len:4,
            isLowercase:true,
            notIn:[["salmon"]]
        }
   }
},{
    sequelize
});

module.exports=Animal