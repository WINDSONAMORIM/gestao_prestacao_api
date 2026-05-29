import { ParammsLogin, ParamsGetTitle } from "./myFlux.schema.js";

interface LoginResponse {
  token: string;
}

interface TitleResposnse{
  titulo: string;
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

  async getTitle(processId: ParamsGetTitle, token: string): Promise<TitleResposnse> {
    console.log(processId.id)
    try {      
      const response = await fetch(`${this.baseUrl}/processos/${processId.id}`, {
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

      const data : TitleResposnse = await response.json();

      if (!data) {
        throw new Error('Title not found'); 
      }
      
      console.log(`Process: ${processId.id} Data: ${data.titulo}`);
      const fullTitle = data.titulo;
      const partes = fullTitle.split("_");
      const titulo = `${partes[0]}_${partes[1]}`;
      return { titulo };

    } catch (error) {
      console.error("Erro em getTitle:", error);
      throw error;
    }
  }

  async downloaderProcess(data: number, token: string): Promise<any>{
    try {
      const response = await fetch(`${this.baseUrl}/processos/${data}/empacotar`,{
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
      console.log(`repository empacotar paramsn ${data}`)
      console.log(`repository empacotar response${JSON.stringify(response, null, 2)}`)
      
      const result = await response.json()
      
      return result
      } catch (error) {
      console.error("Erro em downloaderProcess:", error);
      throw error;      
    }
  }
}  
