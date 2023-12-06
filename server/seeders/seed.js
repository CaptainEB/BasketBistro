const db = require('../config/connection');
const { User, Ingredient, List, Recipe } = require('../models')
// bring in seeds ('./userSeeds.json')
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');
