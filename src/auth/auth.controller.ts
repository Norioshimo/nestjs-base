import { Body, Controller, Get, HttpCode, HttpStatus, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto'; 
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Authenticación")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('login')
  @HttpCode(HttpStatus.OK)
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.LoginUserDto(loginUserDto);
  }
}
