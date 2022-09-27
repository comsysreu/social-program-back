import { Connection } from 'mongoose';

export const filesProvider = [
  {
    provide: 'DB_CONN',
    useFactory: (connection: Connection) => connection,
    inject: ['DbConnectionToken'],
  },
];
