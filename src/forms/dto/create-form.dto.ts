import {  IsString, Length,IsNotEmpty } from 'class-validator';

export class FormDto {
    @IsString()
    @Length(1, 255)
    @IsNotEmpty()
    title: string;
}
