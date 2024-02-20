import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AirtagService } from './airtag.service';
import { AirtagController } from './airtag.controller';
import { Airtag, AirtagSchema } from 'src/common/schema/airtag.schema';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { UserSchema, User } from 'src/common/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Airtag.name, schema: AirtagSchema }, {name: User.name, schema: UserSchema}])
  ],
  controllers: [AirtagController],
  providers: [AirtagService,UserService],
})
export class AirtagModule {}
