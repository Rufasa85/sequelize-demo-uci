require("dotenv").config();
const sequelize = require("../config/connection");
const Tank = require("../models/Tank");
const Animal = require("../models/Animal");
const User = require("../models/User");
const tankSeeds = [
  {
    name: "tropical ocean",
    gallons: 5000,
    isSalt: true,
  },
  {
    name: "north pacific rockfish",
    gallons: 1200,
    isSalt: true,
  },
  {
    name: "lakes of washington",
    gallons: 300,
    isSalt: false,
  },
];

const animalSeeds = [
  {
    name: "Barbara",
    species: "manatee",
  },
  {
    name: "Flipper",
    species: "bottlenose dolphin",
  },
  {
    name: "Doctor",
    species: "octopus",
    color: "reddish orange",
  },
];

const userSeeds = [
  {
    username: "Joe",
    password: "password",
  },
  {
    username: "theCats",
    password:  "meowmeow",
  },
  {
    username: "fishFan12",
    password: "caudalPenduncle",
  },
];

//with promises
//   sequelize.sync({force:true}).then(()=>{
//     Tank.bulkCreate(tankSeeds).then(tankData=>{
//         console.log(tankData)
//         console.log('==============================')
//         Animal.bulkCreate(animalSeeds).then(aniData=>{
//             console.log(aniData)
//             process.exit(0);
//         }).catch(err=>{
//             console.log(err);
//         })
//     }).catch(err=>{
//         console.log(err);
//     })
//   }).catch(err=>{
//     console.log(err)
//   })

//with async/await
const seedMe = async () => {
  try {
    await sequelize.sync({ force: true });
    const tankData = await Tank.bulkCreate(tankSeeds);
    const animalData = await Animal.bulkCreate(animalSeeds);
    const userData = await User.bulkCreate(userSeeds,{
      individualHooks:true
    });
    console.table(tankData.map((td) => td.toJSON()));
    console.table(animalData.map((ad) => ad.toJSON()));
    console.table(userData.map((ud) => ud.toJSON()));
    process.exit(0);
  } catch (error) {
    console.log(err);
    process.exit(0);
  }
};

seedMe();
