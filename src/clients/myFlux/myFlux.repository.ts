import { ParammsLogin, ParamsGetTitle } from "./myFlux.schema.js";

interface LoginResponse {
  token: string;
}

export class MyFluxRepository {
  private baseUrl: string;
  
  constructor() {
    const baseUrl = process.env.BASE_URL_MYFLUX;

    if (!baseUrl) {
      throw new Error("BASE_URL environment variable is not set");
    }

    this.baseUrl = baseUrl;
  }

  async login(credentials: ParammsLogin): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar login");
      }

      const token = await response.text();

      console.log("repository: " + token);

      return { token };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getTitle(processId: ParamsGetTitle, token: string): Promise<any> {
    console.log(processId.title)
    try {      
      const response = await fetch(`${this.baseUrl}/processos/${processId.title}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar processo: ${response}`);
      }

      const data = await response.json();

      if (data && data.titulo) {
        console.log(`Process: ${processId} Data: ${data.titulo}`);
        const fullTitle = data.titulo;
        const partes = fullTitle.split("_");
        const tituloCurto = `${partes[0]}_${partes[1]}`;
        return tituloCurto;
      }
    } catch (error) {
      console.error("Erro em getTitle:", error);
      throw error;
    }
  }
}
