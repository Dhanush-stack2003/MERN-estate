import express from 'express';
import { deleteUser, updateUser } from '../controllers/user.controller.js';
import { VerifyToken } from '../utils/verifyToken.js';

const Router = express.Router();

Router.post('/update/:id',VerifyToken,updateUser)

Router.delete('/delete/:id',VerifyToken,deleteUser)

export default Router