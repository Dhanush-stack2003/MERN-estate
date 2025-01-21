import express from 'express'
import { CreateListing } from '../controllers/List.controller.js';
import { ShowListing } from '../controllers/List.controller.js'
import {VerifyToken} from '../utils/verifyToken.js'

const Router = express.Router();

Router.post('/create',CreateListing)

Router.get('/listing/:id',VerifyToken,ShowListing)

export default Router