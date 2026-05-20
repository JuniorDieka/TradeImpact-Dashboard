import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { LayoutModule } from '../../layout/layout.module';
import { TradePerformanceComponent } from './trade-performance.component';

const routes: Routes = [
  { path: '', component: TradePerformanceComponent }
];

@NgModule({
  declarations: [
    TradePerformanceComponent
  ],
  imports: [
    SharedModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class TradePerformanceModule { }
