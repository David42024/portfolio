import { prisma } from "../config/db.js";

export abstract class BaseRepository<T> {
  protected prisma = prisma;

  abstract findAll(): Promise<T[]>;
  abstract findById(id: string): Promise<T | null>;
}




