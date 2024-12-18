import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UnauthorizedException,
  Delete,
  Param
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response, Request } from 'express';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: { email: string, password: string },
    @Res() res: Response,
    @Req() req: Request,) {
    await this.authService.validateLoginFlow(body.email, body.password, req, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    try {
      // Call the logout method from the service
      this.authService.logout(res);

      // Send a response back indicating logout was successful
      return res.status(HttpStatus.OK).json({
        message: 'Logout successful, cookies cleared',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Logout failed',
      });
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('update-password')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Req() req: Request, 
  ) {
  
    const userId = req.user['userId']; // JWT payload contains the user ID
    await this.authService.updatePassword(userId, updatePasswordDto);
    return { message: 'Password updated successfully' };
  }

  // TODO: add password validation before delete, find user before deliting it
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') id: string,
    @Body() body: { password: string },
    @Req() req: Request,
    @Res() res: Response
  ) {
    await this.authService.deleteUser(id, body.password, req, res);
    return res.status(HttpStatus.OK).json({
      message: 'User deleted successfully, cookies cleared',
    });
  }

  //TODO:
  // - implement in the client-side to detect '401 unauthorised' and call te refresh endpoint
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  async refresh(@Req() req: Request, @Res() res: Response) {
    // Ensure the cookie header exists
    const refreshTokenRaw = req.headers.cookie || '';

    // Split the cookie string into an array of individual cookies
    const cookies = refreshTokenRaw.split(';').map(cookie => cookie.trim());

    // Find the refreshToken cookie
    const refreshTokenCookie = cookies.find(cookie => cookie.startsWith('refreshToken='));

    // Extract the value of the refreshToken
    const refreshToken = refreshTokenCookie?.split('=')[1];

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing');
    }

    // Delegate the token refresh logic to the service
    const { accessToken } = await this.authService.refreshToken(refreshToken, res);

    return res.json({ message: 'Access token refreshed' });
  }
}
