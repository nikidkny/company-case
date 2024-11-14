import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) {};

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  login() {
    // Empty endpoint for login
  }

  @Post('logout')
  logout() {
    // Empty endpoint for logout
  }

  @Post('refresh')
  refresh() {
    // Empty endpoint for token refresh
  }
}