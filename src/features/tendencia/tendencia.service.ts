import { ParamsGrupo, ParamsSubGrupo } from "../../schemas/paramsShema.js";
import { AppError } from "../../utils/appError.js";
import { TendeciaRepository } from "./tendencia.repository.js";

export class TendenciaService {
    constructor(private repository: TendeciaRepository){}

async getTendenciaMensalPorGrupo(params: ParamsGrupo) {
    const result = await this.repository.getTendenciaMensalPorGrupo(params);
        if (!result || result.length === 0) {
        throw new AppError("Nenhuma tendência mensal encontrada por grupo");
        }
        return result;
    }

async getTendenciaMensalPorSubgrupo(params: ParamsSubGrupo) {
    const result = await this.repository.getTendenciaMensalPorSubGrupo(params);
        if(!result || result.length === 0 ){
            throw new AppError("Nenhuma tendência mensal encontrada por Subgrupo")
        }
        return result
    } 
}