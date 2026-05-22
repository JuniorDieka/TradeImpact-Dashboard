import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api', {
    exclude: ['/', 'health'],
  });

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:4200',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('TradeImpact Dashboard API')
    .setDescription(
      'Multi-stakeholder sustainability trade intelligence platform API for MSMEs and policymakers. ' +
      'Inspired by ITC T4SD (Trade for Sustainable Development) and GIVC (Green & Inclusive Value Chains) programmes.',
    )
    .setVersion('1.0')
    .addTag('Authentication', 'User authentication and authorization endpoints')
    .addTag('Standards', 'Voluntary Sustainability Standards (VSS) management')
    .addTag('Country Trade', 'National trade performance and competitiveness metrics')
    .addTag('Assessments', 'MSME sustainability self-assessment and gap analysis')
    .addTag('Value Chains', 'Green value chain tracking and risk hotspot analysis')
    .addTag('Stakeholder Board', 'Multi-stakeholder collaboration and task management')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT token',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'TradeImpact Dashboard API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`\n🚀 TradeImpact Dashboard API running on: http://localhost:${port}`);
  console.log(`📚 API Documentation available at: http://localhost:${port}/api/docs\n`);
}

bootstrap();
