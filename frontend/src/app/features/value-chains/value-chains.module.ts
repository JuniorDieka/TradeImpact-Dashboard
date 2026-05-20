import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { ValueChainsComponent } from './value-chains.component';

const routes: Routes = [
  { path: '', component: ValueChainsComponent }
];

@NgModule({
  declarations: [
    ValueChainsComponent
  ],
  imports: [
    SharedModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class ValueChainsModule { }
