import express from 'express'
import { CreateListing, deleteListing, GetListing, updateListing } from '../controllers/List.controller.js';
import { ShowListing } from '../controllers/List.controller.js'
import {VerifyToken} from '../utils/verifyToken.js'

const Router = express.Router();

Router.post('/create',CreateListing)

Router.get('/listing/:id',VerifyToken,ShowListing)

Router.delete('/listing/delete/:id',VerifyToken,deleteListing)

Router.post('/listing/update/:id',VerifyToken,updateListing)

Router.get('/get/:id',GetListing)

export default Router