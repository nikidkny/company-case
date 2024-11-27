import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  NotFoundException,
  ConflictException,
} from "@nestjs/common";
import { UserEnsembleService } from "./user-ensemble.service";
import { Response, Request } from "express";

@Controller('userEnsemble') 
export class UserEnsembleController {
  constructor(private readonly userEnsembleService: UserEnsembleService) {}

  //TODO: implement guard
  @Post()
  @HttpCode(HttpStatus.OK)
  async addUserToEnsemble(
    @Body() body: { userId: string; ensembleId: string },
    @Res() res: Response,
    @Req() req: Request
  ) {
    const { userId, ensembleId } = body;

    // Check if both userId and ensembleId are provided
    if (!userId || !ensembleId) {
      console.log("Bad request: Missing userId or ensembleId");
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'userId and ensembleId are required' });
    }

    try {
      const userFound = await this.userEnsembleService.checkUser(userId);

      if (!userFound) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'User not found' });
      }

      const ensembleFound = await this.userEnsembleService.checkEnsemble(ensembleId);

      if (!ensembleFound) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Ensemble not found' });
      }

      // Example: Checking if a user-ensemble relationship already exists
      const foundRelation = await this.userEnsembleService.checkUserEnsemble(userId, ensembleId);

      if (foundRelation) {
        console.log("Conflict: User is already a member of this ensemble");
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: 'User is already a member of this ensemble' });
      }

      // Proceed to add the user to the ensemble
      await this.userEnsembleService.addUserToEnsemble(userId, ensembleId);

      console.log("Success: User added to ensemble");
      return res
        .status(HttpStatus.OK)
        .json({ message: 'User successfully added to ensemble' });

    } catch (error) {
      console.error("Error in addUserToEnsemble:", error);

      // Handle specific errors
      if (error instanceof NotFoundException) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: error.message });
      }

      if (error instanceof ConflictException) {
        return res
          .status(HttpStatus.CONFLICT)
          .json({ message: error.message });
      }

      // Handle unexpected errors
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'An error occurred while adding the user to the ensemble' });
    }
  }
}
