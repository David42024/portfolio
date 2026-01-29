import { prisma } from "../config/db";
import { Contact } from "../../prisma/generated/client";

export const contactRepository = {
  async findAll(): Promise<Contact[]> {
    return prisma.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async findById(id: string): Promise<Contact | null> {
    return prisma.contact.findUnique({
      where: { id },
    });
  },

  async findUnread(): Promise<Contact[]> {
    return prisma.contact.findMany({
      where: {
        read: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  },

  async create(data: {
    name: string;
    email: string;
    message: string;
  }): Promise<Contact> {
    return prisma.contact.create({
      data,
    });
  },

  async markAsRead(id: string): Promise<Contact> {
    return prisma.contact.update({
      where: { id },
      data: {
        read: true,
      },
    });
  },

  async delete(id: string): Promise<Contact> {
    return prisma.contact.delete({
      where: { id },
    });
  },

  async count(): Promise<number> {
    return prisma.contact.count();
  },

  async countUnread(): Promise<number> {
    return prisma.contact.count({
      where: {
        read: false,
      },
    });
  },
};