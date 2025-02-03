const express = require('express');
const {loginHandle, logoutHandle, signinHandle, homePage, createAuction, addPeople,sendUserDetails, getRequestedList,getMyAuctions,getAuctionParticipants} = require('../controllers/auctionApp.js');

const routes = express.Router();
const routesAuction = express.Router();

routes.route('/login').post(loginHandle);
routes.route('/signin').post(signinHandle);
routes.route('/logout').post(logoutHandle);
routes.route('/getUser').get(sendUserDetails);
routes.route('/getRequestedList').get(getRequestedList);
routes.route('/getMyAuctions').get(getMyAuctions);
routes.route('/getAuctionParticipants').get(getAuctionParticipants);
routes.route('/').get(homePage);
routesAuction.route('/').post(createAuction);
//routesAuction.route('/add').post(addPeople);

module.exports={
    routes,
    routesAuction,

}

