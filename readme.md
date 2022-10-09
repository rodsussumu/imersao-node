docker run --name postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGODB_INITDB_ROOT_PASSWORD=admin -d mongo:4

docker exec -it mongodb \
 mongo --host localhost -u admin -p admin authenticationDatabase admin \
 --eval "db.getSiblingDB('herois').createUser({user: 'rodrigo', pwd: '123456', roles:[{role: 'readWrite, db: 'herois'}]})"
