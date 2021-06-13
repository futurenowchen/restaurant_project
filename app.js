const express = require('express')
const app = express()
const port = 3000
const RestaurantList = require('./models/restaurants')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')



app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

//搜尋餐廳功能路由
app.get('/search', (req, res) => {
  console.log(keyword)
  const keyword = req.query.keyword
  RestaurantList.find({
    '$or': [
      { 'name': { $regex: keyword, $options: '$i' } },
      { 'category': { $regex: keyword, $options: '$i' } }
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants: restaurants, keyword: keyword }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})


