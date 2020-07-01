require('dotenv').config()
const express=require('express');
const massive=require('massive');
const products_controller = require('./products_controller');

const app = express();

const {SERVER_PORT, CONNECTION_STRING} = povess.env;


massive({
    CONNECTION_STRING: CONNECTION_STRING,
    ssl: {rejectUnauthorised: false}
}).then(dbInstance => {
    app.set('db', dbInstance);
    console.log('db connected')
})
.catch(err => console.log(err))

app.use(express.json());

app.post('/api/products', products_controller.create);
app.get('/api/prodicts', products_controller.getAll);
app.get('/api/products', products_controller.getOne);
app.get('/api/products/:id', products_controller.update);
app.get('/api/products/:id', products_controller.delete);

app.listen(SERVER_PORT, () =>{
    console.log(`Server listening on ${SERVER_PORT}.`);
});