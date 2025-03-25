import { Request, Response, NextFunction } from "express";
import { AppError } from "../middlewares/errorHandler";
import Category from "../models/category";

interface AuthenticatedRequest extends Request {
  user?: { id: number; email: string; iat: number; exp: number };
}

export const getAllCategories = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        if(!req.user) {
            throw new AppError("Unauthorized", 401);
        }

        const userId = req.user.id;

        const allCategories = await Category.findAll({ where: { userId }});

        res.status(200).json(allCategories);
    } catch (error) {
        
    }
}

export const createCategory = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

    try {

        if(!req.user) {
            throw new AppError("Unaouthorized", 401);
        }
        const userId = req.user.id;
        const { name } = req.body;

        const newCategory = await Category.create({
            userId,
            name
        });

        res.status(201).json({ message: "Category created successfully.", newCategory });
    } catch (error) {
        next(error);
    }
};

// export const deleteCategory = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
//     try {
//         if(!req.user) {
//             throw new AppError("Unauthorized", 401);
//         }

//         const userId = req.user.id;
//         const { id } = req.params;

//         const category = await Category.findByPk(id);

//         if(userId != category?.userId) {
//             throw new AppError("Unauthorized.", 401);
//         }

//         if(!category) {
//             throw new AppError("No category with this id exists.", 404);
//         }
//         category.destroy();
//         res.status(200).json({ message: "Category deleted successfully." });
//     } catch (error) {
        
//     }
// }
