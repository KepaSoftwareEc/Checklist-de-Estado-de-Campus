import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EdificiosService } from './edificios.service';
import { CreateEdificioDto } from './dto/create-edificio.dto';
import { UpdateEdificioDto } from './dto/update-edificio.dto';

@Controller()
export class EdificiosController {
  constructor(private readonly edificiosService: EdificiosService) {}

  @MessagePattern('createEdificio')
  create(@Payload() createEdificioDto: CreateEdificioDto) {
    return this.edificiosService.create(createEdificioDto);
  }

  @MessagePattern('findAllEdificios')
  findAll() {
    return this.edificiosService.findAll();
  }

  @MessagePattern('findOneEdificio')
  findOne(@Payload() id: string) {
    return this.edificiosService.findOne(id);
  }

  @MessagePattern('updateEdificio')
  update(@Payload() updateEdificioDto: UpdateEdificioDto) {
    return this.edificiosService.update(updateEdificioDto.id, updateEdificioDto);
  }

  @MessagePattern('removeEdificio')
  remove(@Payload() id: string) {
    return this.edificiosService.remove(id);
  }
}
