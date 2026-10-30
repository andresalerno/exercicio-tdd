# Qualidade e Testes de Software — Exercícios com TDD

Implementação dos três exercícios de [exercicio.md](exercicio.md) em **TypeScript** com **Jest**, seguindo a técnica de **TDD (Test Driven Development)**.

## Tecnologias

| Ferramenta | Versão |
|---|---|
| Node.js | 18 ou superior (desenvolvido com 25.x) |
| TypeScript | 5.9 |
| Jest | 30 |
| ts-jest | 29 |

## Estrutura do projeto

```
.
├── src/
│   ├── exercicio1/
│   │   └── Triangulo.ts              # classe Triangulo + enum TipoTriangulo
│   ├── exercicio2/
│   │   ├── Email.ts
│   │   ├── Person.ts
│   │   └── PersonDAO.ts              # save() e isValidToInclude()
│   └── exercicio3/
│       ├── Cargo.ts                  # enum de cargos
│       ├── Funcionario.ts
│       └── CalculadoraSalario.ts
├── tests/
│   ├── exercicio1/Triangulo.test.ts
│   ├── exercicio2/PersonDAO.test.ts
│   ├── exercicio2/Person.test.ts
│   └── exercicio3/CalculadoraSalario.test.ts
├── jest.config.js
├── tsconfig.json
└── package.json
```

## Como executar

### 1. Instalar as dependências

```bash
npm install
```

### 2. Build (compilação TypeScript)

```bash
npm run build
```

Os arquivos JavaScript são gerados em `dist/`.

### 3. Execução dos testes

| Comando | O que faz |
|---|---|
| `npm test` | Executa todos os testes |
| `npm run test:coverage` | Executa todos os testes e gera o relatório de cobertura |
| `npm run test:ex1` | Testes + cobertura somente do Exercício 1 |
| `npm run test:ex2` | Testes + cobertura somente do Exercício 2 |
| `npm run test:ex3` | Testes + cobertura somente do Exercício 3 |
| `npm run test:watch` | Modo *watch* (reexecuta a cada alteração — útil no ciclo TDD) |
| `npx jest --verbose` | Lista o nome de cada caso de teste executado |

O relatório de cobertura é exibido no terminal e também gerado em HTML em `coverage/lcov-report/index.html` (abra no navegador).

## Ciclo TDD utilizado

Para cada exercício foi seguido o ciclo **Red → Green → Refactor**:

1. **Red**: criação do esqueleto das classes (métodos lançando `Error('Não implementado')`) e escrita dos casos de teste, que falham.
2. **Green**: implementação mínima para fazer todos os testes passarem.
3. **Refactor**: melhoria do código (ex.: constantes para mensagens de erro, tabela de regras no Exercício 3) mantendo os testes verdes.

---

## Exercício 1 — Triângulo

**Classe:** [src/exercicio1/Triangulo.ts](src/exercicio1/Triangulo.ts) — `new Triangulo(a, b, c).classificar()` retorna `EQUILATERO`, `ISOSCELES`, `ESCALENO` ou `INVALIDO`.

Um triângulo é inválido quando algum lado é zero, negativo ou não inteiro, ou quando a soma de dois lados não é maior que o terceiro.

### Casos de teste ([tests/exercicio1/Triangulo.test.ts](tests/exercicio1/Triangulo.test.ts))

| CT | Situação | Entrada (a, b, c) | Esperado |
|---|---|---|---|
| CT01 | Escaleno válido | (3, 4, 5) | ESCALENO |
| CT02 | Isósceles válido | (3, 3, 4) | ISOSCELES |
| CT03 | Equilátero válido | (3, 3, 3) | EQUILATERO |
| CT04 | Isósceles — permutação 1 | (5, 5, 8) | ISOSCELES |
| CT05 | Isósceles — permutação 2 | (5, 8, 5) | ISOSCELES |
| CT06 | Isósceles — permutação 3 | (8, 5, 5) | ISOSCELES |
| CT07 | Um valor zero | (0, 4, 5) | INVALIDO |
| CT08 | Um valor negativo | (-3, 4, 5) | INVALIDO |
| CT09 | Três valores iguais a zero | (0, 0, 0) | INVALIDO |
| CT10–CT15 | Soma de 2 lados **igual** ao terceiro (6 permutações) | (1,2,3), (1,3,2), (2,1,3), (2,3,1), (3,1,2), (3,2,1) | INVALIDO |
| CT16–CT21 | Soma de 2 lados **menor** que o terceiro (6 permutações) | (1,2,5), (1,5,2), (2,1,5), (2,5,1), (5,1,2), (5,2,1) | INVALIDO |
| CT22 | Valor não inteiro (extra) | (3.5, 4, 5) | INVALIDO |

### Evidência de cobertura

```
$ npm run test:ex1

--------------|---------|----------|---------|---------|-------------------
File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------|---------|----------|---------|---------|-------------------
All files     |     100 |      100 |     100 |     100 |
 Triangulo.ts |     100 |      100 |     100 |     100 |
--------------|---------|----------|---------|---------|-------------------
Tests:       22 passed, 22 total
```

---

## Exercício 2 — Person / Email / PersonDAO

**Classes:** [Person.ts](src/exercicio2/Person.ts), [Email.ts](src/exercicio2/Email.ts) e [PersonDAO.ts](src/exercicio2/PersonDAO.ts), conforme o diagrama de classes (`Person 1 —— 1..* Email`).

`PersonDAO.isValidToInclude(p)` retorna uma **lista de erros** (vazia quando a pessoa é válida). Regras:

| Regra | Mensagem de erro |
|---|---|
| Nome com ao menos 2 partes, somente letras (acentos permitidos) | `O nome deve ser composto por ao menos 2 partes e conter apenas letras` |
| Idade inteira no intervalo [1, 200] | `A idade deve estar no intervalo [1, 200]` |
| Pelo menos um `Email` associado | `A pessoa deve ter pelo menos um email associado` |
| Cada email no formato `____@____.____` (cada parte com ≥ 1 caractere) | `Email inválido: "<email>" (formato esperado: ____@____.____)` |

`PersonDAO.save(p)` só armazena a pessoa se `isValidToInclude` não retornar erros; caso contrário lança um `Error` com as mensagens. O método `findAll()` foi adicionado para permitir verificar o que foi salvo.

### Casos de teste ([tests/exercicio2/](tests/exercicio2/))

- **Pessoa válida** → lista vazia.
- **Nome**: aceita `Maria Silva`, `José da Silva`, `João Pedro Álvares Cabral`, nome com espaços extras; rejeita nome com 1 parte, vazio, só espaços, com números, com símbolos e com pontuação.
- **Idade** (análise de valor-limite): aceita 1, 2, 100, 199, 200; rejeita 0, -1, 201, 1000 e 30.5.
- **Email**: rejeita pessoa sem email; aceita `a@b.c`, `maria@email.com`, `maria.silva@fatec.sp.gov.br`; rejeita sem `@`, sem usuário, sem domínio, sem extensão, sem ponto no domínio, com dois `@`, com espaço e vazio; com vários emails, aponta apenas os inválidos.
- **Acúmulo de erros**: pessoa totalmente inválida retorna todas as mensagens.
- **save()**: salva pessoa válida; lança erro e não salva pessoa inválida.
- **Person/Email**: getters e proteção da lista interna de emails.

### Evidência de cobertura

```
$ npm run test:ex2

--------------|---------|----------|---------|---------|-------------------
File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
--------------|---------|----------|---------|---------|-------------------
All files     |     100 |      100 |     100 |     100 |
 Email.ts     |     100 |      100 |     100 |     100 |
 Person.ts    |     100 |      100 |     100 |     100 |
 PersonDAO.ts |     100 |      100 |     100 |     100 |
--------------|---------|----------|---------|---------|-------------------
Tests:       41 passed, 41 total
```

---

## Exercício 3 — Calculadora de salário

**Classes:** [Funcionario.ts](src/exercicio3/Funcionario.ts) (nome, email, salário-base e cargo), [Cargo.ts](src/exercicio3/Cargo.ts) e [CalculadoraSalario.ts](src/exercicio3/CalculadoraSalario.ts).

`new CalculadoraSalario().calcular(funcionario)` retorna o salário líquido:

| Cargo | Limite | Desconto se salário ≥ limite | Desconto se salário < limite |
|---|---|---|---|
| DESENVOLVEDOR | 3.000,00 | 20% | 10% |
| DBA | 2.000,00 | 25% | 15% |
| TESTADOR | 2.000,00 | 25% | 15% |
| GERENTE | 5.000,00 | 30% | 20% |

As regras ficam em uma tabela (`REGRAS`), então um novo cargo exige apenas uma nova linha. Salário base negativo lança erro.

### Casos de teste ([tests/exercicio3/CalculadoraSalario.test.ts](tests/exercicio3/CalculadoraSalario.test.ts))

Para cada cargo, aplicando **análise de valor-limite**: um valor bem acima do limite, **exatamente no limite**, **logo abaixo do limite** (limite − 0,01) e um valor bem abaixo.

| Cargo | Base → Líquido |
|---|---|
| DESENVOLVEDOR | 5000 → 4000 · 3000 → 2400 · 2999,99 → 2699,99 · 550 → 495 |
| DBA | 4000 → 3000 · 2000 → 1500 · 1999,99 → 1699,99 · 500 → 425 |
| TESTADOR | 4000 → 3000 · 2000 → 1500 · 1999,99 → 1699,99 · 500 → 425 |
| GERENTE | 8000 → 5600 · 5000 → 3500 · 4999,99 → 3999,99 · 2500 → 2000 |

Extras: salário base 0 → 0; salário negativo → erro; `Funcionario` armazena seus atributos.

### Evidência de cobertura

```
$ npm run test:ex3

-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------------|---------|----------|---------|---------|-------------------
All files              |     100 |      100 |     100 |     100 |
 CalculadoraSalario.ts |     100 |      100 |     100 |     100 |
 Cargo.ts              |     100 |      100 |     100 |     100 |
 Funcionario.ts        |     100 |      100 |     100 |     100 |
-----------------------|---------|----------|---------|---------|-------------------
Tests:       19 passed, 19 total
```

---

## Cobertura geral

```
$ npm run test:coverage

------------------------|---------|----------|---------|---------|-------------------
File                    | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------|---------|----------|---------|---------|-------------------
All files               |     100 |      100 |     100 |     100 |
 exercicio1             |     100 |      100 |     100 |     100 |
  Triangulo.ts          |     100 |      100 |     100 |     100 |
 exercicio2             |     100 |      100 |     100 |     100 |
  Email.ts              |     100 |      100 |     100 |     100 |
  Person.ts             |     100 |      100 |     100 |     100 |
  PersonDAO.ts          |     100 |      100 |     100 |     100 |
 exercicio3             |     100 |      100 |     100 |     100 |
  CalculadoraSalario.ts |     100 |      100 |     100 |     100 |
  Cargo.ts              |     100 |      100 |     100 |     100 |
  Funcionario.ts        |     100 |      100 |     100 |     100 |
------------------------|---------|----------|---------|---------|-------------------

Test Suites: 4 passed, 4 total
Tests:       82 passed, 82 total
```
