import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { AssessmentsComponent } from './assessments.component';

const routes: Routes = [
  { path: '', component: AssessmentsComponent }
];

@NgModule({
  declarations: [
    AssessmentsComponent
  ],
  imports: [
    SharedModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class AssessmentsModule { }
