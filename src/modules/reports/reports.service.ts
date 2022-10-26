import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { GenericService } from '../generic/generic.service';
import xl = require('excel4node');
import fs = require('fs');

@Injectable()
export class ReportsService {
  constructor(private generic: GenericService) { }

  async findAll(page, limit, filter, sort, sortDirection, onlyCount: boolean) {
    const entity = 'groceries';

    let file = '';
    let path = '';

    console.log('FILTER FROM REPORTS: ', filter);

    const processData = async () => {
      // Require library

      const counts = await this.generic.findAll(
        entity,
        page,
        limit,
        filter,
        sort,
        sortDirection,
        true,
      );
      const items = await this.generic.findAll(
        entity,
        1,
        counts.count,
        filter,
        sort,
        sortDirection,
        onlyCount,
      );

      const border = {
        left: {
          style: 'thin',
        },
        right: {
          style: 'thin',
        },
        top: {
          style: 'thin',
        },
        bottom: {
          style: 'thin',
        },
      };

      const font = {
        color: '#000000',
        size: 12,
      };

      const wb = new xl.Workbook({
        // jszip: {
        //   compression: 'DEFLATE',
        // },
        // defaultFont: {
        //   size: 12,
        //   name: 'Calibri',
        //   color: 'FFFFFFFF',
        // },
        font,
        dateFormat: 'dd/mm/yyyy',
        // workbookView: {
        //   activeTab: 1, // Specifies an unsignedInt that contains the index to the active sheet in this book view.
        //   autoFilterDateGrouping: true, // Specifies a boolean value that indicates whether to group dates when presenting the user with filtering options in the user interface.
        //   firstSheet: 1, // Specifies the index to the first sheet in this book view.
        //   minimized: false, // Specifies a boolean value that indicates whether the workbook window is minimized.
        //   showHorizontalScroll: true, // Specifies a boolean value that indicates whether to display the horizontal scroll bar in the user interface.
        //   showSheetTabs: true, // Specifies a boolean value that indicates whether to display the sheet tabs in the user interface.
        //   showVerticalScroll: true, // Specifies a boolean value that indicates whether to display the vertical scroll bar.
        //   tabRatio: 600, // Specifies ratio between the workbook tabs bar and the horizontal scroll bar.
        //   visibility: 'visible', // Specifies visible state of the workbook window. ('hidden', 'veryHidden', 'visible') (§18.18.89)
        //   windowHeight: 17620, // Specifies the height of the workbook window. The unit of measurement for this value is twips.
        //   windowWidth: 28800, // Specifies the width of the workbook window. The unit of measurement for this value is twips..
        //   xWindow: 0, // Specifies the X coordinate for the upper left corner of the workbook window. The unit of measurement for this value is twips.
        //   yWindow: 440, // Specifies the Y coordinate for the upper left corner of the workbook window. The unit of measurement for this value is twips.
        // },
        // logLevel: 0, // 0 - 5. 0 suppresses all logs, 1 shows errors only, 5 is for debugging
        author: 'Programas Sociales Municipalidad Retalhuleu', // Name for use in features such as comments
      });

      // Add Worksheets to the workbook
      const ws = wb.addWorksheet('Reporte');

      try {
        const pic = ws.addImage({
          path: './src/uploads/logo_muni.jpg',
          type: 'picture',
          position: {
            type: 'twoCellAnchor',
            from: {
              col: 1,
              colOff: 0,
              row: 1,
              rowOff: 0,
            },
            to: {
              col: 3,
              colOff: 0,
              row: 5,
              rowOff: 0,
            },
          },
        });

        pic.editAs = 'twoCell';
      } catch (error) {
        console.log(error);
        throw error;
      }

      const fontTandH = {
        color: '#000000',
        size: 14,
        bold: true,
      };

      const alignment = {
        shrinkToFit: true,
        wrapText: true,
        horizontal: 'center',
      };

      // Create a reusable style
      const styleT = wb.createStyle({
        font: fontTandH,
        alignment,
      });

      // Create a reusable style
      const styleH = wb.createStyle({
        font: fontTandH,
        border,
        alignment,
      });

      // Create a reusable style
      const style = wb.createStyle({
        border,
        numberFormat: '##0; (##0); -',
        // numberFormat: '$#,##0.00; ($#,##0.00); -',
      });

      // let start position header and set items
      let ini = 5;

      try {
        // FORMAT IN EXCEL X, Y <==> X, Y;
        ws.cell(2, 1, 2, 8, true)
          .string('MUNICIPALIDAD DE RETALHULEU')
          .style(styleT);
        ws.cell(3, 1, 3, 8, true)
          .string('DIRECCIÓN MUNICIPAL DE LA MUJER')
          .style(styleT);
        ws.cell(4, 1, 4, 8, true)
          .string('PROGRAMA DE VIVERES MUNICIPAL')
          .style(styleT);

        const headers = [
          { key: 'No.', width: 7 },
          { key: 'Comunidad', width: 25 },
          { key: 'Nombres y Apellidos', width: 50 },
          { key: 'Número DPI', width: 15 },
          { key: 'Fecha de Nacimiento', width: 15 },
          { key: 'Edad', width: 10 },
          { key: 'No. de Celular', width: 15 },
          { key: 'Firma', width: 40 },
        ];

        headers.forEach((el, i) => {
          const pos = i + 1;
          ws.cell(ini, pos).string(el.key).style(styleH);
          ws.column(pos).setWidth(el.width);
        });
        ini++;
      } catch (error) {
        console.log('ERROR BUILD HEADERS: ', error);
        return error;
      }

      items.entityList.forEach((element, it) => {
        try {
          const i = it + ini;
          ws.row(i).setHeight(25);

          ws.cell(i, 1)
            .number(it + 1)
            .style(style);

          ws.cell(i, 2).string(element.community).style(style);

          ws.cell(i, 3).string(element.fullName).style(style);

          ws.cell(i, 4).formula(element.dpi).style(style);

          ws.cell(i, 5).date(element.dayOfBith).style({ border });

          ws.cell(i, 6).formula(`INT((TODAY()-E${i})/365)`).style(style);

          ws.cell(i, 7).number(Number(element.cellphone)).style(style);

          ws.cell(i, 8).string('').style(style);
        } catch (error) {
          console.log(error);
          return error;
        }
      });

      this.createDirectory();
      file = `Viveres_${new Date().getTime()}.xlsx`;
      path = `./src/uploads/reports/${file}`;
      wb.write(path);
    };

    await processData();

    return { archivo: file };
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  async historyGroceries(body) {
    console.log(body);

    const entity = 'history-groceries';

    const dbModel = await this.generic.getConnection(entity);

    const now = new Date();

    const query = [
      {
        $match: {
          date: {
            $gte: new Date(`${now.getFullYear()}-01-01T00:00:00.000Z`),
            $lt: new Date(`${now.getFullYear()}-12-31T23:59:59.000Z`),
          },
          dpi: '',
        },
      },
    ];

    for (const i of body) {
      console.log(i);
      query[0].$match.dpi = i.dpi;

      console.log('QUERY STRING: ', JSON.stringify(query));
      const response = await this.generic.findByQuery(entity, query);
      console.log(response.length);

      if (response.length >= 3) {
        throw new HttpException(
          `El ciudadano ${i.fullName} ya tiene 3 ayudas recibidas.`,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const successHistory = [];
    const errorHistory = [];

    for (const i of body) {
      const obj = { dpi: i.dpi, date: new Date() };

      await dbModel.create(obj).catch((err) => {
        errorHistory.push(i);
      });

      successHistory.push(i);
    }

    return { successHistory, errorHistory };
  }

  async historyMedicine(body) {
    console.log(body);

    const entity = 'history-medicine';

    const dbModel = await this.generic.getConnection(entity);

    const now = new Date();

    const query = [
      {
        $match: {
          date: {
            $gte: new Date(`${now.getFullYear()}-01-01T00:00:00.000Z`),
            $lt: new Date(`${now.getFullYear()}-12-31T23:59:59.000Z`),
          },
          dpi: '',
        },
      },
    ];

    console.log(body);
    query[0].$match.dpi = body.dpi;

    console.log('QUERY STRING: ', JSON.stringify(query));
    const response = await this.generic.findByQuery(entity, query);
    console.log(response.length);

    if (response.length >= 3) {
      throw new HttpException(
        `El ciudadano ${body.fullName} ya tiene 3 ayudas recibidas.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    body.date = new Date();

    return dbModel.create(body).catch((err) => {
      throw err;
    });
  }

  createDirectory(): void {
    if (!fs.existsSync('src/uploads/reports')) {
      fs.mkdirSync('src/uploads/reports');
    }
  }
}
