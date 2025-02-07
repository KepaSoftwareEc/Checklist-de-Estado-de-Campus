import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AulasService } from './aulas.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';

@Controller()
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}

  @MessagePattern('createAula')
  create(@Payload() createAulaDto: CreateAulaDto) {
    return this.aulasService.create(createAulaDto);
  }

  @MessagePattern('findAllAulas')
  findAll() {
    return this.aulasService.findAll();
  }

  @MessagePattern('findOneAula')
  findOne(@Payload() id: string) {
    return this.aulasService.findOne(id);
  }

  
  @MessagePattern('updateAula')
  update(@Payload() updateAulaDto: UpdateAulaDto) {
    return this.aulasService.update(updateAulaDto.id, updateAulaDto);
  }

  @MessagePattern('removeAula')
  remove(@Payload() id: string) {
    return this.aulasService.remove(id);
  }
}
