import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customers} from "../../ecommerce/customers/customers.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {customersData} from "../../ecommerce/customers/data";
import {ToastService} from "../../../core/toast/toast-service";
import {UserProfileService} from "../../../core/services/user.service";

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  // formData: FormGroup;
  formUpdate: FormGroup;
  submitted = false;
  submittedUpdateUser = false;
  customersData: Customers[];
  allUsers:any = [];
  userRoles:any = [];
  listStatus:any = [];

  term: any;

  // page
  // currentpage: number;

  constructor(private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private toastService: ToastService,
              private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Admin'},{ label: 'Users Manage', active: true}];

    // this.formData = this.formBuilder.group({
    //   username: ['', [Validators.required]],
    //   phone: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
    //   address: ['', [Validators.required]],
    //   balance: ['', [Validators.required]]
    // });
    this.formUpdate = this.formBuilder.group({
      accountId: [{value:'',  disabled: true}, [Validators.required]],
      email: [{value:'',  disabled: true}, [Validators.required]],
      fullName: ['', [Validators.required]],
      roleId: ['', [Validators.required]],
      active: [true, [Validators.required]]
    });
    this.getUserList().then(r => {});
    this.getUserRoleList();
    this.getListStatus();

    // this.currentpage = 1;

    /**
     * Fetches the data
     */
    this._fetchData();
  }

  /**
   * Customers data fetches
   */
  private _fetchData() {
    this.customersData = customersData;
  }
  // get form() {
  //   return this.formData.controls;
  // }
  get formUpdateUser() {
    return this.formUpdate.controls;
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
    this.formUpdateUser['accountId'].setValue(item.account_id);
    this.formUpdateUser['email'].setValue(item.email);
    this.formUpdateUser['fullName'].setValue(item.full_name);
    this.formUpdateUser['roleId'].setValue(this.findRole(item.role).id);
    this.formUpdateUser['active'].setValue(item.active);
  }
  closeUpdateModal(){
    this.formUpdateUser['accountId'].setValue('');
    this.formUpdateUser['email'].setValue('');
    this.formUpdateUser['fullName'].setValue('');
    this.formUpdateUser['roleId'].setValue('');
    this.formUpdateUser['active'].setValue(true);
    this.modalService.dismissAll();
  }

  findRole(role:string){
    return this.userRoles.find(({roleName}) => roleName === role);
  }

  // saveCustomer() {
  //   const currentDate = new Date();
  //   if (this.formData.valid) {
  //     const username = this.formData.get('username').value;
  //     const email = this.formData.get('email').value;
  //     const phone = this.formData.get('phone').value;
  //     const address = this.formData.get('address').value;
  //     const balance = this.formData.get('balance').value;
  //
  //     this.customersData.push({
  //       id: this.customersData.length + 1,
  //       username,
  //       email,
  //       phone,
  //       address,
  //       balance,
  //       rating: '4.3',
  //       date: currentDate + ':'
  //     })
  //     this.modalService.dismissAll()
  //   }
  //   this.submitted = true
  // }
  async getUserList() {
    this.userProfileService.getAllUser().subscribe((res) => {
      this.allUsers = res?.data;
    }, error => {
      this.toastService.show('Error get list User!!!', { classname: 'bg-danger text-light', delay: 5000 });
    });

}
  getUserRoleList() {
    this.userRoles = [
      {
        id:1,
        roleName:'ADMIN'
      },
      {
        id:2,
        roleName:'END_USER'
      },
      {
        id:3,
        roleName:'MANAGER'
      },
      {
        id:4,
        roleName:'SALE'
      }
      ,
      {
        id:5,
        roleName:'DELIVERY'
      }
    ]
  }
  getListStatus() {
    this.listStatus = [
      {
        status: true,
        name: 'active'
      },
      {
        status: false,
        name: 'inActive'
      }
    ];
  }
  updateUser() {
    if (this.formUpdate.valid) {
      console.log(typeof this.formUpdateUser['active'].value);
      console.log(this.formUpdateUser['active'].value);
      console.log(!this.formUpdateUser['active'].value);
      const request = {
        accountId:this.formUpdateUser['accountId'].value,
        email:this.formUpdateUser['email'].value,
        fullName:this.formUpdateUser['fullName'].value,
        roleId:this.formUpdateUser['roleId'].value,
        deactivate:this.formUpdateUser['active'].value == 'false',
      }
      this.userProfileService.updateUser(request).subscribe((res) =>{
        this.toastService.show('Update user success', { classname: 'bg-success text-light', delay: 5000 });
        this.closeUpdateModal();
        this.getUserList().then(r => {});
      },error => {
        this.toastService.show('Update user fail!!!', { classname: 'bg-danger text-light', delay: 5000 });
      })
    }
    this.submittedUpdateUser = true;
  }
}
