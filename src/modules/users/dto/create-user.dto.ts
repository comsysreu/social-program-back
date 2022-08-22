import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { CommonDto } from "src/modules/models/common.dto";

export class CreateUserDto extends CommonDto {

    @ApiProperty()
    @IsNotEmpty()
    name: String;

    @ApiProperty()
    @IsNotEmpty()
    lastname: String;

    @ApiProperty()
    @IsNotEmpty()
    username: String;

    @ApiProperty()
    @IsNotEmpty()
    profileId: String;
    
    changePass: Number;
    failedAttempts: Number;
    login: String;
    lastLogin: Date;

    @Exclude()
    password: String;

}
