import { Controller, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Seed")
@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) { }

  @Post()
  ejecutarSeed() {
    return this.seedService.ejecutarSeed();
  }
}
