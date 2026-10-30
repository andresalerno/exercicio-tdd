import { Email } from '../../src/exercicio2/Email';
import { Person } from '../../src/exercicio2/Person';

describe('Exercício 2 - Person e Email', () => {
  it('Email expõe id e name', () => {
    const email = new Email(7, 'maria@email.com');
    expect(email.getId()).toBe(7);
    expect(email.getName()).toBe('maria@email.com');
  });

  it('Person expõe id, name, age e emails associados', () => {
    const p = new Person(1, 'Maria Silva', 30);
    const email = new Email(1, 'maria@email.com');
    p.addEmail(email);

    expect(p.getId()).toBe(1);
    expect(p.getName()).toBe('Maria Silva');
    expect(p.getAge()).toBe(30);
    expect(p.getEmails()).toEqual([email]);
  });

  it('getEmails retorna uma cópia (não expõe a lista interna)', () => {
    const p = new Person(1, 'Maria Silva', 30);
    p.getEmails().push(new Email(1, 'x@y.z'));
    expect(p.getEmails()).toEqual([]);
  });
});
