import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './comps/user/user.module';
import { AirtagModule } from './comps/airtag/airtag.module';

@Module({
  imports: [ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URL), UserModule,AirtagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
