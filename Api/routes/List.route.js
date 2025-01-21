import express from 'express'
import { ShowListing } from '../controllers/List.controller.js';

const Router = express.Router();

Router.post('/create',ShowListing)

export default Router