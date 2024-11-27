import { Body, Controller, Get, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UserEnsembleService } from "./user-ensemble.service";

@Controller('userEnsemble') 
export class UserEnsembleController {
  constructor(private readonly userEnsembleService: UserEnsembleService) {}

  @Get('test')
  @HttpCode(HttpStatus.OK)
  async testEndpoint() {
    // Call the service's test method
    return this.userEnsembleService.testEndpoint();
  }

  @Post('add-user')
  async addUserToEnsemble(@Body() body: { userId: string; ensembleId: string }): Promise<void> {
    const { userId, ensembleId } = body;
    await this.userEnsembleService.addUserToEnsemble(userId, ensembleId);
  }
}
