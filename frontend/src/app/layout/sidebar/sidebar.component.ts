import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    { icon: 'dashboard', label: 'Dashboard', route: '/dashboard' },
    { icon: 'verified', label: 'Standards', route: '/standards' },
    { icon: 'trending_up', label: 'Trade Performance', route: '/trade-performance' },
    { icon: 'assessment', label: 'Assessments', route: '/assessments' },
    { icon: 'account_tree', label: 'Value Chains', route: '/value-chains' },
    { icon: 'groups', label: 'Stakeholder Board', route: '/stakeholder-board' }
  ];
}
