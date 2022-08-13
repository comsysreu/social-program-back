import * as mongoose from 'mongoose';

export const dbProviders = [
    {
      provide: 'DB_CONN',
      useFactory: (): Promise<typeof mongoose> =>
        mongoose.connect('mongodb+srv://reumuni2022:NAAB6mbwpaeaF1N5@cluster0.bjarm.mongodb.net/?retryWrites=true&w=majority'),
    },
  ];
