import { IsEmail, IsBoolean, IsString, IsNumber, Length,IsNotEmpty } from 'class-validator';

export class UpdateFormDto {

    @IsString()
    @IsNotEmpty()
    uniqueId: string;
    
    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    phonenumber: number;

    @IsBoolean()
    @IsNotEmpty()
    isGraduate: boolean;
}
