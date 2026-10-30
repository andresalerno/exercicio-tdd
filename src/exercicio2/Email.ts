export class Email {
  constructor(
    private readonly id: number,
    private readonly name: string,
  ) {}

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}
