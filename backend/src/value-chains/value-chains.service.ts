import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValueChain, ValueChainDocument, RiskLevel } from './schemas/value-chain.schema';
import { CreateValueChainDto } from './dto/create-value-chain.dto';
import { UpdateValueChainDto } from './dto/update-value-chain.dto';

@Injectable()
export class ValueChainsService {
  constructor(
    @InjectModel(ValueChain.name) private valueChainModel: Model<ValueChainDocument>,
  ) {}

  async create(createValueChainDto: CreateValueChainDto): Promise<ValueChain> {
    const valueChain = new this.valueChainModel(createValueChainDto);
    
    this.calculateRiskScores(valueChain);
    this.generateRecommendations(valueChain);
    valueChain.lastAssessmentDate = new Date();

    return valueChain.save();
  }

  async findAll(userId?: string): Promise<ValueChain[]> {
    const filter = userId ? { userId, isActive: true } : { isActive: true };
    return this.valueChainModel
      .find(filter)
      .populate('userId', 'firstName lastName organization')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<ValueChain> {
    const valueChain = await this.valueChainModel
      .findById(id)
      .populate('userId', 'firstName lastName organization memberState')
      .exec();

    if (!valueChain) {
      throw new NotFoundException(`Value chain with ID ${id} not found`);
    }

    return valueChain;
  }

  async update(id: string, updateValueChainDto: UpdateValueChainDto): Promise<ValueChain> {
    const valueChain = await this.valueChainModel.findById(id);

    if (!valueChain) {
      throw new NotFoundException(`Value chain with ID ${id} not found`);
    }

    Object.assign(valueChain, updateValueChainDto);
    
    this.calculateRiskScores(valueChain);
    this.generateRecommendations(valueChain);
    valueChain.lastAssessmentDate = new Date();

    return valueChain.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.valueChainModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    ).exec();

    if (!result) {
      throw new NotFoundException(`Value chain with ID ${id} not found`);
    }
  }

  async getHotspotAnalysis(id: string): Promise<any> {
    const valueChain = await this.findOne(id);

    const allHotspots = {
      environmental: new Set<string>(),
      social: new Set<string>(),
      economic: new Set<string>(),
    };

    const stageHotspots = valueChain.stages.map(stage => ({
      stage: stage.stage,
      name: stage.name,
      environmental: stage.environmentalHotspots,
      social: stage.socialHotspots,
      economic: stage.economicHotspots,
      riskLevel: stage.sustainabilityRiskLevel,
    }));

    valueChain.stages.forEach(stage => {
      stage.environmentalHotspots.forEach(h => allHotspots.environmental.add(h));
      stage.socialHotspots.forEach(h => allHotspots.social.add(h));
      stage.economicHotspots.forEach(h => allHotspots.economic.add(h));
    });

    return {
      productName: valueChain.productName,
      overallRiskScore: valueChain.overallRiskScore,
      riskSummary: valueChain.riskSummary,
      uniqueHotspots: {
        environmental: Array.from(allHotspots.environmental),
        social: Array.from(allHotspots.social),
        economic: Array.from(allHotspots.economic),
      },
      stageAnalysis: stageHotspots,
      criticalStages: valueChain.stages
        .filter(s => s.sustainabilityRiskLevel === RiskLevel.CRITICAL || s.sustainabilityRiskLevel === RiskLevel.HIGH)
        .map(s => ({ stage: s.stage, name: s.name, riskLevel: s.sustainabilityRiskLevel })),
    };
  }

  private calculateRiskScores(valueChain: ValueChain): void {
    const riskValues = { low: 1, medium: 2, high: 3, critical: 4 };
    
    let totalRisk = 0;
    const envRisks: number[] = [];
    const socRisks: number[] = [];
    const ecoRisks: number[] = [];

    valueChain.stages.forEach(stage => {
      const riskValue = riskValues[stage.sustainabilityRiskLevel];
      totalRisk += riskValue;

      if (stage.environmentalHotspots.length > 0) {
        envRisks.push(riskValue);
      }
      if (stage.socialHotspots.length > 0) {
        socRisks.push(riskValue);
      }
      if (stage.economicHotspots.length > 0) {
        ecoRisks.push(riskValue);
      }
    });

    const avgRisk = valueChain.stages.length > 0 
      ? totalRisk / valueChain.stages.length 
      : 0;
    
    valueChain.overallRiskScore = Math.round(avgRisk * 25);

    const calculateCategoryRisk = (risks: number[]): RiskLevel => {
      if (risks.length === 0) return RiskLevel.LOW;
      const avg = risks.reduce((a, b) => a + b, 0) / risks.length;
      if (avg >= 3.5) return RiskLevel.CRITICAL;
      if (avg >= 2.5) return RiskLevel.HIGH;
      if (avg >= 1.5) return RiskLevel.MEDIUM;
      return RiskLevel.LOW;
    };

    valueChain.riskSummary = {
      environmental: calculateCategoryRisk(envRisks),
      social: calculateCategoryRisk(socRisks),
      economic: calculateCategoryRisk(ecoRisks),
    };
  }

  private generateRecommendations(valueChain: ValueChain): void {
    const recommendations: any[] = [];

    valueChain.stages.forEach(stage => {
      if (stage.sustainabilityRiskLevel === RiskLevel.CRITICAL || stage.sustainabilityRiskLevel === RiskLevel.HIGH) {
        if (stage.environmentalHotspots.length > 0) {
          recommendations.push({
            stage: stage.stage,
            priority: stage.sustainabilityRiskLevel === RiskLevel.CRITICAL ? 'Critical' : 'High',
            issue: `Environmental risks in ${stage.name}: ${stage.environmentalHotspots.join(', ')}`,
            action: 'Implement environmental management system and monitoring protocols',
            estimatedCost: '$3,000 - $8,000',
            timeframe: '3-6 months',
          });
        }

        if (stage.socialHotspots.length > 0) {
          recommendations.push({
            stage: stage.stage,
            priority: stage.sustainabilityRiskLevel === RiskLevel.CRITICAL ? 'Critical' : 'High',
            issue: `Social risks in ${stage.name}: ${stage.socialHotspots.join(', ')}`,
            action: 'Develop social compliance policy and worker welfare programs',
            estimatedCost: '$2,000 - $6,000',
            timeframe: '2-4 months',
          });
        }

        if (stage.economicHotspots.length > 0) {
          recommendations.push({
            stage: stage.stage,
            priority: stage.sustainabilityRiskLevel === RiskLevel.CRITICAL ? 'Critical' : 'High',
            issue: `Economic risks in ${stage.name}: ${stage.economicHotspots.join(', ')}`,
            action: 'Establish price stabilization mechanisms and financial planning',
            estimatedCost: '$1,500 - $4,000',
            timeframe: '2-3 months',
          });
        }
      }

      if (stage.mitigationActions.length === 0 && stage.sustainabilityRiskLevel !== RiskLevel.LOW) {
        recommendations.push({
          stage: stage.stage,
          priority: 'Medium',
          issue: `No mitigation actions defined for ${stage.name}`,
          action: 'Conduct detailed risk assessment and develop action plan',
          estimatedCost: '$1,000 - $3,000',
          timeframe: '1-2 months',
        });
      }
    });

    recommendations.sort((a, b) => {
      const priorityOrder = { Critical: 1, High: 2, Medium: 3, Low: 4 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    valueChain.recommendations = recommendations.slice(0, 10);
  }
}
