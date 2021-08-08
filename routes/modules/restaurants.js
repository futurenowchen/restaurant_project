const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurants')

//進入新增餐廳頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//搜尋餐廳功能路由
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  RestaurantList.find({
    '$and': [
      { userId },
      {
        '$or': [
          { 'name': { $regex: keyword, $options: '$i' } },
          { 'category': { $regex: keyword, $options: '$i' } }
        ]
      }
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants, keyword: keyword }))
    .catch(error => console.log(error))
})

//餐廳排序功能
router.post('/sort', (req, res) => {
  const sortInput = Number(req.body.sort)
  const sortOutput = {}
  switch (sortInput) {
    case 1:
      sortOutput.name = 'asc'
      break
    case 2:
      sortOutput.name = 'desc'
      break
    case 3:
      sortOutput.category = 'asc'
      break
    case 4:
      sortOutput.location = 'asc'
      break
  }
  const userId = req.user._id
  RestaurantList.find({ userId })
    .lean()
    .sort(sortOutput)
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error))
})

//查詢詳細餐廳資訊路由
router.get('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return RestaurantList.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

//新增餐廳資訊功能路由
router.post('/', (req, res) => {
  const userId = req.user._id
  const restaurant = req.body
  return RestaurantList.create({
    id: restaurant.id,
    name: restaurant.name,
    name_en: restaurant.name_en,
    category: restaurant.category,
    image: restaurant.image,
    location: restaurant.location,
    phone: restaurant.phone,
    google_map: restaurant.google_map,
    rating: restaurant.rating,
    description: restaurant.description,
    userId: userId
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//進入修改餐廳資訊路由
router.get('/:restaurant_id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return RestaurantList.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

//修改餐廳資訊功能路由
router.put('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  const editRestaurant = req.body
  return RestaurantList.findOne({ _id, userId })
    .then(restaurant => {
      restaurant.id = editRestaurant.id,
        restaurant.name = editRestaurant.name,
        restaurant.name_en = editRestaurant.name_en,
        restaurant.category = editRestaurant.category,
        restaurant.image = editRestaurant.image,
        restaurant.location = editRestaurant.location,
        restaurant.phone = editRestaurant.phone,
        restaurant.google_map = editRestaurant.google_map,
        restaurant.rating = editRestaurant.rating,
        restaurant.description = editRestaurant.description
      return restaurant.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//刪除餐廳功能路由
router.delete('/:restaurant_id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.restaurant_id
  return RestaurantList.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router