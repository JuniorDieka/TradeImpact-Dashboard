import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../shared/models/user.model';

interface MenuItem {
  icon: string;
  label: string;
  route: string;
  roles?: UserRole[];
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  allMenuItems: MenuItem[] = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'verified', label: 'Standards', route: '/standards' },
    {
      icon: 'trending_up',
      label: 'Trade Performance',
      route: '/trade-performance',
      roles: [UserRole.ADMIN, UserRole.POLICY_ANALYST, UserRole.MSME_USER]
    },
    {
      icon: 'assessment',
      label: 'Assessments',
      route: '/assessments',
      roles: [UserRole.ADMIN, UserRole.POLICY_ANALYST, UserRole.MSME_USER]
    },
    {
      icon: 'account_tree',
      label: 'Value Chains',
      route: '/value-chains',
      roles: [UserRole.ADMIN, UserRole.POLICY_ANALYST, UserRole.MSME_USER]
    },
    {
      icon: 'groups',
      label: 'Stakeholder Board',
      route: '/stakeholder-board',
      roles: [UserRole.ADMIN, UserRole.POLICY_ANALYST, UserRole.STAKEHOLDER]
    }
  ];

  menuItems: MenuItem[] = [];
  currentUserRole: UserRole | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUserRole = user?.role || null;
      this.filterMenuItems();
    });
  }

  private filterMenuItems(): void {
    if (!this.currentUserRole) {
      this.menuItems = [];
      return;
    }

    this.menuItems = this.allMenuItems.filter(item => {
      // If no roles specified, show to everyone
      if (!item.roles || item.roles.length === 0) {
        return true;
      }
      // Show only if user has required role
      return item.roles.includes(this.currentUserRole!);
    });
  }
}
