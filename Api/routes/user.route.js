import express from 'express';
import { updateUser } from '../controllers/user.controller.js';
import { VerifyToken } from '../utils/verifyToken.js';

const Router = express.Router();

Router.post('/update/:id',VerifyToken,updateUser)

export default Router