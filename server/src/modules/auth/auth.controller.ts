import { Controller, Post } from "@nestjs/common";

@Controller('auth')
export class AuthController {
  @Post('signup')
  signup() {
    // Empty endpoint for signup
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