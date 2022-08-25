import { PartialType } from '@nestjs/swagger';
import { CreateHousingMaterialDto } from './create-housing-material.dto';

export class UpdateHousingMaterialDto extends PartialType(CreateHousingMaterialDto) {}
