# ShopsChalange
SpringBoot,Angular-4,Mongodb
---
# Requirement
---
1. Java-1.8.x  
2. Maven-3.x.x
3. MongoDB -3.x.x

#Steps to Setup
---
**1.Clone the application**
`git clone https://github.com/zakiziko/ShopsChalange.git`

**2.Build and run the backend app using maven**

```
cd shopsChalangeBackend
mvn spring-boot:run
```

the backend server start at http://localhost:8080 

**3.import mongodb database and configurate**

```
mongo  
use ShopeChalange  
exit   
mongoimport --db ShopeChalange --collection shops --drop --file shops.metadata.json --port 27017 --host 127.0.0.1    
mongorestore -d ShopeChalange -c shops shops.bson  
``` 
*create mongodb 2dsphere index*

the 2dsphere index will help us to find the nearest shop based on distance  

`db.shops.createIndex( { location : "2dsphere" } )`


**4.Run the frontend using npm**

```
cd shopsChalangeFrontEnd
npm install
npm start
```

Angular Serve will run at port http://localhost:4200

Sources and Documentation
---
https://docs.mongodb.com/manual/core/2dsphere/

https://spring.io/guides/gs/accessing-data-mongodb/

https://angular.io/guide/router

https://www.npmjs.com

https://cli.angular.io

https://angular.io/api/router/CanActivate

https://docs.mongodb.com/manual/reference/program/mongoimport/

https://docs.mongodb.com/manual/reference/program/mongorestore/index.html

https://docs.oracle.com/javase/7/docs/api/java/security/MessageDigest.html
