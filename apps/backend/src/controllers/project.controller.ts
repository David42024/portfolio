import { Request, Response, NextFunction } from "express";
import { projectRepository } from "../repositories/project.repository";
import { AppError } from "../utils/AppError";
import { success } from "zod";
import { count } from "console";

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projects = await projectRepository.findAll();
        res.json(
            {   
                success: true,
                data: projects,
                count: projects.length
            }
        );
    } catch (error) {
        next(
            new AppError(
                'Error fetching projects',
                500
            )
        );
    }
}