import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AirtagService } from './airtag.service';
import { AirtagIdDto } from 'src/common/dto/airtag/airtag-id.dto';
import { AirtagCreateDto } from 'src/common/dto/airtag/airtag-create.dto';
import { MsgDto } from 'src/common/dto/msg/msg.dto';
import { LocationDto } from 'src/common/dto/airtag/location.dto';
import { PositionDto } from 'src/common/dto/airtag/position.dto';

@Controller('airtag')
export class AirtagController {
  constructor(private _airtag: AirtagService) {}

  @Post('whoAmI')
  public whoAmI(@Body() airtagId: AirtagIdDto): Promise<AirtagIdDto> {
    return this._airtag.getWhoAmI(airtagId);
  }

  @Post('add')
  public addAirtag(@Body() airtagCreate: AirtagCreateDto): Promise<MsgDto> {
    return this._airtag.addAirtag(airtagCreate);
  }

  @Patch('update/location')
  public updateLocation(@Body() locationUpdate: LocationDto): Promise<void> {
    return this._airtag.updateLocation(locationUpdate);
  }

  @Get('location/:airtagId')
  public getLocation(@Param('airtagId') airtagId: number): Promise<PositionDto> {
    return this._airtag.getAirtagLocation(airtagId);
  }
}
