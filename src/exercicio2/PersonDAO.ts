import { Person } from './Person';

export const ERRO_NOME = 'O nome deve ser composto por ao menos 2 partes e conter apenas letras';
export const ERRO_IDADE = 'A idade deve estar no intervalo [1, 200]';
export const ERRO_SEM_EMAIL = 'A pessoa deve ter pelo menos um email associado';
export const erroEmailInvalido = (email: string) =>
  `Email inválido: "${email}" (formato esperado: ____@____.____)`;

const IDADE_MINIMA = 1;
const IDADE_MAXIMA = 200;
// Cada parte do nome: apenas letras (inclui acentuadas).
const PARTE_NOME = /^\p{L}+$/u;
// usuario@dominio.extensao — cada parte com ao menos um caractere, sem espaços.
const FORMATO_EMAIL = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

export class PersonDAO {
  private readonly pessoas: Person[] = [];

  save(p: Person): void {
    const erros = this.isValidToInclude(p);
    if (erros.length > 0) {
      throw new Error(erros.join('; '));
    }
    this.pessoas.push(p);
  }

  findAll(): Person[] {
    return [...this.pessoas];
  }

  isValidToInclude(p: Person): string[] {
    const erros: string[] = [];

    if (!this.nomeValido(p.getName())) {
      erros.push(ERRO_NOME);
    }
    if (!this.idadeValida(p.getAge())) {
      erros.push(ERRO_IDADE);
    }

    const emails = p.getEmails();
    if (emails.length === 0) {
      erros.push(ERRO_SEM_EMAIL);
    }
    emails
      .filter((email) => !FORMATO_EMAIL.test(email.getName()))
      .forEach((email) => erros.push(erroEmailInvalido(email.getName())));

    return erros;
  }

  private nomeValido(nome: string): boolean {
    const partes = nome.trim().split(/\s+/).filter((parte) => parte.length > 0);
    return partes.length >= 2 && partes.every((parte) => PARTE_NOME.test(parte));
  }

  private idadeValida(idade: number): boolean {
    return Number.isInteger(idade) && idade >= IDADE_MINIMA && idade <= IDADE_MAXIMA;
  }
}
