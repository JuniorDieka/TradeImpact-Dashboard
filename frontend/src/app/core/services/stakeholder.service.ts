import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Project, CreateProjectDto } from '../../shared/models/project.model';
import { Task, CreateTaskDto, UpdateTaskDto } from '../../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class StakeholderService {
  constructor(private apiService: ApiService) { }

  // Project endpoints
  getProjects(memberState?: string): Observable<any> {
    const params = memberState ? { memberState } : {};
    return this.apiService.get<any>('stakeholders/projects', params);
  }

  getProject(id: string): Observable<any> {
    return this.apiService.get<any>(`stakeholders/projects/${id}`);
  }

  getProjectStats(id: string): Observable<any> {
    return this.apiService.get<any>(`stakeholders/projects/${id}/stats`);
  }

  createProject(projectData: CreateProjectDto): Observable<any> {
    return this.apiService.post<any>('stakeholders/projects', projectData);
  }

  updateProject(id: string, projectData: Partial<CreateProjectDto>): Observable<any> {
    return this.apiService.patch<any>(`stakeholders/projects/${id}`, projectData);
  }

  deleteProject(id: string): Observable<any> {
    return this.apiService.delete<any>(`stakeholders/projects/${id}`);
  }

  // Task endpoints
  getTasks(projectId?: string, assignedTo?: string): Observable<any> {
    const params: any = {};
    if (projectId) params.projectId = projectId;
    if (assignedTo) params.assignedTo = assignedTo;
    return this.apiService.get<any>('stakeholders/tasks', params);
  }

  getTask(id: string): Observable<any> {
    return this.apiService.get<any>(`stakeholders/tasks/${id}`);
  }

  createTask(taskData: CreateTaskDto): Observable<any> {
    return this.apiService.post<any>('stakeholders/tasks', taskData);
  }

  updateTask(id: string, taskData: UpdateTaskDto): Observable<any> {
    return this.apiService.patch<any>(`stakeholders/tasks/${id}`, taskData);
  }

  deleteTask(id: string): Observable<any> {
    return this.apiService.delete<any>(`stakeholders/tasks/${id}`);
  }

  addComment(taskId: string, comment: string): Observable<any> {
    return this.apiService.post<any>(`stakeholders/tasks/${taskId}/comments`, { comment });
  }
}
