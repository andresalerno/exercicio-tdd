export enum TipoTriangulo {
  EQUILATERO = 'EQUILATERO',
  ISOSCELES = 'ISOSCELES',
  ESCALENO = 'ESCALENO',
  INVALIDO = 'INVALIDO',
}

/**
 * Esqueleto: recebe três lados inteiros e classifica o triângulo.
 */
export class Triangulo {
  constructor(
    private readonly a: number,
    private readonly b: number,
    private readonly c: number,
  ) {}

  classificar(): TipoTriangulo {
    if (!this.ehValido()) {
      return TipoTriangulo.INVALIDO;
    }
    if (this.a === this.b && this.b === this.c) {
      return TipoTriangulo.EQUILATERO;
    }
    if (this.a === this.b || this.a === this.c || this.b === this.c) {
      return TipoTriangulo.ISOSCELES;
    }
    return TipoTriangulo.ESCALENO;
  }

  private ehValido(): boolean {
    const { a, b, c } = this;
    const lados = [a, b, c];
    if (lados.some((lado) => !Number.isInteger(lado) || lado <= 0)) {
      return false;
    }
    // A soma de dois lados quaisquer deve ser maior que o terceiro.
    return a + b > c && a + c > b && b + c > a;
  }
}
