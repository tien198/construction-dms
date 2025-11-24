import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Redirect,
  HttpStatus,
} from '@nestjs/common';
import { CatService } from './cat.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import type { Response } from 'express';

@Controller('cat/:id1')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @Redirect('https://chatgpt.com/')
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catService.findAll();
  }

  @Get(':id2')
  findOne(
    @Res({ passthrough: true }) res: Response,
    @Param('id1') id: string,
    @Param('id2') id2: string,
  ) {
    res.status(HttpStatus.OK);
    console.log(this.catService.findOne(+id));

    return `${id} - ${id2}`;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catService.remove(+id);
  }
}
