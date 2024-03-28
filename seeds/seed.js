require("dotenv").config();
const sequelize = require("../config/connection");
const {User,Tank,Animal} = require("../models");

const tankSeeds = [
  {
    name: "tropical ocean",
    gallons: 5000,
    isSalt: true,
    UserId:1
  },
  {
    name: "north pacific rockfish",
    gallons: 1200,
    isSalt: true,
    UserId:2
  },
  {
    name: "lakes of washington",
    gallons: 300,
    isSalt: false,
    UserId:1
  },
];

const animalSeeds = [
  {
    name: "Barbara",
    species: "manatee",
    TankId:1
  },
  {
    name: "Flipper",
    species: "bottlenose dolphin",
    TankId:1
  },
  {
    name: "Doctor",
    species: "octopus",
    color: "reddish orange",
    TankId:3
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
    const userData = await User.bulkCreate(userSeeds,{
      individualHooks:true
    });
    const tankData = await Tank.bulkCreate(tankSeeds);
    const animalData = await Animal.bulkCreate(animalSeeds);
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
