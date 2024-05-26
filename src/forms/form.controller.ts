import { Controller, Get, Post, Body,Query, BadRequestException } from '@nestjs/common';

import { FormService } from './form.service';
import { Form } from './form.entity';
import { FormDto } from './dto/create-form.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import {ResponseDto} from './dto/response.dto'
import { UpdateFormDto } from './dto/update-form-data.dto';
@Controller()
export class FormController {
  constructor(private readonly formService: FormService) {}

  // Create form
  @Post('/form')
  async create(
    @Body() formDto: FormDto,
  ): Promise<Form> {
    // Validate 
    const form = plainToClass(FormDto, formDto);
    const errors = await validate(form);
    if (errors.length > 0) {
        const errorMessages = errors.map(error => {
          return {
            property: error.property,
            constraints: error.constraints,
          };
        });
        throw new BadRequestException({
          message: 'Validation failed',
          errors: errorMessages,
        });
      }
    return this.formService.create(form);
  }


  @Post('/fill_data')
  async update(
    @Body() formDto: UpdateFormDto,
    @Query('form_title') title: string
  ): Promise<ResponseDto<Form>> {
    // Validate
    const form = plainToClass(UpdateFormDto, formDto);
    const errors = await validate(form);
    if (errors.length > 0) {
      const errorMessages = errors.map(error => ({
        property: error.property,
        constraints: error.constraints,
      }));
      throw new BadRequestException({
        message: 'Validation failed',
        errors: errorMessages,
      });
    }

    const existingForm:any = await this.formService.findByUniqueIdAndTitle(formDto.uniqueId, title);
    if (!existingForm) {
      throw new BadRequestException({
        message: 'Form not found',
        errors: [{ property: 'uniqueId', constraints: { notFound: 'Form not found for given uniqueId and title' } }],
      });
    }

    // Update the form
    const updatedForm = await this.formService.update(existingForm.uniqueId, formDto);
    return new ResponseDto(200, 'Form data updated successfully', updatedForm);
  }
  @Get('/fill_data')
  async findAll(@Query('form_title') title: string): Promise<ResponseDto<Form[]>> {
    if (!title) {
      throw new BadRequestException(new ResponseDto(400, 'Title query parameter is required'));
    }

    const forms = await this.formService.findByTitle(title);
    return new ResponseDto(200, 'form data retrieved successfully', forms);
  }
  
}