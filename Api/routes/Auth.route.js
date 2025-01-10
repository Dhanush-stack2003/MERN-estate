import express from 'express';

import { signup } from '../controllers/Auth.controller.js';

const Router = express.Router();

Router.post('/signup',signup)

export default Router