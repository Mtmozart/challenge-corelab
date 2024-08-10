import { EnvConfig } from 'src/config/app.config';
import { Task } from 'src/modules/task/entity/task.intity';
import { Address } from 'src/modules/user/entities/address.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceConfig = (): DataSourceOptions => {
  return {
    type: 'postgres',
    ...(EnvConfig.ENV.TZ === 'production'
      ? {
          url: EnvConfig.database.URL,
          synchronize: false,
          ssl: {
            rejectUnauthorized: false,
          },
        }
      : {
          host: EnvConfig.database.HOST_DB,
          port: EnvConfig.database.PORT_DB,
          username: EnvConfig.database.USER_DB,
          password: EnvConfig.database.PASSWORD_DB,
          database: EnvConfig.database.NAME_DB,
          synchronize: true,
          ssl: false,
          /*ssl: {
            rejectUnauthorized: true, 
          },*/
        }),
    entities: [User, Address, Task],
  };
};

const dataSource = new DataSource(dataSourceConfig());

export default dataSource;
