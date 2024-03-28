const User = require("./User");
const Tank = require("./Tank");
const Animal = require("./Animal");
const Fan = require("./Fan");

User.hasMany(Tank,{
    onDelete:'CASCADE'
});
Tank.belongsTo(User);

Tank.hasMany(Animal,{
    onDelete:'CASCADE'
});
Animal.belongsTo(Tank);

Fan.belongsToMany(Animal,{
    through:"AnimalsFans"
})
Animal.belongsToMany(Fan,{
    through:"AnimalsFans"
})

module.exports = {
    User,
    Tank,
    Animal,
    Fan
}