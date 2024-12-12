import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import e, { Response, Request } from 'express';

@Controller('auth')
export class AuthController {

  constructor(private readonly authService: AuthService) { };

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  //TODO: 
  // - check if the user is already logged in before loggin in again and issue new tokens.
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: { email: string, password: string }, @Res() res: Response, @Req() req: Request) {
    //TODO: Check if the user already

    await this.authService.login(body.email, body.password, res);
    return res.json({ message: 'Login successful' });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() res: Response) {
    // Clear both the accessToken and refreshToken cookies
    res.clearCookie('accessToken', { httpOnly: false, secure: process.env.NODE_ENV === 'production' ? true : false, });
    res.clearCookie('refreshToken', { httpOnly: false, secure: process.env.NODE_ENV === 'production' ? true : false, });
    return res.json({ message: 'Logout successful' });
  }

  //TODO:
  // - Test in postman
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
    
    console.log('refreshToken CONTROLLER',refreshToken);
    
    // Delegate the token refresh logic to the service
    const { accessToken } = await this.authService.refreshToken(refreshToken, res);

    return res.json({ message: 'Access token refreshed', accessToken });
  }

}
