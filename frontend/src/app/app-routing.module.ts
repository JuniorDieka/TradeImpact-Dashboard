import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UserRole } from './shared/models/user.model';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'standards',
    loadChildren: () => import('./features/standards/standards.module').then(m => m.StandardsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'trade-performance',
    loadChildren: () => import('./features/trade-performance/trade-performance.module').then(m => m.TradePerformanceModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.POLICY_ANALYST, UserRole.MSME_USER] }
  },
  {
    path: 'assessments',
    loadChildren: () => import('./features/assessments/assessments.module').then(m => m.AssessmentsModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.POLICY_ANALYST, UserRole.MSME_USER] }
  },
  {
    path: 'value-chains',
    loadChildren: () => import('./features/value-chains/value-chains.module').then(m => m.ValueChainsModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.POLICY_ANALYST, UserRole.MSME_USER] }
  },
  {
    path: 'stakeholder-board',
    loadChildren: () => import('./features/stakeholder-board/stakeholder-board.module').then(m => m.StakeholderBoardModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.ADMIN, UserRole.POLICY_ANALYST, UserRole.STAKEHOLDER] }
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
