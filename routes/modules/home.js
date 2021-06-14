const express = require('express')
const router = express.Router()

const RestaurantList = require('../../models/restaurants.js')

//顯示所有餐廳路由
router.get('/', (req, res) => {
  RestaurantList.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error))
})

module.exports = router