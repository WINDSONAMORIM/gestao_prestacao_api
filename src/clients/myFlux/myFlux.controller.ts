import { ParammsLogin, ParamsGetTitle } from "./myFlux.schema.js";
import { MyfluxService } from "./myFlux.service.js";

export class MyfluxController {
  constructor(private service: MyfluxService) {}

  async login(params: ParammsLogin) {
    const result = await this.service.login(params);
    console.log("Controller: " + result);
    return result;
  }

  async getTitle(processo: ParamsGetTitle, token: string) {
    const result = await this.service.getTitle(processo, token);
    console.log("Controller: " + result);
    return result;
  }

   async downloaderProcess(processo: number, token: string) {
    const result = await this.service.downloaderProcess(processo, token);
    console.log(`controller empacotar ${JSON.stringify(result, null, 2)}`)
    return result;
  }
}