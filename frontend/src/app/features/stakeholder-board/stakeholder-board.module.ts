import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { StakeholderBoardComponent } from './stakeholder-board.component';

const routes: Routes = [
  { path: '', component: StakeholderBoardComponent }
];

@NgModule({
  declarations: [
    StakeholderBoardComponent
  ],
  imports: [
    SharedModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class StakeholderBoardModule { }
