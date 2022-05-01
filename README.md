# Caffee Kiosk

## 개발환경 구축
```shell
$ cp config/config.json.sample config/config.json
$ npm install
$ npm run start:dev
```

## API
```shell
GET http://localhost:3000/category
GET http://localhost:3000/category/{CATEGORY_ID}
GET http://localhost:3000/user?q={PHONE_NUMBER}
POST http://localhost:3000/order
```


---
### TODO
- [x] GET http://localhost:3000/category
- [x] GET http://localhost:3000/category/{CATEGORY_ID}
- [x] GET http://localhost:3000/user?q={PHONE_NUMBER}
- [ ] POST http://localhost:3000/order