const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurantList = require('./models/restaurants.js')
const mongoose = require('mongoose')

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



app.get('/', (req, res) => {
  restaurantList.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:restaurant_id', (req, res) => {
  const id = req.params.restaurant_id
  return restaurantList.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})


