require("dotenv").config();
const sequelize = require("../config/connection");
const {User,Tank,Animal,Fan} = require("../models");

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
const fanSeeds = [
  {
    name:"Tommy"
  },
  {
    name:"Tammy"
  },
  {
   name:"Timmy"
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
    const fanData = await Fan.bulkCreate(fanSeeds);
    console.table(tankData.map((td) => td.toJSON()));
    console.table(animalData.map((ad) => ad.toJSON()));
    console.table(userData.map((ud) => ud.toJSON()));
    console.table(fanData.map((fd) => fd.toJSON()));
    await fanData[0].addAnimals([1,3])
    await animalData[1].addFans([1,2])
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};

seedMe();
