import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customers} from "../../ecommerce/customers/customers.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {NumberService} from "../../../core/services/number.service";
import {OrderService} from "../../../core/services/order.service";
import {ToastService} from "../../../core/toast/toast-service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;

  orders : any[];
  term: any;
  page = 1;
  count = 0;
  pageSize = 9;
  searchOrder:string = '';

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private numberFormat: NumberService,
              private orderService: OrderService,
              private toastService :ToastService
              ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Admin'},{ label: 'Order List Manage', active: true}];

    this.formData = this.formBuilder.group({
      username: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      address: ['', [Validators.required]],
      balance: ['', [Validators.required]]
    });

    this.page = 1;
    this.getAllOrder();
  }
  getAllOrder() {
    const request = {
      title:this.searchOrder,
      customer_id : 1,
      limit:this.pageSize,
      offset:(this.page-1)*this.pageSize,
    }
    this.orderService.getOrdersAllUser(request).subscribe((res) =>{
      this.orders = res.data;
      this.count = res?.meta?.total;
    }, error => {
      this.toastService.show('Error get list order', { classname: 'bg-danger text-light', delay: 5000 });

    })
  }

  get form() {
    return this.formData.controls;
  }
  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }

  saveCustomer() {
    const currentDate = new Date();
    if (this.formData.valid) {
      const username = this.formData.get('username').value;
      const email = this.formData.get('email').value;
      const phone = this.formData.get('phone').value;
      const address = this.formData.get('address').value;
      const balance = this.formData.get('balance').value;

      // this.customersData.push({
      //   id: this.customersData.length + 1,
      //   username,
      //   email,
      //   phone,
      //   address,
      //   balance,
      //   rating: '4.3',
      //   date: currentDate + ':'
      // })
      this.modalService.dismissAll()
    }
    this.submitted = true
  }

}
