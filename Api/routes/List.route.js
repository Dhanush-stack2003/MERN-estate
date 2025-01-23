import express from 'express'
import { CreateListing, deleteListing } from '../controllers/List.controller.js';
import { ShowListing } from '../controllers/List.controller.js'
import {VerifyToken} from '../utils/verifyToken.js'

const Router = express.Router();

Router.post('/create',CreateListing)

Router.get('/listing/:id',VerifyToken,ShowListing)

Router.delete('/delete/:id',VerifyToken,deleteListing)

export default Router