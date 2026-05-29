import {Request, Response} from "express"
import {AppError} from "../utils/AppError"
import {z} from "zod"
import {prisma} from "../database/prisma"


interface AuthRequest extends Request {
  user?: {
    id: string
    role: string
  }
}


const CategoriesEnum = z.enum(["food", "others", "services", "transport", "accommodation"])

class RefundsController {
    async create(request: AuthRequest, response: Response) {
        const bodySchema = z.object({
            name: z.string().trim().min(1, {message: "Informe o nome da solicitação"}),
            category: CategoriesEnum,
            amount: z.number().positive({message: "O valor deve ser maior que zero"}),
            filename: z.string().min(20),
        })

        const { name, category, amount, filename } = bodySchema.parse(request.body)

        if(!request.user?.id){
            throw new AppError("Unauthorized", 401)
        }

        const refund = await prisma.refunds.create({
            data: {
                name,
                category,
                amount,
                filename,
                userId: request.user.id
            }
        })

        response.status(201).json(refund)
    }

    async index (request: Request, response: Response) {
        const querySchema = z.object({
            name: z.string().optional().default(""),
            page: z.coerce.number().min(1).default(1),
            perPage: z.coerce.number().min(1).default(10)
        })

        const {name, page, perPage} = querySchema.parse(request.query)

        // Calcular os valores de 'skip'
        const skip = (page - 1) * perPage

        const refunds = await prisma.refunds.findMany({
            skip,
            take: perPage,
            where: {
                user: {
                    name: {
                        contains: name.trim(),
                    }
                }
            },
            orderBy: {createdAt: "desc"},
            include: {user: true},
        })

        // Obter o total de registros para calcular o número de páginas
        const totalRecords = await prisma.refunds.count({
            where: {
                user: {
                    name: {
                        contains: name.trim(),
                    }
                }
            }
        })

        const totalPages = Math.ceil(totalRecords / perPage)


        response.json({refunds, pagination : {
            page, perPage, totalRecords, totalPages: totalPages > 0 ? totalPages: 1,
        }})
    }

    async show(request: Request, response: Response) {
        const paramsSchema = z.object({
            id: z.string().uuid()
        })

        const {id} = paramsSchema.parse(request.params)

        const refund = await prisma.refunds.findFirst({
            where: {id},
            include: {user: true}
        })

        if(!refund) {
            throw new AppError("Solicitação nao encontrada", 404)
        }

        response.json(refund)
    }
}

export {RefundsController}