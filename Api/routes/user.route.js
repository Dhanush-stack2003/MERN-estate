import express from 'express';
import { deleteUser, updateUser,getuser } from '../controllers/user.controller.js';
import { VerifyToken } from '../utils/verifyToken.js';

const Router = express.Router();

Router.post('/update/:id',VerifyToken,updateUser)

Router.delete('/delete/:id',VerifyToken,deleteUser)

Router.get('/:id',VerifyToken,getuser)

export default Router