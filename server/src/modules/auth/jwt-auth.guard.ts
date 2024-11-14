import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// By extending AuthGuard('jwt'), we are telling NestJS to use the 'jwt' strategy for route protection.
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}