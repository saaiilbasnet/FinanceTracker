import { Request, Response } from "express";
import User from "../database/models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController{

    static async registerUser(req : Request, res: Response){

        if(req.body == undefined){
            return res.status(400).json({
                message : "Invalid Creadiantials!"
            })
        }

        const {username, email, password} = req.body;

        if(!email || !password || !username){
            res.status(400).json({
                message : "Please enter email, username and password"
            })
        }else{

            await User.create({
                username : username,
                email : email,
                password : bcrypt.hashSync(password, 10)
            })

            res.status(200).json({
                message : "Successfully registered user!"
            })

        }

    }

    static async loginUser(req: Request, res: Response):Promise<void>{

        const {email, password} = req.body;
        if(!email || !password){
             res.status(400).json({
                message : "Please enter email and password!"
            })
        }

        const userData = await User.findOne({
            where : {
                email : email
            }
        })

        //check if the user exist 

    if(!userData){

         res.status(404).json({
            message : "Please Register the user!"
        })

    }else{

        const isPasswordMatched = bcrypt.compareSync(password, userData.password);

        if(!isPasswordMatched){
             res.status(401).json({
                message : "Invalid Crediantials!"
            })
        }else{
            // @ts-ignore
            const token = jwt.sign({
                id : userData.id
            }, process.env.JWT_SECRET!,{
                expiresIn : process.env.JWT_EXPIRES_IN
            })
                    res.status(200).json({
            message : "Login Successful!",
            token : token
        })
        }

    }

    }

}

export default AuthController
