const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Restaurants = require('../restaurants')
const User = require('../user')
const restaurantSeeder = require('./restaurant.json')
const db = require('../../config/mongoose')


const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurants: restaurantSeeder.results.slice(0, 4)
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678',
    restaurants: restaurantSeeder.results.slice(4, 8)
  }
]

db.once('open', () => {
  Promise.all(Array.from(SEED_USER, (seedUser) => {
    const { name, email, password, restaurants } = seedUser
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({ name, email, password: hash }))
      .then(user => {
        return Promise.all(Array.from(restaurants, (restaurant) => {
          const { name, name_en, category, image, location, phone, google_map, rating, description } = restaurant
          const userId = user._id
          return Restaurants.create({ name, name_en, category, image, location, phone, google_map, rating, description, userId })
        }))
      })
  }))
    .then(() => {
      console.log('done.')
      process.exit()
    })
})