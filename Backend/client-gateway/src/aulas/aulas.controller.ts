import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger } from '@nestjs/common';

import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('aulas')
export class AulasController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy)  {
        const logger = new Logger('Aula-Gateway');
        logger.log('inject client correcto'); 
      }

  @Post("crear")
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.client.send('createAula', createAulaDto);
  }

  @Get("obtenerAulas")
  findAll() {
    return this.client.send('findAllAulas', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneAula', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAulaDto: UpdateAulaDto) {
    return ;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return ;
  }
}
