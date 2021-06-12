const express = require('express')
const router = express.Router()
const RestaurantList = require('../../models/restaurants')

//進入新增餐廳頁面路由
router.get('/new', (req, res) => {
  return res.render('new')
})

//查詢詳細餐廳資訊路由
router.get('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return RestaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})


//新增餐廳資訊功能路由
router.post('/', (req, res) => {
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
    description: restaurant.description
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//進入修改餐廳資訊路由
router.get('/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return RestaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

//修改餐廳資訊功能路由
router.put('/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  const editRestaurant = req.body
  return RestaurantList.findById(id)
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
  const id = req.params.restaurant_id
  return RestaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router