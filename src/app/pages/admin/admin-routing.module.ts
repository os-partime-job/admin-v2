import {NgModule} from "@angular/core";
import { RouterModule, Routes} from "@angular/router";

import {ProductManagerComponent} from "./product-manager/product-manager.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {ListDeliveryComponent} from "./list-delivery/list-delivery.component";
import {UserManageComponent} from "./user-manage/user-manage.component";
const routes: Routes = [
  {
    path:'manage-product',
    component:ProductManagerComponent,
  },
  {
    path:'order-list',
    component:OrderListComponent,
  },
  {
    path:'delivery-list',
    component:ListDeliveryComponent,
  },
  {
    path:'user-manage',
    component:UserManageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
