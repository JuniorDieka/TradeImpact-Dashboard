import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { UsersService } from '../src/users/users.service';
import { StandardsService } from '../src/standards/standards.service';
import { CountryTradeService } from '../src/country-trade/country-trade.service';
import { HotspotCategory } from '../src/standards/schemas/standard.schema';
import { UserRole } from '../src/users/schemas/user.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const usersService = app.get(UsersService);
  const standardsService = app.get(StandardsService);
  const countryTradeService = app.get(CountryTradeService);

  console.log('🌱 Starting database seeding...\n');

  try {
    console.log('👥 Creating users...');
    const adminUser = await usersService.create({
      firstName: 'Sarah',
      lastName: 'Ochieng',
      email: 'sarah.ochieng@tradeimpact.org',
      password: 'Admin@2024',
      role: UserRole.ADMIN,
      organization: 'TradeImpact Dashboard',
      memberState: 'Kenya',
      sector: 'Trade Policy',
    });
    console.log(`   ✓ Admin user created: ${adminUser.email}`);

    const policyAnalyst = await usersService.create({
      firstName: 'Jean-Paul',
      lastName: 'Mukasa',
      email: 'jp.mukasa@gov.rw',
      password: 'Policy@2024',
      role: UserRole.POLICY_ANALYST,
      organization: 'Rwanda Ministry of Trade',
      memberState: 'Rwanda',
      sector: 'Trade Analysis',
    });
    console.log(`   ✓ Policy analyst created: ${policyAnalyst.email}`);

    const msmeUser = await usersService.create({
      firstName: 'Amina',
      lastName: 'Hassan',
      email: 'amina.hassan@kiganicoffee.rw',
      password: 'Coffee@2024',
      role: UserRole.MSME_USER,
      organization: 'Kigali Coffee Cooperative',
      memberState: 'Rwanda',
      sector: 'Coffee',
    });
    console.log(`   ✓ MSME user created: ${msmeUser.email}\n`);

    console.log('📋 Creating sustainability standards...');
    const fairtrade = await standardsService.create({
      name: 'Fairtrade International',
      acronym: 'FLO',
      description: 'Promotes fair prices, decent working conditions, and sustainable production for farmers and workers in developing countries',
      sector: 'Coffee',
      applicableCountries: ['Rwanda', 'Kenya', 'Ethiopia', 'Uganda', 'Tanzania'],
      hotspotCategories: [HotspotCategory.SOCIAL, HotspotCategory.ECONOMIC, HotspotCategory.ENVIRONMENTAL],
      certificationBody: 'Fairtrade International',
      website: 'https://www.fairtrade.net',
      isVoluntary: true,
      requiresThirdPartyVerification: true,
      criteria: {
        environmental: ['Pesticide reduction', 'Biodiversity protection', 'Water management', 'Waste reduction'],
        social: ['Fair wages', 'Safe working conditions', 'No child labor', 'Freedom of association', 'Non-discrimination'],
        economic: ['Fair pricing', 'Long-term contracts', 'Access to credit', 'Premium payments'],
      },
      memberStates: ['Rwanda', 'Kenya', 'Ethiopia'],
      adoptionRate: 68,
    });
    console.log(`   ✓ Standard created: ${fairtrade.name}`);

    const rainforest = await standardsService.create({
      name: 'Rainforest Alliance',
      acronym: 'RA',
      description: 'Works to conserve biodiversity and ensure sustainable livelihoods by transforming land-use practices, business practices, and consumer behavior',
      sector: 'Coffee',
      applicableCountries: ['Rwanda', 'Kenya', 'Uganda', 'Tanzania', 'Burundi'],
      hotspotCategories: [HotspotCategory.ENVIRONMENTAL, HotspotCategory.SOCIAL],
      certificationBody: 'Rainforest Alliance',
      website: 'https://www.rainforest-alliance.org',
      isVoluntary: true,
      requiresThirdPartyVerification: true,
      criteria: {
        environmental: ['Forest conservation', 'Climate resilience', 'Water conservation', 'Biodiversity protection', 'Agrochemical management'],
        social: ['Workers rights', 'Community relations', 'Living wages', 'Health and safety'],
        economic: ['Sustainable livelihoods', 'Farm management', 'Traceability'],
      },
      memberStates: ['Rwanda', 'Kenya'],
      adoptionRate: 72,
    });
    console.log(`   ✓ Standard created: ${rainforest.name}`);

    const organic = await standardsService.create({
      name: 'USDA Organic',
      acronym: 'USDA-ORG',
      description: 'Sets standards for organic agricultural production and handling to ensure products are produced without synthetic fertilizers or pesticides',
      sector: 'Coffee',
      applicableCountries: ['Rwanda', 'Kenya', 'Ethiopia', 'Uganda'],
      hotspotCategories: [HotspotCategory.ENVIRONMENTAL, HotspotCategory.QUALITY],
      certificationBody: 'USDA National Organic Program',
      website: 'https://www.usda.gov/organic',
      isVoluntary: true,
      requiresThirdPartyVerification: true,
      criteria: {
        environmental: ['No synthetic pesticides', 'No GMOs', 'Soil health', 'Biodiversity enhancement'],
        quality: ['Product purity', 'Traceability', 'Documentation', 'Handling practices'],
      },
      memberStates: ['Rwanda', 'Ethiopia'],
      adoptionRate: 45,
    });
    console.log(`   ✓ Standard created: ${organic.name}`);

    const utz = await standardsService.create({
      name: 'UTZ Certified',
      acronym: 'UTZ',
      description: 'Program for sustainable farming of coffee, tea, and cocoa with focus on professional farm management and better working conditions',
      sector: 'Coffee',
      applicableCountries: ['Rwanda', 'Kenya', 'Tanzania', 'Uganda'],
      hotspotCategories: [HotspotCategory.SOCIAL, HotspotCategory.ECONOMIC, HotspotCategory.ENVIRONMENTAL],
      certificationBody: 'Rainforest Alliance (merged)',
      website: 'https://utz.org',
      isVoluntary: true,
      requiresThirdPartyVerification: true,
      criteria: {
        environmental: ['Responsible pesticide use', 'Waste management', 'Water use efficiency'],
        social: ['No child labor', 'Fair treatment', 'Training and education'],
        economic: ['Good agricultural practices', 'Record keeping', 'Traceability'],
        quality: ['Quality management', 'Harvesting practices'],
      },
      memberStates: ['Rwanda', 'Kenya'],
      adoptionRate: 55,
    });
    console.log(`   ✓ Standard created: ${utz.name}\n`);

    console.log('📊 Creating trade data...');
    const rwandaTrade2024Q1 = await countryTradeService.create({
      memberState: 'Rwanda',
      year: 2024,
      quarter: 1,
      totalExports: 485000000,
      totalImports: 720000000,
      tradeBalance: -235000000,
      tradeCompetitivenessIndex: 67.5,
      topExportSectors: [
        { sector: 'Coffee', value: 195000000, percentageOfTotal: 40.2 },
        { sector: 'Tea', value: 97000000, percentageOfTotal: 20.0 },
        { sector: 'Minerals', value: 121000000, percentageOfTotal: 24.9 },
        { sector: 'Horticulture', value: 48500000, percentageOfTotal: 10.0 },
      ],
      topImportSectors: [
        { sector: 'Machinery', value: 216000000, percentageOfTotal: 30.0 },
        { sector: 'Petroleum', value: 180000000, percentageOfTotal: 25.0 },
        { sector: 'Chemicals', value: 144000000, percentageOfTotal: 20.0 },
        { sector: 'Food Products', value: 108000000, percentageOfTotal: 15.0 },
      ],
      topExportDestinations: ['UAE', 'DR Congo', 'USA', 'Switzerland', 'Pakistan'],
      topImportOrigins: ['China', 'UAE', 'India', 'Kenya', 'Tanzania'],
      gdpPercentage: 13.5,
      recoveryIndicator: 87,
      sustainabilityScore: 72,
      keyMetrics: {
        exportGrowthRate: 8.7,
        importGrowthRate: 6.3,
        tradeDiversificationIndex: 0.68,
        valueAddedExportsPercentage: 38,
      },
    });
    console.log(`   ✓ Trade data created: ${rwandaTrade2024Q1.memberState} Q${rwandaTrade2024Q1.quarter} ${rwandaTrade2024Q1.year}`);

    const kenyaTrade2024Q1 = await countryTradeService.create({
      memberState: 'Kenya',
      year: 2024,
      quarter: 1,
      totalExports: 1850000000,
      totalImports: 4200000000,
      tradeBalance: -2350000000,
      tradeCompetitivenessIndex: 71.2,
      topExportSectors: [
        { sector: 'Tea', value: 555000000, percentageOfTotal: 30.0 },
        { sector: 'Horticulture', value: 462500000, percentageOfTotal: 25.0 },
        { sector: 'Coffee', value: 277500000, percentageOfTotal: 15.0 },
        { sector: 'Textiles', value: 185000000, percentageOfTotal: 10.0 },
      ],
      topImportSectors: [
        { sector: 'Machinery', value: 1050000000, percentageOfTotal: 25.0 },
        { sector: 'Petroleum', value: 1260000000, percentageOfTotal: 30.0 },
        { sector: 'Vehicles', value: 630000000, percentageOfTotal: 15.0 },
        { sector: 'Chemicals', value: 504000000, percentageOfTotal: 12.0 },
      ],
      topExportDestinations: ['Uganda', 'USA', 'Netherlands', 'Pakistan', 'UK'],
      topImportOrigins: ['China', 'India', 'UAE', 'Japan', 'Saudi Arabia'],
      gdpPercentage: 18.2,
      recoveryIndicator: 92,
      sustainabilityScore: 68,
      keyMetrics: {
        exportGrowthRate: 11.2,
        importGrowthRate: 8.9,
        tradeDiversificationIndex: 0.74,
        valueAddedExportsPercentage: 42,
      },
    });
    console.log(`   ✓ Trade data created: ${kenyaTrade2024Q1.memberState} Q${kenyaTrade2024Q1.quarter} ${kenyaTrade2024Q1.year}`);

    const ethiopiaTrade2024Q1 = await countryTradeService.create({
      memberState: 'Ethiopia',
      year: 2024,
      quarter: 1,
      totalExports: 1125000000,
      totalImports: 2800000000,
      tradeBalance: -1675000000,
      tradeCompetitivenessIndex: 64.8,
      topExportSectors: [
        { sector: 'Coffee', value: 450000000, percentageOfTotal: 40.0 },
        { sector: 'Oilseeds', value: 225000000, percentageOfTotal: 20.0 },
        { sector: 'Flowers', value: 168750000, percentageOfTotal: 15.0 },
        { sector: 'Leather Products', value: 112500000, percentageOfTotal: 10.0 },
      ],
      topImportSectors: [
        { sector: 'Machinery', value: 700000000, percentageOfTotal: 25.0 },
        { sector: 'Petroleum', value: 840000000, percentageOfTotal: 30.0 },
        { sector: 'Vehicles', value: 420000000, percentageOfTotal: 15.0 },
        { sector: 'Chemicals', value: 336000000, percentageOfTotal: 12.0 },
      ],
      topExportDestinations: ['USA', 'Germany', 'Saudi Arabia', 'Netherlands', 'China'],
      topImportOrigins: ['China', 'India', 'UAE', 'Kuwait', 'Turkey'],
      gdpPercentage: 11.8,
      recoveryIndicator: 78,
      sustainabilityScore: 65,
      keyMetrics: {
        exportGrowthRate: 7.3,
        importGrowthRate: 5.8,
        tradeDiversificationIndex: 0.61,
        valueAddedExportsPercentage: 32,
      },
    });
    console.log(`   ✓ Trade data created: ${ethiopiaTrade2024Q1.memberState} Q${ethiopiaTrade2024Q1.quarter} ${ethiopiaTrade2024Q1.year}\n`);

    console.log('✅ Database seeding completed successfully!\n');
    console.log('📌 Test credentials:');
    console.log('   Admin: sarah.ochieng@tradeimpact.org / Admin@2024');
    console.log('   Policy Analyst: jp.mukasa@gov.rw / Policy@2024');
    console.log('   MSME User: amina.hassan@kiganicoffee.rw / Coffee@2024\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await app.close();
  }
}

bootstrap();
