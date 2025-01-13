import express from 'express';
import { signin } from '../controllers/Auth.controller.js';
import { signup } from '../controllers/Auth.controller.js';
import { google } from '../controllers/Auth.controller.js';

const Router = express.Router();

Router.post('/signup',signup)

Router.post('/signin',signin)

Router.post('/google',google)

export default Router