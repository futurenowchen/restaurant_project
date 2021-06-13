# restaurant_project

## About The Project
  This is a ALPHA Camp 2-3 exercise website which can gather and score your favorite restaurants.

## Prerequisites
+ Bootstrap v4
+ jquery v3.3.1
+ popper
+ node v10.15.0
+ express v4.17.1
+ express-handlebars v5.3.2
+ body-parser v1.19.0
+ mongoose v5.12.13
+ method-override v3.0.0
+ Font Awesome

## installation and execution
1. clone this repository to your computer.
 ```
 $ git clone https://github.com/futurenowchen/restaurant_project.git
 ```
2. install the library.
 ```
 $ npm i express express-handlebars body-parser mongoose
 ```
3. run the seeder data
```
 $ node /models/seeds/restaurantSeeder.js
```
4. start this website.
 ```
 $ npm run dev
 ```
or
 ```
 $ nodemon app.js
 ```
## Features
### Version 1
+ 使用者可以瀏覽「我的餐廳清單」資料庫中的評分。
+ 使用者可以進入感興趣的餐廳，查詢詳細資料：類別、地址、電話、google map連結。
+ 使用者可以透過關鍵字搜尋餐廳名稱（已優化移除空白符號）。
+ 使用者若查詢不到餐廳，會顯示查詢的關鍵字，並提示重新搜尋。

### Version 2
+ 導入mongodbdb，重建餐廳資料CRUD的路由。
+ 使用者可以新增餐廳資訊
+ 使用者可以修改餐廳資訊
+ 使用者可以刪除餐廳資訊

### Version 3
+ use Method-override to modify routes.
+ modify mongooose to config.
