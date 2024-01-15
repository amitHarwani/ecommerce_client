export class GeneratePayPalOrderResponseClass {
  constructor(
    public id: string,
    public links: Array<{
      href: string;
      method: string;
      rel: string;
    }>,
    public status: string
  ) {}
}
