import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response, Request } from 'express';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { email: string; password: string },
    @Res() res: Response,
    @Req() req: Request,
  ) {
    // Check if the user already has a refresh token (i.e., already logged in)
    const refreshToken = req.cookies['refreshCode'];

    if (refreshToken) {
      console.log('Already loggedin');

      // If a refresh token exists, return a message and do nothing
      return res.json({ message: 'User already logged in' });
    }

    await this.authService.login(body.email, body.password, res);
    return res.json({ message: 'Login successful' });
  }

  // @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    // Clear both the accessToken and refreshToken cookies
    res.clearCookie('accessToken', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production' ? true : false,
    });
    res.clearCookie('refreshToken', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production' ? true : false,
    });

    return res.json({ message: 'Logout successful' });
  }

  //TODO: implement in the client-side to detect '401 unauthorised' and call te refresh endpoint
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Body('refreshToken') refreshToken: string,
    @Res() res: Response,
  ) {
    const { accessToken } = await this.authService.refreshToken(refreshToken);

    // Set the new access token as an HTTP-only cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production' ? true : false,
    });

    return res.json({ message: 'Access token refreshed' });
  }

  @UseGuards(JwtAuthGuard) // Protect the route
  @Post('update-password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Req() req: Request, // Extract user information from the JWT payload
  ) {
    const userId = req.user['userId']; // JWT payload contains the user ID
    console.log('REQ:', req.user);
    await this.authService.updatePassword(userId, updatePasswordDto);
    console.log('Extracted user ID:', userId);
    return { message: 'Password updated successfully' };
  }

  /* Example on how to use guard:*/
  // This route is protected by the JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @Post('protected')
  @HttpCode(HttpStatus.OK)
  async protectedRoute(@Body() body) {
    return { message: 'You have access to this route' };
  }
}
