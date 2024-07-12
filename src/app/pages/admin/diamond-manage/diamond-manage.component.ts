import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {NumberService} from "../../../core/services/number.service";
import {OrderService} from "../../../core/services/order.service";
import {ToastService} from "../../../core/toast/toast-service";
import {DeliverService} from "../../../core/services/deliver.service";

@Component({
  selector: 'app-diamond-manage',
  templateUrl: './diamond-manage.component.html',
  styleUrls: ['./diamond-manage.component.scss']
})
export class DiamondManageComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  formUpdate:FormGroup;
  submitted = false;
  submittedDelivery = false;

  listDelivery : any[];
  listStatusDelivery : any[];
  diamonds: any[];
  clarities: any[];
  polishes: any[];
  colors: any[];
  origins: any[];
  shapes: any[];
  cuts: any[];

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
              private deliverService : DeliverService,
              private numberService: NumberService
  ) { }

  async ngOnInit() {
    this.breadCrumbItems = [{label: 'Dashboards'}, {label: 'Admin'}, {label: 'Diamond List Manage', active: true}];
    this.getAllVoucher();
    await this.getAllElementOfDiamond();
    await this.getAllDiamondList();

    this.formData = this.formBuilder.group({
      name_diamond: ['', [Validators.required]],
      price_diamond: ['', [Validators.required]],
      carat: ['', [Validators.required]],
      polish: ['', [Validators.required]],
      cut: ['', [Validators.required]],
      clarity: ['', [Validators.required]],
      color: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      shape: ['', [Validators.required]],

    });
    this.formUpdate = this.formBuilder.group({
      id_diamond: [{value: '', disabled: true}, [Validators.required]],
      name_diamond: [{value: '', disabled: true}, [Validators.required]],
      price_diamond: ['', [Validators.required]],
      carat: ['', [Validators.required]],
      polish: ['', [Validators.required]],
      cut: ['', [Validators.required]],
      clarity: ['', [Validators.required]],
      color: ['', [Validators.required]],
      origin: ['', [Validators.required]],
      shape: ['', [Validators.required]],
    });

    // this.page = 1;
  }

  get form() {
    return this.formData.controls;
  }

  get formUpdates() {
    return this.formUpdate.controls;
  }
  fetchDataFormUpdate(data: any) {
    this.formUpdates['id_diamond'].setValue(data.id);
    this.formUpdates['name_diamond'].setValue(data.name);
    this.formUpdates['price_diamond'].setValue(data.priceDiamond);
    this.formUpdates['carat'].setValue(data.carat);
    this.formUpdates['polish'].setValue(data.polishId);
    this.formUpdates['cut'].setValue(data.cutId);
    this.formUpdates['clarity'].setValue(data.clarityId);
    this.formUpdates['color'].setValue(data.colorId);
    this.formUpdates['origin'].setValue(data.originId);
    this.formUpdates['shape'].setValue(data.shapeId);
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }

  save() {
    if(this.formData.valid) {
      const request = {
        name_diamond: this.form['name_diamond'].value,
        price_diamond: this.form['price_diamond'].value,
        carat: this.form['carat'].value,
        polish: this.form['polish'].value,
        cut: this.form['cut'].value,
        clarity: this.form['clarity'].value,
        color: this.form['color'].value,
        origin: this.form['origin'].value,
        shape: this.form['shape'].value,
      } as any;
      this.orderService.createDiamond(request).subscribe((res) => {
        this.getAllDiamondList().then(r => {});
        this.closeEventModalAdd();
        this.toastService.show('Create Diamond success', { classname: 'bg-success text-light', delay: 5000 });
        return this.submitted = false;
      },error => {
        if(error.data) {
          this.toastService.show(error.data, { classname: 'bg-danger text-light', delay: 5000 });

        } else {
          this.toastService.show('Create Diamond fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
        }
      });
      this.modalService.dismissAll();
    } else {
      this.submitted = true;
    }

  }
  // deleteCoupon(item: any) {
  //   this.orderService.deleteVoucher(item.couponsCode).subscribe((res) => {
  //     this.getAllVoucher();
  //     this.toastService.show('Delete Voucher success', { classname: 'bg-success text-light', delay: 5000 });
  //   },error => {
  //     this.toastService.show('Delete Voucher fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
  //   });
  // }
  openModalUpdate(content: any, item: any) {
    this.fetchDataFormUpdate(item);
    this.modalService.open(content);
  }
  closeEventModalUpdate() {
    this.formUpdates['name_diamond'].setValue(null);
    this.formUpdates['price_diamond'].setValue(null);
    this.formUpdates['carat'].setValue(null);
    this.formUpdates['polish'].setValue(null);
    this.formUpdates['cut'].setValue(null);
    this.formUpdates['clarity'].setValue(null);
    this.formUpdates['color'].setValue(null);
    this.formUpdates['origin'].setValue(null);
    this.formUpdates['shape'].setValue(null);
    this.modalService.dismissAll();
  }
  closeEventModalAdd() {
    this.form['name_diamond'].setValue(null);
    this.form['price_diamond'].setValue(null);
    this.form['carat'].setValue(null);
    this.form['polish'].setValue(null);
    this.form['cut'].setValue(null);
    this.form['clarity'].setValue(null);
    this.form['color'].setValue(null);
    this.form['origin'].setValue(null);
    this.form['shape'].setValue(null);
  }
  update() {
    if(this.formUpdate.valid) {
      const request = {
        id_diamond: this.formUpdates['id_diamond'].value,
        price_diamond: this.formUpdates['price_diamond'].value,
        carat: this.formUpdates['carat'].value,
        polish: this.formUpdates['polish'].value,
        cut: this.formUpdates['cut'].value,
        clarity: this.formUpdates['clarity'].value,
        color: this.formUpdates['color'].value,
        origin: this.formUpdates['origin'].value,
        shape: this.formUpdates['shape'].value,
      } as any;
      this.orderService.updateDiamond(request).subscribe((res) => {
        this.getAllDiamondList().then(r => {});
        this.toastService.show('Update Diamond success', { classname: 'bg-success text-light', delay: 5000 });
        return this.submittedDelivery = false;
      },error => {
        this.toastService.show('Update Diamond fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
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
  async getAllElementOfDiamond() {
    this.orderService.getAllElementOfDiamond().subscribe((res) =>{
      this.clarities = res.clarities;
      this.polishes = res.polishes;
      this.colors = res.colors;
      this.origins = res.origins;
      this.shapes = res.shapes;
      this.cuts = res.cuts;

    }, error => {
      this.toastService.show('Get all element of diamond fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
    });
  }
  async getAllDiamondList() {
    this.orderService.getDiamondList().subscribe((res) =>{
      this.diamonds = res;
    }, error => {
      this.toastService.show('Get list diamond fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
    });
  }
  convertNumber(number) {
    return this.numberService.convertNumber(number);
  }
  getNameClarita(_id:any) {
    return this.clarities.find(({id}) =>id === _id).clarity;
  }
  getNamePolishe(_id:any) {
    return this.polishes.find(({id}) =>id === _id).polish;
  }
  getNameColor(_id:any) {
    return this.colors.find(({id}) =>id === _id).color;
  }
  getNameOrigin(_id:any) {
    return this.origins.find(({id}) =>id === _id).originName;
  }
  getNameShape(_id:any) {
    return this.shapes.find(({id}) =>id === _id).shape;
  }
  getNameCut(_id:any) {
    return this.cuts.find(({id}) =>id === _id).cut;
  }

}
