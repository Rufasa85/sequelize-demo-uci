const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Tank extends Model {}

Tank.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false,
         unique:true,
         validate:{
            len:[4]
         }
    },
    gallons:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min:1
        }
    },
    isSalt:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
},{
    sequelize
});

module.exports=Tank