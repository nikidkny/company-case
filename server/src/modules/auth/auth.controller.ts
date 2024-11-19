import { Body, Controller, HttpCode, HttpStatus, Post, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Response } from 'express';

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
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    // Clear both the accessToken and refreshToken from cookies
    res.clearCookie('accessToken', { httpOnly: true, secure: true });  // Optional: secure flag for HTTPS cookies
    res.clearCookie('refreshToken', { httpOnly: true, secure: true });

    return { message: 'Logout successful' };
  }

  //TODO: implement in the client-side to detect '401 unauthorised' and call te refresh endpoint
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }

  //TODO:
  // - Improve the login logic to send cookies
  // - Test logout logic both postman and e2e

  /* Example on how to use guard:*/
  // This route is protected by the JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @Post('protected')
  @HttpCode(HttpStatus.OK)
  async protectedRoute(@Body() body) {
    return { message: 'You have access to this route' };
  }
}
