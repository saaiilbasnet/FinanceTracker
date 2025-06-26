import { NextFunction, Request, Response } from "express"

const asyncErrorHandler = (fn :Function)=>{
    return (req: Request, res: Response, next: NextFunction)=>{
       fn(req, res, next).catch((error: Error)=>{
        return res.status(500).json({
            message : error.message,
            fullError : error
        })
       })
    }
}

export default asyncErrorHandler