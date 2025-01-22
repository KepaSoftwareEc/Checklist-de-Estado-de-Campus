import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CuartoServicioService } from './cuarto-servicio.service';
import { CreateCuartoServicioDto } from './dto/create-cuarto-servicio.dto';
import { UpdateCuartoServicioDto } from './dto/update-cuarto-servicio.dto';

@Controller()
export class CuartoServicioController {
  constructor(private readonly cuartoServicioService: CuartoServicioService) {}

  @MessagePattern('createCuartoServicio')
  create(@Payload() createCuartoServicioDto: CreateCuartoServicioDto) {
    return this.cuartoServicioService.create(createCuartoServicioDto);
  }

  @MessagePattern('findAllCuartoServicio')
  findAll() {
    return this.cuartoServicioService.findAll();
  }

  @MessagePattern('findOneCuartoServicio')
  findOne(@Payload() id: string) {
    return this.cuartoServicioService.findOne(id);
  }

  @MessagePattern('updateCuartoServicio')
  update(@Payload() updateCuartoServicioDto: UpdateCuartoServicioDto) {
    return this.cuartoServicioService.update(updateCuartoServicioDto.id, updateCuartoServicioDto);
  }

  @MessagePattern('quitarCuartoServicio')
  remove(@Payload() id: string) {
    return this.cuartoServicioService.remove(id);
  }
}
