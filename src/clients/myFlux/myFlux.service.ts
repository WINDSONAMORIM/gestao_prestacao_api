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
}