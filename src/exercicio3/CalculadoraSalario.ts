import { Cargo } from './Cargo';
import { Funcionario } from './Funcionario';

interface RegraDesconto {
  limite: number;
  descontoAcimaOuIgual: number;
  descontoAbaixo: number;
}

const REGRAS: Record<Cargo, RegraDesconto> = {
  [Cargo.DESENVOLVEDOR]: { limite: 3000, descontoAcimaOuIgual: 0.2, descontoAbaixo: 0.1 },
  [Cargo.DBA]: { limite: 2000, descontoAcimaOuIgual: 0.25, descontoAbaixo: 0.15 },
  [Cargo.TESTADOR]: { limite: 2000, descontoAcimaOuIgual: 0.25, descontoAbaixo: 0.15 },
  [Cargo.GERENTE]: { limite: 5000, descontoAcimaOuIgual: 0.3, descontoAbaixo: 0.2 },
};

export class CalculadoraSalario {
  calcular(funcionario: Funcionario): number {
    const { salarioBase, cargo } = funcionario;
    if (salarioBase < 0) {
      throw new Error('Salário base não pode ser negativo');
    }

    const regra = REGRAS[cargo];
    const desconto =
      salarioBase >= regra.limite ? regra.descontoAcimaOuIgual : regra.descontoAbaixo;
    return salarioBase * (1 - desconto);
  }
}
