# restaurant_project

## About The Project
  This is a ALPHA Camp 2-3 & 3 exercise website which can gather and score your favorite restaurants.

## Prerequisites
+ Bootstrap v4
+ jquery v3.3.1
+ popper
+ node v10.15.0
+ express v4.17.1
+ express-handlebars v5.3.2
+ express-session v1.17.2
+ body-parser v1.19.0
+ mongoose v5.12.13
+ method-override v3.0.0
+ passport v0.4.1
+ passport-facebook v3.0.0
+ passport-local v1.0.0
+ bcryptjs v2.4.3
+ Font Awesome

## installation and execution
1. clone this repository to your computer.
 ```
 $ git clone https://github.com/futurenowchen/restaurant_project.git
 ```
2. install the library.
 ```
 $ npm install all of prerequisites
 ```
3. run the seeder data
```
 $ npm run seed
```
4. start this website.
 ```
 $ npm run dev
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
+ Use Method-override to modify routes.
+ Modify mongoose to config.
+ User can use sort function.

### Version 4
+ 使用者可以註冊帳號，擁有自己的餐廳清單
+ 使用者僅能看到自己的清單，無法瀏覽、修改、刪除他人的清單
+ 使用者可以使用Facebook註冊登入
+ 使用者可以在視覺上確認註冊與登入狀態