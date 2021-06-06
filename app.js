const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./models/restaurants.js')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


//顯示所有餐廳路由
app.get('/', (req, res) => {
  restaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error))
})


//為什麼get('/restaurants/new')，放在get('/restaurants/:restaurant_id')後面，會造成頁面將new當id讀入資料庫中，因而錯誤呢？

//進入新增餐廳頁面路由
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

//查詢詳細餐廳資訊路由
app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})


//新增餐廳資訊功能路由
app.post('/restaurants', (req, res) => {
  const restaurant = req.body
  return restaurantList.create({
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
app.get('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

//修改餐廳資訊功能路由
app.post('/restaurants/:restaurant_id/edit', (req, res) => {
  const id = req.params.restaurant_id
  const editRestaurant = req.body
  return restaurantList.findById(id)
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
app.post('/restaurants/:restaurant_id/delete', (req, res) => {
  const id = req.params.restaurant_id
  return restaurantList.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//搜尋餐廳功能路由
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  restaurantList.find({
    '$or': [
      { 'name': { $regex: keyword, $options: '$i' } },
      { 'category': { $regex: keyword, $options: '$i' } }
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})


