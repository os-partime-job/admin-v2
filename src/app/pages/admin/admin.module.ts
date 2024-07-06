import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {AdminRoutingModule} from "./admin-routing.module";
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { Ng5SliderModule } from 'ng5-slider';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbNavModule, NgbDropdownModule, NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import {ToastsContainer} from "../../core/toast/toasts-container.component";
import { OrderListComponent } from './order-list/order-list.component';
import { ListDeliveryComponent } from './list-delivery/list-delivery.component';
import { UserManageComponent } from './user-manage/user-manage.component';
import { VoucherManageComponent } from './vocher-manage/voucher-manage.component';
import { SaleManageComponent } from './sale-manage/sale-manage.component';
import { SaleListComponent } from './sale-list/sale-list.component';
import { SaleInfoComponent } from './sale-info/sale-info.component';
import {NgApexchartsModule} from "ng-apexcharts";

const config: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 100,
};
@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    ProductManagerComponent,
    ToastsContainer,
    OrderListComponent,
    ListDeliveryComponent,
    UserManageComponent,
    VoucherManageComponent,
    SaleManageComponent,
    SaleListComponent,
    SaleInfoComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        NgbNavModule,
        NgbModalModule,
        FormsModule,
        Ng2SearchPipeModule,
        NgbDropdownModule,
        DropzoneModule,
        ReactiveFormsModule,
        UIModule,
        WidgetModule,
        Ng5SliderModule,
        NgSelectModule,
        NgbPaginationModule,
        NgbModule,
        NgApexchartsModule
    ],
  exports: [
    ToastsContainer
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: config
    }
  ]
})
export class AdminModule { }
