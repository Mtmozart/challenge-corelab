import { Address } from '../../entities/address.entity';

export class DefaultAddressDto {
  id?: string;
  cep: string;
  state: string;
  country: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement?: string;

  constructor(address: Address) {
    this.id = address.id;
    this.cep = address.cep;
    this.state = address.state;
    this.country = address.country;
    this.neighborhood = address.neighborhood;
    this.city = address.city;
    this.street = address.street;
    this.number = address.number;
    this.complement = address.complement;
  }
}
