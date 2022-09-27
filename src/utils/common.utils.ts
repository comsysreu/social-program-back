import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../modules/auth/constants';
import { HttpStatus } from '@nestjs/common';

export class CommonUtils {

    public static jwtS = new JwtService({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '24h' },
    });

    public static getValuesTok(token: string, key?: string): string {
        const removeBearer = token.replace('Bearer ', '');
        const data = this.jwtS.decode(removeBearer);
        const headers = Object.keys(data);

        if (headers.find(el => el === key)) {
            return data[key];
        } else {
            throw new HttpException(`El token no posee el parametro " ${key} " solicitado.`, HttpStatus.BAD_REQUEST);
        }
    }

    public static conn = 'mongodb+srv://reumuni2022:NAAB6mbwpaeaF1N5@cluster0.bjarm.mongodb.net/?retryWrites=true&w=majority';

    public static sendFile(res, steam) {

        const routeFile = `./${steam.archivo}`;
        const fs = require('fs');

        if (!fs.existsSync(`src/uploads/reports/${routeFile}`)) {
            setTimeout(() => {
                this.sendFile(res, steam);
                console.log('No existe el archivo...');
            }, 1000);
        } else {
            console.log('Archivo encontrado...', routeFile);
            res.sendFile(routeFile, { root: './src/uploads/reports/' });
        }
    }

}