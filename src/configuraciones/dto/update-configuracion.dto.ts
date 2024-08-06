import { PartialType } from '@nestjs/swagger';
import { CreateConfiguracioneDto } from './create-configuracion.dto';

export class UpdateConfiguracioneDto extends PartialType(CreateConfiguracioneDto) {}
