import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// By extending AuthGuard('jwt'), we are telling NestJS to use the 'jwt' strategy for route protection.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info) {
    console.log('JWT Auth Guard:', { err, user, info }); // Log the error, user, and info
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}