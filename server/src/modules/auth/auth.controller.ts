import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { };

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string, password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Post('logout')
  logout() {
    // Empty endpoint for logout
  }

  @Post('refresh')
  refresh() {
    // Empty endpoint for token refresh
  }

  //TODO:
  // - Implemnet refresh token
  // - implement logout

  /* Example on how to use guard:*/
  // This route is protected by the JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @Post('protected')
  @HttpCode(HttpStatus.OK)
  async protectedRoute(@Body() body) {
    return { message: 'You have access to this route' };
  }
}
