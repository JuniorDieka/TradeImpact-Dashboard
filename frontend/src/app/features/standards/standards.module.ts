import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { StandardsListComponent } from './standards-list/standards-list.component';

const routes: Routes = [
  { path: '', component: StandardsListComponent }
];

@NgModule({
  declarations: [
    StandardsListComponent
  ],
  imports: [
    SharedModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class StandardsModule { }
