import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsComponent } from '../components/admins/admins.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { CustomersComponent } from '../components/customers/customers.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { DriversComponent } from '../components/drivers/drivers.component';
import { OrdersComponent } from '../components/orders/orders.component';
import { ProductsComponent } from '../components/products/products.component';
import { ProfileComponent } from '../components/profile/profile.component';
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
      {path:'drivers',component:DriversComponent},
      {path:'customers',component:CustomersComponent},
      {path:'admins',component:AdminsComponent},
      {path:'profile',component:ProfileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
