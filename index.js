const express   =   require('express');
const app       =   express();
const mongoose  =   require('mongoose')
const dotenv    =   require('dotenv')
let cors = require('cors');

//IMPORT ROUTES
const authRoute =   require('./routes/auth')
const postRoute =   require('./routes/posts')

//CONNECT TO MONGODB
dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true,useUnifiedTopology: true },
()=>console.log('connected to mongodb!')
);

//MIDDLEWARES
app.use(express.json());
app.use(cors());
//ROUTE MIDDLEWARE
app.use('/api/user', authRoute);
app.use('/api/posts',postRoute);

app.listen(3001, () => console.log('server started on 3000'));
