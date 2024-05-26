import { Injectable,BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Form} from './form.entity';
import { FormDto } from './dto/create-form.dto';
import { UpdateFormDto } from './dto/update-form-data.dto';


@Injectable()
export class FormService {
  constructor(
    @InjectRepository(Form)
    private formRepository: Repository<Form>,
  ) {}
  
  async create(FormDto: FormDto): Promise<Form> {
    const form = this.formRepository.create(FormDto);
    return this.formRepository.save(form);
  }
  async findByUniqueId(uniqueId: any): Promise<Form | undefined> {
    return this.formRepository.findOne({ where: { uniqueId } });
  }

  async update(uniqueId: string, formDto: UpdateFormDto): Promise<Form> {
    const existingForm = await this.findByUniqueId(uniqueId);
    if (!existingForm) {
      throw new BadRequestException(`Form with uniqueId ${uniqueId} not found`);
    }
    existingForm.name = formDto.name;
    existingForm.email = formDto.email;
    existingForm.phonenumber = formDto.phonenumber;
    existingForm.isGraduate = formDto.isGraduate;
    return this.formRepository.save(existingForm);
  }

  async findByTitle(title: string): Promise<Form[]> {
    return this.formRepository.find({ where: { title } });
  }

  async findByUniqueIdAndTitle(uniqueId: any, title: string): Promise<Form | undefined> {
    return this.formRepository.findOne({ where: { uniqueId, title } });
  }



  
}