import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customers} from "../../ecommerce/customers/customers.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {NumberService} from "../../../core/services/number.service";
import {OrderService} from "../../../core/services/order.service";
import {ToastService} from "../../../core/toast/toast-service";
import {DeliverService} from "../../../core/services/deliver.service";
import { listStatusDelivery } from './list-status-delivery';

@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.scss']
})
export class ListDeliveryComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  formAddDelivery:FormGroup;
  submitted = false;
  submittedDelivery = false;

  listDelivery : any[];
  listStatusDelivery : any[];
  term: any;
  page = 1;
  count = 0;
  pageSize = 9;


  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private numberFormat: NumberService,
              private orderService: OrderService,
              private toastService :ToastService,
              private deliverService : DeliverService
  ) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Admin'},{ label: 'Delivery List Manage', active: true}];
    this.getAllDelivery();

    this.formData = this.formBuilder.group({
      username: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      address: ['', [Validators.required]],
      balance: ['', [Validators.required]]
    });
    this.formAddDelivery = this.formBuilder.group({
      userId: [{value:'',  disabled: true}, [Validators.required]],
      status: ['', [Validators.required]],
      customerId:[''],
    });

    this.page = 1;

    /**
     * Fetches the data
     */
    this._fetchData();
  }
  getAllDelivery() {
    const request = {
      customer_id : 1,
      limit:this.pageSize,
      offset:(this.page-1)*this.pageSize,
    }
    this.deliverService.getAllDelivery().subscribe((res) =>{
      this.listDelivery = res;
      // this.count = res?.meta?.total;
    }, error => {
      this.toastService.show('Error get list order', { classname: 'bg-danger text-light', delay: 5000 });

    })
  }

  /**
   * Customers data fetches
   */
  private _fetchData() {
    this.listStatusDelivery = listStatusDelivery;
  }
  get form() {
    return this.formData.controls;
  }

  get formDelivery() {
    return this.formAddDelivery.controls;
  }
  fetchDataFormDelivery(data: any) {
    this.formDelivery['userId'].setValue(data.userId);
    this.formDelivery['customerId'].setValue(data.customerId);
    this.formDelivery['status'].setValue(data.status);
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
  openModalAddDelivery(content: any, item: any) {
    this.fetchDataFormDelivery(item);
    this.modalService.open(content);
  }
  closeEventModalAddDelivery() {
    this.formDelivery['userId'].setValue(null);
    this.formDelivery['status'].setValue(null);
    this.formDelivery['customerId'].setValue(null);
    this.modalService.dismissAll();
  }
  AddDelivery() {
    if(this.formAddDelivery.valid) {
      const request = {
        deliver_id: this.formDelivery['userId'].value,
        status: this.formDelivery['status'].value
      };
      this.deliverService.updateStatusDelivery(request).subscribe((res) =>{
        this.toastService.show('Add delivery to order success', { classname: 'bg-success text-light', delay: 5000 });
        this.getAllDelivery();
      }, error => {
        this.toastService.show('Add delivery to order fail!!!', { classname: 'bg-danger text-light', delay: 5000 })
      })

      this.modalService.dismissAll()
    }
    this.submittedDelivery = true;
  }

}
