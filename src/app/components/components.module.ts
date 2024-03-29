import { CommonModule } from '@angular/common';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AddCategoryComponent } from '../popups/add-category/add-category.component';
import { AddProductComponent } from '../popups/add-product/add-product.component';
import { AddPromotionComponent } from '../popups/add-promotion/add-promotion.component';
import { AddUserComponent } from '../popups/add-user/add-user.component';
import { EditProductComponent } from '../popups/edit-product/edit-product.component';
import { EditPromotionComponent } from '../popups/edit-promotion/edit-promotion.component';
import { EditUserComponent } from '../popups/edit-user/edit-user.component';
import { ViewOrderComponent } from '../popups/view-order/view-order.component';
import { AdminsComponent } from './admins/admins.component';
import { CategoriesComponent } from './categories/categories.component';
import { PaginationComponent } from './common/pagination/pagination.component';
import { CustomersComponent } from './customers/customers.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriversComponent } from './drivers/drivers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProfileComponent } from './profile/profile.component';
import { PromotionsComponent } from './promotions/promotions.component';

const components=[
   ProductsComponent,DashboardComponent,PaginationComponent,AddProductComponent,EditProductComponent,
   CategoriesComponent,AddCategoryComponent,OrdersComponent,ViewOrderComponent,PromotionsComponent,
   AddPromotionComponent,EditPromotionComponent,DriversComponent,CustomersComponent,AdminsComponent,
   AddUserComponent,EditUserComponent,ProfileComponent
]


@NgModule({
    declarations: [...components],
    exports: [...components],
    imports: [ IonicModule,ReactiveFormsModule,FormsModule,CommonModule,BrowserModule ,],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: []

})

export class ComponentsModule { }