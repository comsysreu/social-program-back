import { Module } from '@nestjs/common';
import { dbProviders } from './connection';

@Module({
    providers: [...dbProviders],
    exports: [...dbProviders],
})
export class ConnectionModule { }
