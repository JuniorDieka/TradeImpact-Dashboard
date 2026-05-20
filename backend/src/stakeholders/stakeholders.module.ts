import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StakeholdersService } from './stakeholders.service';
import { StakeholdersController } from './stakeholders.controller';
import { Project, ProjectSchema } from './schemas/project.schema';
import { Task, TaskSchema } from './schemas/task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Project.name, schema: ProjectSchema },
      { name: Task.name, schema: TaskSchema },
    ]),
  ],
  controllers: [StakeholdersController],
  providers: [StakeholdersService],
  exports: [StakeholdersService],
})
export class StakeholdersModule {}
