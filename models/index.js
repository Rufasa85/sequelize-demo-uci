const User = require("./User");
const Tank = require("./Tank");
const Animal = require("./Animal");

User.hasMany(Tank,{
    onDelete:'CASCADE'
});
Tank.belongsTo(User);

Tank.hasMany(Animal,{
    onDelete:'CASCADE'
});
Animal.belongsTo(Tank);

module.exports = {
    User,
    Tank,
    Animal
}