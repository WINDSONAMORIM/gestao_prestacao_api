type Client = {
    id: string;
    reply: any;
}

export const clients = new Map<string, Client>();