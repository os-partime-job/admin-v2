import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NumberService} from "../../../core/services/number.service";
import {ProductService} from "../../../core/services/product.service";
import {OrderService} from "../../../core/services/order.service";
import {ToastService} from "../../../core/toast/toast-service";

@Component({
  selector: 'app-invoice-info',
  templateUrl: './invoice-info.component.html',
  styleUrls: ['./invoice-info.component.scss']
})
export class InvoiceInfoComponent implements OnInit {

  customer_name: string = '';
  address: string = '';
  phone_number: string = '';
  order_id: string = '';
  order_date:string = '';
  jewery_name: string = '';
  jewery_code: string = '';
  quantity :string = '';
  listProduct:any[] = [];
  invoiceInfo:any;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private productService: ProductService,
              private toastService :ToastService,
              private numberFormat: NumberService,
              private orderService: OrderService) {
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      let orderId = params['orderId'];
      let request = {
        order_id:orderId,
      } as any;
      this.orderService.getInvoiceDetail(request).subscribe((res) => {
          this.invoiceInfo = res.data;
          this.customer_name = this.invoiceInfo?.customer_name;
          this.phone_number = this.invoiceInfo?.phone_number;
          this.order_id = this.invoiceInfo?.order_id;
          this.customer_name = this.invoiceInfo?.customer_name;
          this.order_date = this.invoiceInfo?.order_date;
          this.listProduct = this.invoiceInfo?.list_of_product;
        },
        (error) => {
          this.toastService.show('Get Invoice Detail Fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
        });
    }, error => {
    });
  }


}
