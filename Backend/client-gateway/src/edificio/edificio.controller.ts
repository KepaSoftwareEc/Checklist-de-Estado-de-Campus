import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger } from '@nestjs/common';
import { EdificioService } from './edificio.service';
import { CreateEdificioDto } from './dto/create-edificio.dto';
import { UpdateEdificioDto } from './dto/update-edificio.dto';
import { NATS_SERVICE } from 'src/config';
import { ClientProxy } from '@nestjs/microservices';

@Controller('edificio')
export class EdificioController {

  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy)  {
      const logger = new Logger('Edificio-Gateway');
      logger.log('inject client correcto'); 
    }
  @Post('crear')
  create(@Body() createEdificioDto: CreateEdificioDto) {
    return this.client.send('createEdificio', createEdificioDto);
  }

  @Get("obtenerEdificios")
  findAll() {
    return this.client.send('findAllEdificios', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneEdificio', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEdificioDto: UpdateEdificioDto) {
    return ;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return ;
  }
}
