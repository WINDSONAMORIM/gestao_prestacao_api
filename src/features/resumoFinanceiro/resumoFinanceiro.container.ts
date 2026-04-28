import { FinanceiroController } from "./resumoFinanceiro.controller.js";
import { FinanceiroRepository } from "./resumoFinanceiro.repository.js";
import { FinanceiroService } from "./resumoFinanceiro.service.js";

const financeiroRepository = new FinanceiroRepository()
const financeiroService = new FinanceiroService(financeiroRepository)
const financeiroController = new FinanceiroController(financeiroService);

export {financeiroController}