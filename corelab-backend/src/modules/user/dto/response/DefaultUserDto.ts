import { User } from '../../entities/user.entity';
import { DefaultAddressDto } from './defaultAddressResponseDTO';

export class DefaultUserClientDto {
  id: string;
  name: string;
  email: string;
  username: string;
  address: DefaultAddressDto;

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.username = user.username;
    this.address = new DefaultAddressDto(user.address);
  }
}
