import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {NumberService} from "../../../core/services/number.service";
import {OrderService} from "../../../core/services/order.service";
import {ToastService} from "../../../core/toast/toast-service";
import {DeliverService} from "../../../core/services/deliver.service";
import {listStatusOrder} from "./list-status-order";

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  formAddDelivery:FormGroup;
  formUpdateStatusOrder:FormGroup;
  submitted = false;
  submittedDelivery = false;
  submittedUpdateStatusOrder = false;

  orders : any[];
  term: any;
  page = 1;
  count = 0;
  pageSize = 9;
  searchOrder:string = '';
  listDelivery : any[];
  listStatusOrder: any[];
  maxNumber = 1000000;

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
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Admin'},{ label: 'Order List Manage', active: true}];

    this.formAddDelivery = this.formBuilder.group({
      orderId: [{value:'',  disabled: true}, [Validators.required]],
      deliveryId: ['', [Validators.required]],
      customerId:[''],
    });
    this.formUpdateStatusOrder = this.formBuilder.group({
      orderId: [{value:'',  disabled: true}, [Validators.required]],
      status: ['', [Validators.required]],
      customerId:[''],
      reason :['']
    });

    this.page = 1;
    this.listStatusOrder = listStatusOrder;
    this.getAllOrder();
    this.getAllDelivery();
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

  get formDelivery() {
    return this.formAddDelivery.controls;
  }
  get formUpdate(){
    return this.formUpdateStatusOrder.controls;
  }
  fetchDataFormDelivery(data: any) {
    this.formDelivery['orderId'].setValue(data.uniqueOrderId);
    this.formDelivery['customerId'].setValue(data.customerId);
  }
  /**
   * Open modal
   * @param content modal content
   * @param item
   */
  openModalAddDelivery(content: any, item: any) {
    this.fetchDataFormDelivery(item);
    this.modalService.open(content);
  }
  closeEventModalAddDelivery() {
    this.formDelivery['orderId'].setValue(null);
    this.formDelivery['deliveryId'].setValue(null);
    this.formDelivery['customerId'].setValue(null);
    this.modalService.dismissAll();
  }
  AddDelivery() {
    console.log(this.formDelivery);
    if(this.formAddDelivery.valid) {
      const request = {
        customer_id: this.formDelivery['customerId'].value,
        order_id: this.formDelivery['orderId'].value,
        delivery_id: this.formDelivery['deliveryId'].value
      };
      this.orderService.addDeliveryToOrder(request).subscribe((res) =>{
        this.toastService.show('Add delivery to order success', { classname: 'bg-success text-light', delay: 5000 });
        this.getAllOrder();
      }, error => {
        this.toastService.show('Add delivery to order fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
      })

      this.modalService.dismissAll()
    }
    this.submittedDelivery = true;
  }

  getAllDelivery() {
    const request = {
      limit:this.maxNumber,
    }
    this.deliverService.getAllDelivery().subscribe((res) =>{
      this.listDelivery = res;
      // this.count = res?.meta?.total;
    }, error => {
      this.toastService.show('Error get list order', { classname: 'bg-danger text-light', delay: 5000 });

    })
  }

  openUpdateStatusOrder(content: any, item: any){
    this.fetchDataFormUpdateStatusOrder(item);
    this.modalService.open(content);

  }
  fetchDataFormUpdateStatusOrder(item: any){
    this.formUpdate['orderId'].setValue(item.uniqueOrderId);
    this.formUpdate['customerId'].setValue(item.customerId);
    this.formUpdate['status'].setValue(item?.status);
  }

  updateStatusOrder() {
    if(this.formUpdateStatusOrder.valid) {
      const request = {
        customer_id: this.formUpdate['customerId'].value,
        order_id: this.formUpdate['orderId'].value,
        // delivery_id: this.formUpdate['deliveryId'].value,
        status: this.formUpdate['status'].value
      } as any;
      if (this.formUpdate['status'].value === 'cancel') {
        request.reason = this.formUpdate['reason'].value
      }
      this.orderService.updateStatusOrder(request).subscribe((res)=>{
        this.toastService.show('Change status order success', { classname: 'bg-success text-light', delay: 5000 });
      }, error => {
        this.toastService.show('Change status order fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
      })
      this.closeEventModalUpdateStatus();
    }
    this.submittedUpdateStatusOrder = true;
  }
  closeEventModalUpdateStatus() {
    this.modalService.dismissAll();
    this.formUpdate['orderId'].setValue(null);
    this.formUpdate['deliveryId'].setValue(null);
    this.formUpdate['customerId'].setValue(null);
    this.formUpdate['status'].setValue(null);
    this.formUpdate['reason'].setValue(null);
  }
}
