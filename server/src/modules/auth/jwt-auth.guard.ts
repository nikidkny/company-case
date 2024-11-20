import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// By extending AuthGuard('jwt'), we are telling NestJS to use the 'jwt' strategy for route protection.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err || !user) {
      console.error('JWT Auth Error:', err || 'User not found');
      throw err || new UnauthorizedException();
    }
    return user;
  }
}