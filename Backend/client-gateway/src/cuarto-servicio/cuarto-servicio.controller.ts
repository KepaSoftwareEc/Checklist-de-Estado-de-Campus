import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Logger } from '@nestjs/common';

import { CreateCuartoServicioDto } from './dto/create-cuarto-servicio.dto';
import { UpdateCuartoServicioDto } from './dto/update-cuarto-servicio.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';

@Controller('cuarto-servicio')
export class CuartoServicioController {
   constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy)  {
          const logger = new Logger('CuartoServicio-Gateway');
          logger.log('inject client correcto'); 
        }

  @Post("crear")
  create(@Body() createCuartoServicioDto: CreateCuartoServicioDto) {
    return this.client.send('createCuartoServicio', createCuartoServicioDto);
  }

  @Get("obtenerCuartos")
  findAll() {
    return this.client.send('findAllCuartoServicio', {});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.client.send('findOneCuartoServicio', id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuartoServicioDto: UpdateCuartoServicioDto) {
    return ;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return ;
  }
}
