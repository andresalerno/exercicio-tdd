import { Triangulo, TipoTriangulo } from '../../src/exercicio1/Triangulo';

const classificar = (a: number, b: number, c: number) =>
  new Triangulo(a, b, c).classificar();

describe('Exercício 1 - Triângulo', () => {
  describe('triângulos válidos', () => {
    it('CT01 - escaleno válido (3, 4, 5)', () => {
      expect(classificar(3, 4, 5)).toBe(TipoTriangulo.ESCALENO);
    });

    it('CT02 - isósceles válido (3, 3, 4)', () => {
      expect(classificar(3, 3, 4)).toBe(TipoTriangulo.ISOSCELES);
    });

    it('CT03 - equilátero válido (3, 3, 3)', () => {
      expect(classificar(3, 3, 3)).toBe(TipoTriangulo.EQUILATERO);
    });
  });

  describe('isósceles válido - permutações dos mesmos valores', () => {
    it.each([
      ['CT04', 5, 5, 8],
      ['CT05', 5, 8, 5],
      ['CT06', 8, 5, 5],
    ])('%s - isósceles (%i, %i, %i)', (_ct, a, b, c) => {
      expect(classificar(a, b, c)).toBe(TipoTriangulo.ISOSCELES);
    });
  });

  describe('valores zero e negativos', () => {
    it('CT07 - um valor zero (0, 4, 5)', () => {
      expect(classificar(0, 4, 5)).toBe(TipoTriangulo.INVALIDO);
    });

    it('CT08 - um valor negativo (-3, 4, 5)', () => {
      expect(classificar(-3, 4, 5)).toBe(TipoTriangulo.INVALIDO);
    });

    it('CT09 - três valores iguais a zero (0, 0, 0)', () => {
      expect(classificar(0, 0, 0)).toBe(TipoTriangulo.INVALIDO);
    });
  });

  describe('soma de 2 lados igual ao terceiro - todas as permutações', () => {
    it.each([
      ['CT10', 1, 2, 3],
      ['CT11', 1, 3, 2],
      ['CT12', 2, 1, 3],
      ['CT13', 2, 3, 1],
      ['CT14', 3, 1, 2],
      ['CT15', 3, 2, 1],
    ])('%s - (%i, %i, %i) é inválido', (_ct, a, b, c) => {
      expect(classificar(a, b, c)).toBe(TipoTriangulo.INVALIDO);
    });
  });

  describe('soma de 2 lados menor que o terceiro - todas as permutações', () => {
    it.each([
      ['CT16', 1, 2, 5],
      ['CT17', 1, 5, 2],
      ['CT18', 2, 1, 5],
      ['CT19', 2, 5, 1],
      ['CT20', 5, 1, 2],
      ['CT21', 5, 2, 1],
    ])('%s - (%i, %i, %i) é inválido', (_ct, a, b, c) => {
      expect(classificar(a, b, c)).toBe(TipoTriangulo.INVALIDO);
    });
  });

  describe('valores não inteiros', () => {
    it('CT22 - lado com valor decimal (3.5, 4, 5)', () => {
      expect(classificar(3.5, 4, 5)).toBe(TipoTriangulo.INVALIDO);
    });
  });
});
