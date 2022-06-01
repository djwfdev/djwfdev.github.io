import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import motoristRoutes from './routes/motorist_routes.js';
import assistProfRoutes from './routes/assistance-professional_routes.js';
import customerRoutes from './routes/customer_routes.js';
import locationRoutes from './routes/location_routes.js';
import payControllerRoutes from './routes/payment-controller_routes.js';
import receiptRoutes from './routes/receipt_routes.js';
import serviceRoutes from './routes/service_routes.js';
import subMemberRoutes from './routes/subscribed-member_routes.js';
import vehicleRoutes from './routes/vehicle_routes.js';

//import subMemberLogin from './routes/subscribed-member_routes.js';
//import subMemberSignup from './routes/subscribed-member_routes.js';
//import assistProfLogin from './routes/assistance-professional_routes.js';
//import assistProfSignup from './routes/assistance-professional_routes.js';

import motoristForms from './routes/motorist-form_routes.js';
//import motoristFormCustomer from './routes/motorist-form_routes.js';
//import motoristFormMember from './routes/motorist-form_routes.js';

const app = express();
app.use(cors(), express.json());
app.use('/', motoristRoutes);
app.use('/', customerRoutes);
app.use('/', locationRoutes);
app.use('/', payControllerRoutes);
app.use('/', receiptRoutes);
app.use('/', serviceRoutes);
app.use('/', vehicleRoutes);

app.use('/', subMemberRoutes);
//app.use('/', subMemberSignup);
//app.use('/', subMemberLogin);

app.use('/', assistProfRoutes);
//app.use('/', assistProfSignup);
//app.use('/', assistProfLogin);

app.use('/', motoristForms);
//app.use('/', motoristFormCustomer);
//app.use('/', motoristFormMember);

app.use(bodyParser.json({limit: "40mb", extended:true}));
app.use(bodyParser.urlencoded({limit: "40mb", extended:true}));

app.get('/', (req, res) => {
    res.send('Hello to Lemon API');
}); 

const CONNECTION_URL = 'mongodb+srv://csit314-user:csit314@lemon.pmheg.mongodb.net/lemonDB?retryWrites=true&w=majority'; 

mongoose.connect(CONNECTION_URL);   
app.listen(process.env.PORT || 5000); // port to listen on   

