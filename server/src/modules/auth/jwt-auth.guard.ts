import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// By extending AuthGuard('jwt'), we are telling NestJS to use the 'jwt' strategy for route protection.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    if (err) {
      console.error('JWT Auth Error:', err);
    }
    if (!user) {
      console.error('JWT Auth Error: User not found');
    }
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}