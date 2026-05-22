import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { StandardsListComponent } from './standards-list/standards-list.component';
import { StandardDetailComponent } from './standard-detail/standard-detail.component';
import { StandardCompareComponent } from './standard-compare/standard-compare.component';

const routes: Routes = [
  { path: '', component: StandardsListComponent },
  { path: 'compare', component: StandardCompareComponent },
  { path: ':id', component: StandardDetailComponent }
];

@NgModule({
  declarations: [
    StandardsListComponent,
    StandardDetailComponent,
    StandardCompareComponent
  ],
  imports: [
    SharedModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class StandardsModule { }
