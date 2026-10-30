import { Email } from '../../src/exercicio2/Email';
import { Person } from '../../src/exercicio2/Person';
import {
  ERRO_IDADE,
  ERRO_NOME,
  ERRO_SEM_EMAIL,
  PersonDAO,
  erroEmailInvalido,
} from '../../src/exercicio2/PersonDAO';

const criarPessoa = (
  name = 'Maria Silva',
  age = 30,
  emails: string[] = ['maria@email.com'],
): Person => {
  const p = new Person(1, name, age);
  emails.forEach((e, i) => p.addEmail(new Email(i + 1, e)));
  return p;
};

describe('Exercício 2 - PersonDAO.isValidToInclude', () => {
  let dao: PersonDAO;

  beforeEach(() => {
    dao = new PersonDAO();
  });

  it('retorna lista vazia para uma pessoa válida', () => {
    expect(dao.isValidToInclude(criarPessoa())).toEqual([]);
  });

  describe('nome', () => {
    it.each([
      'Maria Silva',
      'José da Silva',
      'João Pedro Álvares Cabral',
      '  Ana   Souza  ',
    ])('aceita "%s"', (nome) => {
      expect(dao.isValidToInclude(criarPessoa(nome))).not.toContain(ERRO_NOME);
    });

    it.each([
      ['apenas uma parte', 'Maria'],
      ['vazio', ''],
      ['somente espaços', '   '],
      ['contém números', 'Maria Silva2'],
      ['contém símbolos', 'Maria S1lv@'],
      ['parte com hífen/pontuação', 'Maria Silva.'],
    ])('rejeita nome %s ("%s")', (_desc, nome) => {
      expect(dao.isValidToInclude(criarPessoa(nome))).toContain(ERRO_NOME);
    });
  });

  describe('idade', () => {
    it.each([1, 2, 100, 199, 200])('aceita idade %i (dentro de [1, 200])', (idade) => {
      expect(dao.isValidToInclude(criarPessoa(undefined, idade))).not.toContain(ERRO_IDADE);
    });

    it.each([0, -1, 201, 1000, 30.5])('rejeita idade %d', (idade) => {
      expect(dao.isValidToInclude(criarPessoa(undefined, idade))).toContain(ERRO_IDADE);
    });
  });

  describe('emails', () => {
    it('rejeita pessoa sem email associado', () => {
      expect(dao.isValidToInclude(criarPessoa(undefined, undefined, []))).toContain(
        ERRO_SEM_EMAIL,
      );
    });

    it('aceita pessoa com vários emails válidos', () => {
      const p = criarPessoa(undefined, undefined, ['a@b.c', 'maria.silva@fatec.sp.gov.br']);
      expect(dao.isValidToInclude(p)).toEqual([]);
    });

    it.each([
      'a@b.c',
      'maria@email.com',
      'maria.silva@fatec.sp.gov.br',
    ])('aceita email "%s"', (email) => {
      expect(dao.isValidToInclude(criarPessoa(undefined, undefined, [email]))).toEqual([]);
    });

    it.each([
      ['sem @', 'mariaemail.com'],
      ['sem usuário', '@email.com'],
      ['sem domínio', 'maria@.com'],
      ['sem extensão', 'maria@email.'],
      ['sem ponto no domínio', 'maria@email'],
      ['dois @', 'maria@@email.com'],
      ['com espaço', 'maria silva@email.com'],
      ['vazio', ''],
    ])('rejeita email %s ("%s")', (_desc, email) => {
      expect(dao.isValidToInclude(criarPessoa(undefined, undefined, [email]))).toEqual([
        erroEmailInvalido(email),
      ]);
    });

    it('aponta apenas os emails inválidos quando há mistura', () => {
      const p = criarPessoa(undefined, undefined, ['ok@email.com', 'invalido']);
      expect(dao.isValidToInclude(p)).toEqual([erroEmailInvalido('invalido')]);
    });
  });

  it('acumula todos os erros quando tudo é inválido', () => {
    const p = criarPessoa('Maria', 0, []);
    expect(dao.isValidToInclude(p)).toEqual([ERRO_NOME, ERRO_IDADE, ERRO_SEM_EMAIL]);
  });
});

describe('Exercício 2 - PersonDAO.save', () => {
  it('salva uma pessoa válida', () => {
    const dao = new PersonDAO();
    const p = criarPessoa();
    dao.save(p);
    expect(dao.findAll()).toEqual([p]);
  });

  it('lança erro com as mensagens de validação ao salvar pessoa inválida', () => {
    const dao = new PersonDAO();
    expect(() => dao.save(criarPessoa('Maria'))).toThrow(ERRO_NOME);
    expect(dao.findAll()).toEqual([]);
  });
});
