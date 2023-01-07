import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from '../components/categories/categories.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { ProductsComponent } from '../components/products/products.component';
import { PromotionsComponent } from '../components/promotions/promotions.component';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {path:'dashboard',component:DashboardComponent},
      {path:'products',component:ProductsComponent},
      {path:'categories',component:CategoriesComponent},
      {path:'orders',component:OrdersComponent},
      {path:'promotions',component:PromotionsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
