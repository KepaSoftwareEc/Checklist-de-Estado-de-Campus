import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger } from '@nestjs/common';

import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';

@Controller('info')
export class InfoController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy)  {
        const logger = new Logger('Info-Gateway');
        logger.log('inject client correcto'); 
      }
  @Post("crear")
  create(@Body() createInfoDto: CreateInfoDto) {
    return this.client.send('createInfo', createInfoDto);
  }

  @Get("obtenerInformes")
  findAll() {
    return this.client.send('findAllInfo', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneInfo', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInfoDto: UpdateInfoDto) {
    return this.client.send('updateInfo', id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.client.send('removeInfo', id);
  }
}
