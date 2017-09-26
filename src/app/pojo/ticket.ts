export class Ticket {
  constructor(
    public email: string,
    public dni: string,
    public name: string,
    public immortal: boolean,
    public reserved: boolean
  ) {}
}
