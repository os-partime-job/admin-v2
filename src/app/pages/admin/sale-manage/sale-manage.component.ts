import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customers} from "../../ecommerce/customers/customers.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ToastService} from "../../../core/toast/toast-service";
import {UserProfileService} from "../../../core/services/user.service";
import {ProductService} from "../../../core/services/product.service";
import {NumberService} from "../../../core/services/number.service";
import {CartService} from "../../../core/services/cart.service";

@Component({
  selector: 'app-sale-manage',
  templateUrl: './sale-manage.component.html',
  styleUrls: ['./sale-manage.component.scss']
})
export class SaleManageComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  formCart: FormGroup;
  submitted = false;
  submittedAddCart = false;
  customersData: Customers[];
  allUsers:any = [];
  userRoles:any = [];
  listStatus:any = [];
  listDiamond : any[];
  selectSizeDiamond: string = '';
  cartProduct: any[];
  customerName : String ='';
  customerPhoneNumber: String = '';

  term: any;

  // page
  // currentpage: number;

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private toastService: ToastService,
              private userProfileService: UserProfileService,
              private productService: ProductService,
              private numberService: NumberService,
              private cartService: CartService) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Admin'},{ label: 'Sale Manage', active: true}];

    this.formCart = this.formBuilder.group({
      phoneNumber: [{value:'',  disabled: true}, [Validators.required]],
      email: [{value:'',  disabled: true}, [Validators.required]],
      fullName: [{value:'',  disabled: true}, [Validators.required]],
      productId: ['', [Validators.required]],
      size:['']
    });
    this.getUserList().then(r => {});
    this.getDiamondList();

    // this.currentpage = 1;

    /**
     * Fetches the data
    //  */
    // this._fetchData();
  }

  /**
   * Customers data fetches
   */
  // private _fetchData() {
  //   this.customersData = customersData;
  // }
  // get form() {
  //   return this.formData.controls;
  // }
  get formAddCart() {
    return this.formCart.controls;
  }

  /**
   * Open modal
   * @param content modal content
   */
  openModal(content: any) {
    this.modalService.open(content);
  }
  openModalUpdate(content:any, item:any) {
    this.fetchDataUpdate(item);
    this.modalService.open(content);
  }
  fetchDataUpdate(item:any) {
    this.formAddCart['phoneNumber'].setValue(item.phone_number);
    this.formAddCart['email'].setValue(item.email);
    this.formAddCart['fullName'].setValue(item.full_name);
  }
  closeUpdateModal(){
    this.formAddCart['phoneNumber'].setValue('');
    this.formAddCart['email'].setValue('');
    this.formAddCart['fullName'].setValue('');
    this.formAddCart['productId'].setValue('');
    this.formAddCart['size'].setValue('');
    this.modalService.dismissAll();
  }

  findRole(role:string){
    return this.userRoles.find(({roleName}) => roleName === role);
  }
  async getUserList() {
    this.userProfileService.getAllUser().subscribe((res) => {
      this.allUsers = res?.data;
    }, error => {
      this.toastService.show('Error get list User!!!', { classname: 'bg-danger text-light', delay: 5000 });
    });

  }
  addCart() {
    if (this.formCart.valid) {
      const request = {
        phone_number:this.formAddCart['phoneNumber'].value,
        jewelry_id:this.formAddCart['productId'].value,
        quantity: 1,
      } as any;
      if(this.formAddCart['size'].value && this.formAddCart['size'].value != ''){
        request.size = this.formAddCart['size'].value;
      }
      this.cartService.addProductToCard(request).subscribe((res) =>{
        this.toastService.show('Add product to cart success!!!', { classname: 'bg-success text-light', delay: 5000 });
        this.closeUpdateModal();
        }, error => {
        this.toastService.show('Add product to cart fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
      });
    }
    this.submittedAddCart = true;
  }
  getDiamondList() {
    this.productService.getDiamondList().subscribe((res) =>{
      this.listDiamond = res;
    }, error => {
      this.toastService.show('Get diamond list fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
    })
  }
  convertNumber(number){
    return this.numberService.convertNumber(number);
  }
  addProductCart(product:any){
    const request = {
      jewelry_id : product?.id_jewelry,
      quantity : 1,
    } as any;
    if (this.selectSizeDiamond && this.selectSizeDiamond !== '') {
      request.size = this.selectSizeDiamond;
    }
    this.cartService.addProductToCard(request).subscribe((res) =>{
      this.toastService.show('Add product to cart success!!!', { classname: 'bg-success text-light', delay: 5000 });
    }, error => {
      this.toastService.show('Add product to cart fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
    });
  }
  getProductCart(user: any,modal:any) {
    const request = {
      phone_number : user.phone_number
    }
    this.cartService.getProductInCart(request).subscribe((res) =>{
      this.cartProduct = res.data;
      this.customerPhoneNumber = user.phone_number;
      this.customerName = user.full_name;
      this.openModal(modal);
    }, error => {
      this.toastService.show('Get cart of Customer fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
    })
  }
  closeModalCart(){
    this.customerName = '';
    this.customerPhoneNumber = '';
    this.cartProduct = [];
    this.modalService.dismissAll();
  }
}
