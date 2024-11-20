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
  async login(@Body() body: { email: string, password: string }, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login(body.email, body.password);

    // Set the access token and refresh token as HTTP-only cookies
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production'});
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production'});

    return res.json({ message: 'Login successful' });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    // Clear both the accessToken and refreshToken cookies
    res.clearCookie('accessToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    res.clearCookie('refreshToken', { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return res.json({ message: 'Logout successful' });
  }

  //TODO: implement in the client-side to detect '401 unauthorised' and call te refresh endpoint
 
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body('refreshToken') refreshToken: string, @Res() res: Response) {
    const { accessToken } = await this.authService.refreshToken(refreshToken);

    // Set the new access token as an HTTP-only cookie
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

    return res.json({ message: 'Access token refreshed' });
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
