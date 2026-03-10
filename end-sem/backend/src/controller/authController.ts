import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../db";
import ENV from "../utils/config";
import { loginSchema, registerSchema } from "../utils/type";
import { authMiddleware } from "../middleware/authMiddleware";
const jwtSecret = process.env.JWT_SECRET!;



export const register = async (req: Request, res: Response) => {
    const { success, data, error } = registerSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: error.message });
    }
    const { email, password, name } = data;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
    });

    return res.status(201).json({
        message: "Signup successful",
        user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt },//remember to add usercreate in frontend
    });
};

export const login = async (req: Request, res: Response) => {
    //write code in here
    const { success, data, error } = loginSchema.safeParse(req.body);
    if (!success) {
        return res.status(400).json({ message: error.message });
    }
    const { email, password } = data;

    console.log("problem 1")

    const user = await prisma.user.findUnique({ where: { email } });
        console.log("problem 2")

    if (!user) {
        return res.status(409).json({ message: "Please Signup first" });
    }
        console.log("problem 3")

    const hashedPassword = await bcrypt.compare(password, user.password);

    if(!hashedPassword){
        return res.status(400).json({ message: "Wrong Password" });
    }

        console.log("problem 1")

    const token = jwt.sign(
        { userId: user.id },
        jwtSecret
    )
    

    return res.status(201).json({
        token: token,
        message: "Signup successful",
        user: { id: user.id, email: user.email }, 
    });
};