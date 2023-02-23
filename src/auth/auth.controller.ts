import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() request: SignupRequestDto) {
    console.log(request);
    return this.authService.signup(request);
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
