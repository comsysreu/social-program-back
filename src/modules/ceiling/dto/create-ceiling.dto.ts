import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { CommonDto } from 'src/modules/models/common.dto';
import { EMPTY, MAX_LENGTH, MIN_LENGTH } from 'src/utils/msg';

// import { MinLength, MaxLength, IsNotEmpty } from 'class-validator-multi-lang';

export class CreateCeilingDto extends CommonDto {

    @IsNotEmpty()
    @MinLength(13, { message: MIN_LENGTH })
    @MaxLength(13, { message: MAX_LENGTH })
    @ApiProperty()
    dpi: string;

    // @IsNotEmpty({ message: EMPTY })
    @ApiProperty()
    test: string;

}
