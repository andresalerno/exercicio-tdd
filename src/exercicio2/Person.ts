import { Email } from './Email';

export class Person {
  private readonly emails: Email[] = [];

  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly age: number,
  ) {}

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getEmails(): Email[] {
    return [...this.emails];
  }

  addEmail(email: Email): void {
    this.emails.push(email);
  }
}
