import * as mongoose from 'mongoose';
import { CommonUtils } from 'src/utils/common.utils';

export const dbProviders = [
  {
    provide: 'DB_CONN',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(CommonUtils.conn),
  },
];
