import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConnectionModule } from './modules/connection/connection.module';
import { GenericModule } from './modules/generic/generic.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { UsersModule } from './modules/users/users.module';
import { ViewsModule } from './modules/views/views.module';

@Module({
  imports: [
    ConnectionModule,
    AuthModule,
    ProfilesModule,
    UsersModule,
    ViewsModule,
    GenericModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
