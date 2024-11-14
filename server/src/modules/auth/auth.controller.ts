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
  async login(@Body() body: {email: string, password: string}) {
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
  // - Review auth logic
  // - Test login
  // - Implemnet refresh token
  // - implement logout
  /* Example on how to use guard:
 @UseGuards(JwtAuthGuard)  // Protect routes with the guard
  @Post('protected')
  async protectedRoute(@Body() body) {
    return { message: 'You have access to this route' };
  }
  */
}