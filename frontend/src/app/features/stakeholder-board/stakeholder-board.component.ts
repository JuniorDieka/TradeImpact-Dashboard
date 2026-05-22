import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StakeholderService } from '../../core/services/stakeholder.service';
import { AuthService } from '../../core/services/auth.service';
import { Project } from '../../shared/models/project.model';
import { Task, TaskStatus, TaskPriority } from '../../shared/models/task.model';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-stakeholder-board',
  templateUrl: './stakeholder-board.component.html',
  styleUrls: ['./stakeholder-board.component.scss']
})
export class StakeholderBoardComponent implements OnInit {
  projects: Project[] = [];
  selectedProject: Project | null = null;
  tasks: Task[] = [];
  loading = true;
  currentUser: User | null = null;

  // Task columns for Kanban board
  columns = [
    { status: TaskStatus.TODO, title: 'To Do', icon: 'playlist_add', color: '#757575' },
    { status: TaskStatus.IN_PROGRESS, title: 'In Progress', icon: 'pending', color: '#2196f3' },
    { status: TaskStatus.UNDER_REVIEW, title: 'Under Review', icon: 'rate_review', color: '#ff9800' },
    { status: TaskStatus.COMPLETED, title: 'Completed', icon: 'check_circle', color: '#4caf50' },
    { status: TaskStatus.BLOCKED, title: 'Blocked', icon: 'block', color: '#f44336' }
  ];

  constructor(
    private stakeholderService: StakeholderService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    this.loadProjects();
  }

  loadProjects(): void {
    this.loading = true;
    this.stakeholderService.getProjects().subscribe({
      next: (response) => {
        this.projects = response.data || response || [];
        if (this.projects.length > 0) {
          this.selectProject(this.projects[0]);
        } else {
          this.loading = false;
        }
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.loading = false;
      }
    });
  }

  selectProject(project: Project): void {
    this.selectedProject = project;
    this.loadTasks(project._id);
  }

  loadTasks(projectId: string): void {
    this.loading = true;
    this.stakeholderService.getTasks(projectId).subscribe({
      next: (response) => {
        this.tasks = response.data || response || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.loading = false;
      }
    });
  }

  getTasksByStatus(status: TaskStatus): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  getPriorityColor(priority: TaskPriority): string {
    const colors = {
      [TaskPriority.LOW]: '#4caf50',
      [TaskPriority.MEDIUM]: '#ff9800',
      [TaskPriority.HIGH]: '#f44336',
      [TaskPriority.URGENT]: '#9c27b0'
    };
    return colors[priority];
  }

  updateTaskStatus(task: Task, newStatus: TaskStatus): void {
    this.stakeholderService.updateTask(task._id, { status: newStatus }).subscribe({
      next: () => {
        task.status = newStatus;
        if (newStatus === TaskStatus.COMPLETED) {
          task.completedAt = new Date();
        }
      },
      error: (error) => {
        console.error('Error updating task status:', error);
      }
    });
  }

  formatDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  isOverdue(task: Task): boolean {
    if (!task.dueDate || task.status === TaskStatus.COMPLETED) return false;
    return new Date(task.dueDate) < new Date();
  }

  getProjectProgress(): number {
    if (this.tasks.length === 0) return 0;
    const completed = this.tasks.filter(t => t.status === TaskStatus.COMPLETED).length;
    return Math.round((completed / this.tasks.length) * 100);
  }

  editTask(task: Task): void {
    // TODO: Open edit dialog
    console.log('Edit task:', task);
    this.snackBar.open('Edit task functionality coming soon!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  addComment(task: Task): void {
    // For now, using simplified version - full dialog can be added later
    this.snackBar.open('Add comment feature coming soon!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
    
    /* Full implementation would use Material Dialog:
    const comment = prompt('Enter your comment:');
    if (comment && comment.trim()) {
      this.stakeholderService.addComment(task._id, comment.trim()).subscribe({
        next: () => {
          this.snackBar.open('✓ Comment added successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
          if (this.selectedProject) {
            this.loadTasks(this.selectedProject._id);
          }
        },
        error: (error) => {
          console.error('Error adding comment:', error);
          this.snackBar.open('✗ Failed to add comment. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
        }
      });
    }
    */
  }

  deleteTask(task: Task): void {
    // Show confirmation in snackbar with action button
    const snackBarRef = this.snackBar.open(
      `Delete "${task.title}"?`,
      'DELETE',
      {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['warning-snackbar']
      }
    );

    snackBarRef.onAction().subscribe(() => {
      this.stakeholderService.deleteTask(task._id).subscribe({
        next: () => {
          this.snackBar.open('✓ Task deleted successfully!', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['success-snackbar']
          });
          // Remove task from local array
          this.tasks = this.tasks.filter(t => t._id !== task._id);
        },
        error: (error) => {
          console.error('Error deleting task:', error);
          this.snackBar.open('✗ Failed to delete task. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            panelClass: ['error-snackbar']
          });
        }
      });
    });
  }
}
