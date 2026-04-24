import { FinanceiroController } from "./financeiro.controller.js";
import { FinanceiroRepository } from "./financeiro.repository.js";
import { FinanceiroService } from "./financeiro.service.js";

const financeiroRepository = new FinanceiroRepository()
const financeiroService = new FinanceiroService(financeiroRepository)
const financeiroController = new FinanceiroController(financeiroService);

export {financeiroController}