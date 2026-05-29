import { MyFluxRepository } from "./myFlux.repository.js";
import { ParammsLogin, ParamsGetTitle } from "./myFlux.schema.js";

export class MyfluxService {
  constructor(private repository: MyFluxRepository) {}
  async login(params: ParammsLogin) {
    const result = await this.repository.login(params);
    console.log("Service: " + result);
    return result;
  }

  async getTitle(processo: ParamsGetTitle, token: string) {
    const result = await this.repository.getTitle(processo, token);
    console.log("Service: ", +result);
    return result;
  }

  async downloaderProcess(processo: number, token: string){
    const result = await this.repository.downloaderProcess(processo, token);
    console.log(`service empacotar ${JSON.stringify(result, null, 2)}`)
    return result;
  }
}