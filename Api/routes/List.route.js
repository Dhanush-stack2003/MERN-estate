import express from 'express'
import { ShowListing } from '../controllers/List.controller.js';
import { VerifyToken } from '../utils/verifyToken.js';

const Router = express.Router();

Router.post('/create',VerifyToken,ShowListing)

export default Router