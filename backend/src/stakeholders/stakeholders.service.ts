import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { Task, TaskDocument, TaskStatus } from './schemas/task.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AddCommentDto } from './dto/add-comment.dto';

@Injectable()
export class StakeholdersService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new this.projectModel(createProjectDto);
    return project.save();
  }

  async findAllProjects(memberState?: string): Promise<Project[]> {
    const filter = memberState ? { memberState: { $regex: memberState, $options: 'i' } } : {};
    return this.projectModel
      .find(filter)
      .populate('stakeholders', 'firstName lastName email organization')
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findOneProject(id: string): Promise<Project> {
    const project = await this.projectModel
      .findById(id)
      .populate('stakeholders', 'firstName lastName email organization role')
      .populate('createdBy', 'firstName lastName email')
      .exec();

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async updateProject(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .populate('stakeholders', 'firstName lastName email organization')
      .populate('createdBy', 'firstName lastName email')
      .exec();

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async removeProject(id: string): Promise<void> {
    const result = await this.projectModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    await this.taskModel.deleteMany({ projectId: id }).exec();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const project = await this.projectModel.findById(createTaskDto.projectId);
    
    if (!project) {
      throw new NotFoundException(`Project with ID ${createTaskDto.projectId} not found`);
    }

    const task = new this.taskModel(createTaskDto);
    return task.save();
  }

  async findAllTasks(projectId?: string, assignedTo?: string): Promise<Task[]> {
    const filter: any = {};
    
    if (projectId) {
      filter.projectId = projectId;
    }
    
    if (assignedTo) {
      filter.assignedTo = assignedTo;
    }

    return this.taskModel
      .find(filter)
      .populate('projectId', 'name memberState sector')
      .populate('assignedTo', 'firstName lastName email')
      .populate('createdBy', 'firstName lastName email')
      .sort({ priority: 1, dueDate: 1 })
      .exec();
  }

  async findOneTask(id: string): Promise<Task> {
    const task = await this.taskModel
      .findById(id)
      .populate('projectId', 'name memberState sector status')
      .populate('assignedTo', 'firstName lastName email organization')
      .populate('createdBy', 'firstName lastName email')
      .exec();

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskModel.findById(id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    Object.assign(task, updateTaskDto);

    if (updateTaskDto.status === TaskStatus.COMPLETED && !task.completedAt) {
      task.completedAt = new Date();
    }

    return task.save();
  }

  async removeTask(id: string): Promise<void> {
    const result = await this.taskModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async addComment(taskId: string, addCommentDto: AddCommentDto): Promise<Task> {
    const task = await this.taskModel.findById(taskId);

    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    task.comments.push({
      userId: addCommentDto.userId as any,
      userName: addCommentDto.userName,
      comment: addCommentDto.comment,
      timestamp: new Date(),
    });

    return task.save();
  }

  async getProjectStats(projectId: string): Promise<any> {
    const project = await this.findOneProject(projectId);
    const tasks = await this.taskModel.find({ projectId }).exec();

    const tasksByStatus = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const tasksByPriority = tasks.reduce((acc, task) => {
      acc[task.priority] = (acc[task.priority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const overdueTasks = tasks.filter(
      task => task.dueDate && task.dueDate < new Date() && task.status !== TaskStatus.COMPLETED
    ).length;

    const completedTasks = tasks.filter(task => task.status === TaskStatus.COMPLETED).length;
    const completionRate = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

    return {
      project: {
        name: project.name,
        status: project.status,
        progressPercentage: project.progressPercentage,
      },
      taskSummary: {
        total: tasks.length,
        byStatus: tasksByStatus,
        byPriority: tasksByPriority,
        overdue: overdueTasks,
        completionRate,
      },
      stakeholders: project.stakeholders.length,
      budget: project.budget,
    };
  }
}
