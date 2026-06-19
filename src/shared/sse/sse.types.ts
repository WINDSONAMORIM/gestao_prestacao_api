import { FastifyReply } from "fastify";

type Client = {
    id: string;
    reply: FastifyReply;
    write: (event: string, data: any) => void;
}

export const clients = new Map<string, Client>();