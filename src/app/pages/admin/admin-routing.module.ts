import {NgModule} from "@angular/core";
import { RouterModule, Routes} from "@angular/router";

import {ProductManagerComponent} from "./product-manager/product-manager.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {ListDeliveryComponent} from "./list-delivery/list-delivery.component";
import {UserManageComponent} from "./user-manage/user-manage.component";
import {VoucherManageComponent} from "./vocher-manage/voucher-manage.component";
import {SaleManageComponent} from "./sale-manage/sale-manage.component";
import {SaleInfoComponent} from "./sale-info/sale-info.component";
import {SaleListComponent} from "./sale-list/sale-list.component";
import {InvoiceInfoComponent} from "./invoice-info/invoice-info.component";
import {GiaInfoComponent} from "./gia-info/gia-info.component";
import {DiamondManageComponent} from "./diamond-manage/diamond-manage.component";
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
  {
    path:'voucher-manage',
    component:VoucherManageComponent,
  },
  {
    path:'sale-manage',
    component:SaleManageComponent,
  },
  {
    path:'sale-list',
    component:SaleListComponent,
  },
  {
    path:'sale-info',
    component:SaleInfoComponent,
  },
  {
    path: 'invoice-info',
    component: InvoiceInfoComponent,
  },
  {
    path: 'gia-info',
    component: GiaInfoComponent,
  },
  {
    path: 'diamond-manage',
    component: DiamondManageComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
