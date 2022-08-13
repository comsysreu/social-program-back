import { Module } from '@nestjs/common';
import { ViewsService } from './views.service';
import { ViewsController } from './views.controller';
import { GenericModule } from '../generic/generic.module';

@Module({
  controllers: [ViewsController],
  providers: [ViewsService],
  imports: [GenericModule],
})
export class ViewsModule {}
