import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwtPayload.interface";
import { ConfigService } from "@nestjs/config";

// It handles the extraction and validation of JWT tokens from incoming requests.
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            // Extract JWT from Authorization header
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('JWT_SECRET')
        })

    }

    //Validate JWT payload and return user details
    async validate(payload: JwtPayload ) {
        return {userId: payload.sub, email: payload.email}
    }
}