export interface IAddress {
  id?: string;
  cep: string;
  state: string;
  country: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;
}
