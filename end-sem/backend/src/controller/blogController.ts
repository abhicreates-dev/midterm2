import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";
import ENV from "../utils/config";
import { loginSchema, registerSchema, blogCreateSchema } from "../utils/type";
import { authMiddleware } from "../middleware/authMiddleware";
const jwtSecret = process.env.JWT_SECRET!;

export const blog = async (req: Request,res: Response) =>{
    const blog = await prisma.blog.findMany()

    res.json(blog)
}   


export const blogCreate = async (req:Request, res: Response) =>{
    try {
    const { success, data, error } = blogCreateSchema.safeParse(req.body);

    if (!success) {
        return res.status(400).json({ message: error.message });
    }
    const { title, content } = data;

    const blog = await prisma.blog.create({
        data:{
            title: title,
            content: content,
            authorId: req.user!.userId as number
        }
    })

    return res.status(200).json({ 
        message: "do create it", 
        data: blog
     });
    }
    catch (e){
        console.log(e);
    }
}