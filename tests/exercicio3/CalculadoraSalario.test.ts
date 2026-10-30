import { CalculadoraSalario } from '../../src/exercicio3/CalculadoraSalario';
import { Cargo } from '../../src/exercicio3/Cargo';
import { Funcionario } from '../../src/exercicio3/Funcionario';

const criarFuncionario = (cargo: Cargo, salarioBase: number) =>
  new Funcionario('Fulano de Tal', 'fulano@empresa.com', salarioBase, cargo);

describe('Exercício 3 - CalculadoraSalario', () => {
  const calculadora = new CalculadoraSalario();

  describe('DESENVOLVEDOR (20% se >= 3.000,00; senão 10%)', () => {
    it.each([
      [5000, 4000],
      [3000, 2400], // limite: exatamente 3.000,00 -> 20%
      [2999.99, 2699.991], // logo abaixo do limite -> 10%
      [550, 495],
    ])('salário base %d -> líquido %d', (base, liquido) => {
      expect(calculadora.calcular(criarFuncionario(Cargo.DESENVOLVEDOR, base))).toBeCloseTo(liquido, 2);
    });
  });

  describe('DBA (25% se >= 2.000,00; senão 15%)', () => {
    it.each([
      [4000, 3000],
      [2000, 1500],
      [1999.99, 1699.9915],
      [500, 425],
    ])('salário base %d -> líquido %d', (base, liquido) => {
      expect(calculadora.calcular(criarFuncionario(Cargo.DBA, base))).toBeCloseTo(liquido, 2);
    });
  });

  describe('TESTADOR (25% se >= 2.000,00; senão 15%)', () => {
    it.each([
      [4000, 3000],
      [2000, 1500],
      [1999.99, 1699.9915],
      [500, 425],
    ])('salário base %d -> líquido %d', (base, liquido) => {
      expect(calculadora.calcular(criarFuncionario(Cargo.TESTADOR, base))).toBeCloseTo(liquido, 2);
    });
  });

  describe('GERENTE (30% se >= 5.000,00; senão 20%)', () => {
    it.each([
      [8000, 5600],
      [5000, 3500],
      [4999.99, 3999.992],
      [2500, 2000],
    ])('salário base %d -> líquido %d', (base, liquido) => {
      expect(calculadora.calcular(criarFuncionario(Cargo.GERENTE, base))).toBeCloseTo(liquido, 2);
    });
  });

  it('retorna 0 para salário base 0', () => {
    expect(calculadora.calcular(criarFuncionario(Cargo.DESENVOLVEDOR, 0))).toBe(0);
  });

  it('lança erro para salário base negativo', () => {
    expect(() => calculadora.calcular(criarFuncionario(Cargo.DBA, -1))).toThrow(
      'Salário base não pode ser negativo',
    );
  });
});

describe('Exercício 3 - Funcionario', () => {
  it('armazena nome, email, salário base e cargo', () => {
    const f = new Funcionario('Ana Souza', 'ana@empresa.com', 3500, Cargo.GERENTE);
    expect(f).toMatchObject({
      nome: 'Ana Souza',
      email: 'ana@empresa.com',
      salarioBase: 3500,
      cargo: Cargo.GERENTE,
    });
  });
});
