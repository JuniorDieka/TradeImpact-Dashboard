import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Assessment, AssessmentDocument, AssessmentStatus } from './schemas/assessment.schema';
import { CreateAssessmentDto } from './dto/create-assessment.dto';
import { AssessmentResponseDto } from './dto/assessment-response.dto';
import { RoadmapDto } from './dto/roadmap.dto';

@Injectable()
export class AssessmentsService {
  constructor(
    @InjectModel(Assessment.name) private assessmentModel: Model<AssessmentDocument>,
  ) {}

  async create(createAssessmentDto: CreateAssessmentDto): Promise<Assessment> {
    const assessment = new this.assessmentModel(createAssessmentDto);
    
    if (createAssessmentDto.responses) {
      this.calculateScores(assessment);
      this.generateGaps(assessment);
      this.generateRoadmap(assessment);
      assessment.status = AssessmentStatus.COMPLETED;
      assessment.completedAt = new Date();
    }

    return assessment.save();
  }

  async findAll(userId?: string): Promise<Assessment[]> {
    const filter = userId ? { userId } : {};
    return this.assessmentModel
      .find(filter)
      .populate('standardId', 'name acronym')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOne(id: string): Promise<Assessment> {
    const assessment = await this.assessmentModel
      .findById(id)
      .populate('standardId', 'name acronym criteria')
      .populate('userId', 'firstName lastName email organization')
      .exec();

    if (!assessment) {
      throw new NotFoundException(`Assessment with ID ${id} not found`);
    }

    return assessment;
  }

  async update(id: string, updateData: Partial<CreateAssessmentDto>): Promise<Assessment> {
    const assessment = await this.assessmentModel.findById(id);

    if (!assessment) {
      throw new NotFoundException(`Assessment with ID ${id} not found`);
    }

    Object.assign(assessment, updateData);

    if (updateData.responses) {
      this.calculateScores(assessment);
      this.generateGaps(assessment);
      this.generateRoadmap(assessment);
      assessment.status = AssessmentStatus.COMPLETED;
      assessment.completedAt = new Date();
    }

    return assessment.save();
  }

  async remove(id: string): Promise<void> {
    const result = await this.assessmentModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Assessment with ID ${id} not found`);
    }
  }

  async getRoadmap(id: string): Promise<RoadmapDto> {
    const assessment = await this.findOne(id);

    return {
      companyName: assessment.companyName,
      assessmentId: id,
      roadmap: assessment.roadmap,
      overallScore: assessment.overallScore,
      targetScore: 80,
      estimatedTimeframe: '12-18 months',
      totalEstimatedCost: '$15,000 - $25,000',
    };
  }

  private calculateScores(assessment: Assessment): void {
    const responses = assessment.responses;
    const categoryScores: any = {};
    let totalScore = 0;
    let categoryCount = 0;

    Object.keys(responses).forEach(category => {
      const categoryResponses = responses[category];
      if (categoryResponses && typeof categoryResponses === 'object') {
        const scores = Object.values(categoryResponses).filter(v => typeof v === 'number') as number[];
        if (scores.length > 0) {
          const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
          categoryScores[category] = Math.round(avgScore * 10) / 10;
          totalScore += avgScore;
          categoryCount++;
        }
      }
    });

    assessment.categoryScores = categoryScores;
    assessment.overallScore = categoryCount > 0 
      ? Math.round((totalScore / categoryCount) * 10) / 10 
      : 0;
  }

  private generateGaps(assessment: Assessment): void {
    const gaps: any[] = [];
    const responses = assessment.responses;
    const requiredScore = 7;

    Object.keys(responses).forEach(category => {
      const categoryResponses = responses[category];
      if (categoryResponses && typeof categoryResponses === 'object') {
        Object.keys(categoryResponses).forEach(criterion => {
          const score = categoryResponses[criterion];
          if (typeof score === 'number' && score < requiredScore) {
            const gap = requiredScore - score;
            gaps.push({
              category,
              criterion: this.formatCriterionName(criterion),
              currentScore: score,
              requiredScore,
              priority: gap >= 4 ? 'High' : gap >= 2 ? 'Medium' : 'Low',
              recommendation: this.getRecommendation(category, criterion, score),
            });
          }
        });
      }
    });

    gaps.sort((a, b) => {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    assessment.gaps = gaps;
  }

  private generateRoadmap(assessment: Assessment): void {
    const roadmap: any[] = [];
    const highPriorityGaps = assessment.gaps.filter(g => g.priority === 'High');
    const mediumPriorityGaps = assessment.gaps.filter(g => g.priority === 'Medium');

    if (highPriorityGaps.length > 0) {
      roadmap.push({
        milestone: 'Phase 1: Critical Improvements',
        description: `Address ${highPriorityGaps.length} high-priority gaps in ${[...new Set(highPriorityGaps.map(g => g.category))].join(', ')}`,
        timeframe: '0-6 months',
        cost: '$5,000 - $10,000',
        priority: 'High',
      });
    }

    if (mediumPriorityGaps.length > 0) {
      roadmap.push({
        milestone: 'Phase 2: Standard Compliance',
        description: `Implement ${mediumPriorityGaps.length} medium-priority improvements`,
        timeframe: '6-12 months',
        cost: '$3,000 - $8,000',
        priority: 'Medium',
      });
    }

    roadmap.push({
      milestone: 'Phase 3: Certification Preparation',
      description: 'Prepare documentation and undergo pre-audit assessment',
      timeframe: '12-15 months',
      cost: '$4,000 - $7,000',
      priority: 'Medium',
    });

    roadmap.push({
      milestone: 'Phase 4: Certification Audit',
      description: 'Third-party certification audit and final verification',
      timeframe: '15-18 months',
      cost: '$3,000 - $5,000',
      priority: 'High',
    });

    assessment.roadmap = roadmap;
  }

  private formatCriterionName(criterion: string): string {
    return criterion
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  }

  private getRecommendation(category: string, criterion: string, score: number): string {
    const recommendations = {
      environmental: {
        wasteManagement: 'Implement waste segregation and recycling programs',
        energyEfficiency: 'Invest in energy-efficient equipment and renewable energy',
        waterUsage: 'Install water conservation systems and monitoring',
        chemicalUsage: 'Adopt integrated pest management and reduce chemical inputs',
        biodiversity: 'Create biodiversity conservation zones and native plantings',
      },
      social: {
        fairWages: 'Conduct wage benchmarking and implement living wage policy',
        workingConditions: 'Improve safety equipment and working environment',
        childLabor: 'Strengthen age verification and monitoring systems',
        genderEquality: 'Develop gender equality policy and training programs',
        communityEngagement: 'Establish community consultation mechanisms',
      },
      economic: {
        fairPricing: 'Negotiate long-term contracts with fair pricing mechanisms',
        longTermContracts: 'Develop relationships with certified buyers',
        marketAccess: 'Join producer cooperatives and export networks',
        financialTransparency: 'Implement financial management training and systems',
      },
      quality: {
        productQuality: 'Implement quality control procedures and testing',
        traceability: 'Establish traceability system from farm to export',
        certificationReadiness: 'Conduct gap analysis and prepare documentation',
      },
      ethics: {
        antiCorruption: 'Develop anti-corruption policy and grievance mechanism',
        transparency: 'Publish annual sustainability and financial reports',
        businessEthics: 'Implement code of conduct and ethics training',
      },
    };

    return recommendations[category]?.[criterion] || 'Consult with technical advisor for improvement plan';
  }
}
