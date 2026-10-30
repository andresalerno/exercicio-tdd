import { Cargo } from './Cargo';

export class Funcionario {
  constructor(
    readonly nome: string,
    readonly email: string,
    readonly salarioBase: number,
    readonly cargo: Cargo,
  ) {}
}
