import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

// It handles the extraction and validation of JWT tokens from incoming requests.
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: (req) => {
        if (req && req.cookies && req.cookies['accessToken']) {
          console.log('Access Token found in cookies:', req.cookies['accessToken']);
          return req.cookies['accessToken'];
        }
        console.log('No Access Token found in cookies');
        return null; // Return null if no accessToken is found in cookies
      },
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    console.log('Token Payload:', payload);
    return { userId: payload.sub, email: payload.email };
  }
}