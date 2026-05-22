import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StandardsModule } from './standards/standards.module';
import { CountryTradeModule } from './country-trade/country-trade.module';
import { AssessmentsModule } from './assessments/assessments.module';
import { ValueChainsModule } from './value-chains/value-chains.module';
import { StakeholdersModule } from './stakeholders/stakeholders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        retryAttempts: 3,
        retryDelay: 1000,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    StandardsModule,
    CountryTradeModule,
    AssessmentsModule,
    ValueChainsModule,
    StakeholdersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
