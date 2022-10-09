docker exec -it mongodb \
    mongo --host localhost -u admin -p admin authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'rodrigo', pwd: '123456', roles:[{role: 'readWrite, db: 'herois'}]})"