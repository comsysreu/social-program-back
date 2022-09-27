import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ConnectionModule } from './modules/connection/connection.module';
import { GenericModule } from './modules/generic/generic.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { UsersModule } from './modules/users/users.module';
import { ViewsModule } from './modules/views/views.module';
import { MedicineModule } from './modules/medicine/medicine.module';
import { GroceriesModule } from './modules/groceries/groceries.module';
import { CeilingModule } from './modules/ceiling/ceiling.module';
import { CommunityModule } from './modules/community/community.module';
import { ReligionModule } from './modules/religion/religion.module';
import { MaritalStatusModule } from './modules/marital-status/marital-status.module';
import { HousingMaterialModule } from './modules/housing-material/housing-material.module';
import { AcademicDegreeModule } from './modules/academic-degree/academic-degree.module';
import { ReportsModule } from './modules/reports/reports.module';
import { FilesModule } from './modules/files/files.module';

@Module({
  imports: [
    ConnectionModule,
    AuthModule,
    ProfilesModule,
    UsersModule,
    ViewsModule,
    GenericModule,
    MedicineModule,
    GroceriesModule,
    CeilingModule,
    CommunityModule,
    ReligionModule,
    MaritalStatusModule,
    HousingMaterialModule,
    AcademicDegreeModule,
    ReportsModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
