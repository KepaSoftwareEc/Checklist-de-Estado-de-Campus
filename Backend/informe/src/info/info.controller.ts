import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InfoService } from './info.service';
import { CreateInfoDto } from './dto/create-info.dto';
import { UpdateInfoDto } from './dto/update-info.dto';

@Controller()
export class InfoController {
  constructor(private readonly infoService: InfoService) {}

  @MessagePattern('createInfo')
  create(@Payload() createInfoDto: CreateInfoDto) {
    return this.infoService.create(createInfoDto);
  }

  @MessagePattern('findAllInfo')
  findAll() {
    return this.infoService.findAll();
  }

  @MessagePattern('findOneInfo')
  findOne(@Payload() id: string) {
    return this.infoService.findOne(id);
  }

  @MessagePattern('updateInfo')
  update(@Payload() updateInfoDto: UpdateInfoDto) {
    return this.infoService.update(updateInfoDto.id, updateInfoDto);
  }

  @MessagePattern('removeInfo')
  remove(@Payload() id: string) {
    return this.infoService.remove(id);
  }
}
