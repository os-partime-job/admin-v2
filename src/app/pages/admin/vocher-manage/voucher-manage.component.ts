import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {NumberService} from "../../../core/services/number.service";
import {OrderService} from "../../../core/services/order.service";
import {ToastService} from "../../../core/toast/toast-service";
import {DeliverService} from "../../../core/services/deliver.service";
import {listStatusDelivery} from "../list-delivery/list-status-delivery";

@Component({
  selector: 'app-voucher-manage',
  templateUrl: './voucher-manage.component.html',
  styleUrls: ['./voucher-manage.component.scss']
})
export class VoucherManageComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  formUpdate:FormGroup;
  submitted = false;
  submittedDelivery = false;

  listDelivery : any[];
  listStatusDelivery : any[];
  listVoucher : any[];
  couponsType:any[] = [
    {
      key:'ALL',
      value:'ALL'
    },
    {
      key:'PERSONAL',
      value:'PERSONAL'
    }
  ];
  CouponsConditionType:any[] = [
    {
      key:'ACCOUNT_AGE',
      value:'ACCOUNT_AGE'
    },
    {
      key:'CUSTOMERS_LOYAL',
      value:'CUSTOMERS_LOYAL'
    }
  ];
  term: any;
  // page = 1;
  // count = 0;
  // pageSize = 9;


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
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Admin'},{ label: 'Voucher List Manage', active: true}];
    this.getAllVoucher();

    this.formData = this.formBuilder.group({
      code: ['', [Validators.required]],
      discountPercent: ['', [Validators.required,Validators.min(1), Validators.max(99)]],
      discountType: ['', [Validators.required]],
      type: [''],
      value: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      quantity: ['', [Validators.required]],

    });
    this.formUpdate = this.formBuilder.group({
      id: [{value:'',  disabled: true}, [Validators.required]],
      code: [{value:'',  disabled: true}, [Validators.required]],
      discountPercent: ['', [Validators.required,Validators.min(1), Validators.max(99)]],
      discountType: ['', [Validators.required]],
      type: [''],
      value: ['', [Validators.required]],
      expirationDate: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
    });

    // this.page = 1;
  }

  get form() {
    return this.formData.controls;
  }

  get formUpdateCouple() {
    return this.formUpdate.controls;
  }
  fetchDataFormUpdateCouple(data: any) {
    this.formUpdateCouple['id'].setValue(data.id);
    this.formUpdateCouple['code'].setValue(data.couponsCode);
    this.formUpdateCouple['discountPercent'].setValue(data.discountPercent);
    this.formUpdateCouple['discountType'].setValue(data.discountType);
    this.formUpdateCouple['type'].setValue(data.type);
    this.formUpdateCouple['value'].setValue(data.value);
    this.formUpdateCouple['expirationDate'].setValue(data.expirationDate);
    this.formUpdateCouple['quantity'].setValue(data.quantity);
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }

  saveCoupon() {
    console.log(this.form);
    console.log(this.form['discountType'].value)
    if(this.form['discountType'].value == 'PERSONAL'){
      if(!this.form['type'].value || this.form['type'].value == ''){
        return this.toastService.show('Type is require', { classname: 'bg-danger text-light', delay: 5000 });
      }
    }
    if(this.formData.valid) {
       const request = {
         code: this.form['code'].value,
         discountPercent: this.form['discountPercent'].value,
         discountType: this.form['discountType'].value,
         value: this.form['value'].value,
         expirationDate: this.form['expirationDate'].value,
         quantity: this.form['quantity'].value,
       } as any;
       if (this.form['discountType'].value == 'PERSONAL'){
         request.type = this.form['type'].value;
       }
       this.orderService.addVoucher(request).subscribe((res) => {
         this.getAllVoucher();
         this.closeEventModalVoucher();

         this.toastService.show('Create Voucher success', { classname: 'bg-success text-light', delay: 5000 });
         return this.submitted = false;
       },error => {
         if(error.data) {
           this.toastService.show(error.data, { classname: 'bg-danger text-light', delay: 5000 });

         } else {
           this.toastService.show('Create Voucher voucher fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
         }
       });
      this.modalService.dismissAll();
    } else {
      this.submitted = true;
    }

  }
  deleteCoupon(item: any) {
    this.orderService.deleteVoucher(item.couponsCode).subscribe((res) => {
      this.getAllVoucher();
      this.toastService.show('Delete Voucher success', { classname: 'bg-success text-light', delay: 5000 });
    },error => {
      this.toastService.show('Delete Voucher fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
    });
  }
  openModalUpdateVoucher(content: any, item: any) {
    this.fetchDataFormUpdateCouple(item);
    this.modalService.open(content);
  }
  closeEventModalUpdateVoucher() {
    this.formUpdateCouple['id'].setValue(null);
    this.formUpdateCouple['code'].setValue(null);
    this.formUpdateCouple['discountPercent'].setValue(null);
    this.formUpdateCouple['discountType'].setValue(null);
    this.formUpdateCouple['type'].setValue(null);
    this.formUpdateCouple['value'].setValue(null);
    this.formUpdateCouple['expirationDate'].setValue(null);
    this.formUpdateCouple['quantity'].setValue(null);
    this.modalService.dismissAll();
  }
  closeEventModalVoucher() {
    this.form['code'].setValue(null);
    this.form['discountPercent'].setValue(null);
    this.form['discountType'].setValue(null);
    this.form['type'].setValue(null);
    this.form['value'].setValue(null);
    this.form['expirationDate'].setValue(null);
    this.form['quantity'].setValue(null);
  }
  updateVoucher() {
    if(this.formUpdateCouple['discountType'].value == 'PERSONAL'){
      if(!this.formUpdateCouple['type'].value || this.formUpdateCouple['type'].value == ''){
        return this.toastService.show('Type is require', { classname: 'bg-danger text-light', delay: 5000 });
      }
    }
    if(this.formUpdate.valid) {
      const request = {
        id:this.formUpdateCouple['id'].value,
        code: this.formUpdateCouple['code'].value,
        discountPercent: this.formUpdateCouple['discountPercent'].value,
        discountType: this.formUpdateCouple['discountType'].value,
        value: this.formUpdateCouple['value'].value,
        expirationDate: this.formUpdateCouple['expirationDate'].value,
        quantity: this.formUpdateCouple['quantity'].value,
      } as any;
      if (this.formUpdateCouple['discountType'].value == 'PERSONAL'){
        request.type = this.formUpdateCouple['type'].value;
      }
      this.orderService.updateVoucher(request).subscribe((res) => {
        this.getAllVoucher();
        this.toastService.show('Update Voucher success', { classname: 'bg-success text-light', delay: 5000 });
        return this.submittedDelivery = false;
      },error => {
        this.toastService.show('Update Voucher fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
      });
      this.modalService.dismissAll();
    } else {
      this.submittedDelivery = true;
    }
  }
  getAllVoucher() {
    this.orderService.getAllVoucher().subscribe((res) =>{
      this.listVoucher = res.data;
    }, error => {
      if(error.data) {
        this.toastService.show(error.data, { classname: 'bg-danger text-light', delay: 5000 });

      } else {
        this.toastService.show('Get all voucher fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
      }
    })
  }

}
