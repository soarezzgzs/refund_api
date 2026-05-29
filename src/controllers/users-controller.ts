import {Request, Response} from "express"
import {z} from "zod"
import {prisma} from "../database/prisma"
import {AppError} from "../utils/AppError"
import {hash} from "bcrypt"

class UsersController {
    async create(request: Request, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(2, {message: "Nome é obrigatório"}),
            email: z.string().trim().email({message: "E-mail inválido"}).toLowerCase(),
            password: z.string().trim().min(6, {message: "A senha deve ter pelo menos 6 dígitos"}),
            role: z.enum(["employee", "manager"]).default("employee"),
        })

        const { name, email, password, role } = bodySchema.parse(request.body)

        const userWithSameEmail = await prisma.user.findFirst({ where: {email} })

        if(userWithSameEmail) {
            throw new AppError("E-mail ja cadastrado")
        }

        const hasedPassword = await hash(password, 8)

        await prisma.user.create({
            data: {
                name,
                email,
                password: hasedPassword,
                role
            }
        })

        response.status(201).json()  
    }
}

export {UsersController}