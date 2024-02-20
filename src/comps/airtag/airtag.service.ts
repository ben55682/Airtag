import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AirtagCreateDto } from 'src/common/dto/airtag/airtag-create.dto';
import { AirtagIdDto } from 'src/common/dto/airtag/airtag-id.dto';
import { MsgDto } from 'src/common/dto/msg/msg.dto';
import { Airtag, AirtagDocument } from 'src/common/schema/airtag.schema';
import { UserService } from '../user/user.service';
import { LocationDto } from 'src/common/dto/airtag/location.dto';
import { PositionDto } from 'src/common/dto/airtag/position.dto';

@Injectable()
export class AirtagService {
  constructor(
    @InjectModel(Airtag.name)
    private readonly _airtagModel: Model<AirtagDocument>,
    private _userService: UserService,
  ) {}

  public getWhoAmI(airtagId: AirtagIdDto): Promise<AirtagIdDto> {
    return this._airtagModel
      .findOne({ airtagId: airtagId.airtagId })
      .exec()
      .then((airtag) => {
        return { airtagId: airtag._id };
      });
  }

  public async addAirtag(airtagCreate: AirtagCreateDto): Promise<MsgDto> {
    const airtag: AirtagDocument = await this._airtagModel.create({
      name: airtagCreate.name,
      airtagId: airtagCreate.airtagId,
    });
    return this._userService.assignAirtag(airtag._id, airtagCreate.userId);
  }

  public async updateLocation(locationUpdate: LocationDto) : Promise<void> {
    await this._airtagModel.findByIdAndUpdate(locationUpdate.airtagId, {latitude:locationUpdate.latitude, longitude:locationUpdate.longitude})
  }

  public async getAirtagLocation(airtagId: AirtagIdDto):Promise<PositionDto> {
    return this._airtagModel.findById(airtagId.airtagId).exec().then(res=>{
      return {latitude:res.latitude,longitude:res.longitude}; 
    })
  }

}
