import { Controller, Post, UseGuards, Res, Query, Body } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommonUtils } from 'src/utils/common.utils';

@UseGuards(JwtAuthGuard)
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Post('groceries')
  findGroceries(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number,
    @Res() res,
  ) {
    return this.reportsService
      .findAll(page, limit, filter, sort, sortDirection, onlyCount)
      .then((steam) => {
        CommonUtils.sendFile(res, steam);
      })
      .catch((error) => {
        return error;
      });
  }

  @Post('ceiling')
  findCeiling(
    @Query('page') page,
    @Query('limit') limit,
    @Query('filter') filter,
    @Query('sort') sort: string,
    @Query('onlyCount') onlyCount: boolean,
    @Query('sortDirection') sortDirection: number,
    @Res() res,
  ) {
    return this.reportsService
      .findAll(page, limit, filter, sort, sortDirection, onlyCount)
      .then((steam) => {
        CommonUtils.sendFile(res, steam);
      })
      .catch((error) => {
        throw error;
      });
  }

  @Post('history-groceries')
  historyGroceries(@Body() body) {
    return this.reportsService.historyGroceries(body);
  }
}
