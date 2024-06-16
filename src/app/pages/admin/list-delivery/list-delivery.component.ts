import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customers} from "../../ecommerce/customers/customers.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {NumberService} from "../../../core/services/number.service";
import {OrderService} from "../../../core/services/order.service";
import {ToastService} from "../../../core/toast/toast-service";
import {DeliverService} from "../../../core/services/deliver.service";

@Component({
  selector: 'app-list-delivery',
  templateUrl: './list-delivery.component.html',
  styleUrls: ['./list-delivery.component.scss']
})
export class ListDeliveryComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  formData: FormGroup;
  submitted = false;
  customersData: Customers[];

  listDelivery : any[];
  term: any;
  page = 1;
  count = 0;
  pageSize = 9;

  // page
  currentpage: number;
  customers= [
    {
      id: 1,
      username: 'Stephen Rash',
      phone: '325-250-1106',
      email: 'StephenRash@teleworm.us',
      address: '2470 Grove Street Bethpage, NY 11714',
      rating: '4.2',
      balance: '$5,412',
      date: '07 Oct, 2019'
    },
    {
      id: 2,
      username: 'Juan Mays',
      phone: '443-523-4726',
      email: 'JuanMays@armyspy.com',
      address: '3755 Harron Drive Salisbury, MD 21875',
      rating: '4.0',
      balance: '$5,632',
      date: '06 Oct, 2019'
    },
    {
      id: 3,
      username: 'Scott Henry',
      phone: '704-629-9535',
      email: 'ScottHenry@jourrapide.com',
      address: '3632 Snyder Avenue Bessemer City, NC 28016',
      rating: '4.4',
      balance: '$7,523',
      date: '06 Oct, 2019'
    },
    {
      id: 4,
      username: 'Cody Menendez',
      phone: '701-832-5838',
      email: 'CodyMenendez@armyspy.com',
      address: '4401 Findley Avenue Minot, ND 58701',
      rating: '4.1',
      balance: '$6,325',
      date: '05 Oct, 2019'
    },
    {
      id: 5,
      username: 'Jason Merino',
      phone: '706-219-4095',
      email: 'JasonMerino@dayrep.com',
      address: '3159 Holly Street Cleveland, GA 30528',
      rating: '3.8',
      balance: '$4,523',
      date: '04 Oct, 2019'
    },
    {
      id: 6,
      username: 'Kyle Aquino',
      phone: '415-232-5443',
      email: 'KyleAquino@teleworm.us',
      address: '4861 Delaware Avenue San Francisco, CA 94143',
      rating: '4.0',
      balance: '$5,412',
      date: '03 Oct, 2019'
    },
    {
      id: 7,
      username: 'David Gaul',
      phone: '314-483-4679',
      email: 'DavidGaul@teleworm.us',
      address: '1207 Cottrill Lane Stlouis, MO 63101',
      rating: '4.2',
      balance: '$6,180',
      date: '02 Oct, 2019'
    },
    {
      id: 8,
      username: 'John McCray',
      phone: '253-661-7551',
      email: 'JohnMcCray@armyspy.com',
      address: '3309 Horizon Circle Tacoma, WA 98423',
      rating: '4.1',
      balance: '$5,2870',
      date: '02 Oct, 2019'
    }
  ];

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

    this.currentpage = 1;

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
    this.customersData = this.customers;
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

      this.customersData.push({
        id: this.customersData.length + 1,
        username,
        email,
        phone,
        address,
        balance,
        rating: '4.3',
        date: currentDate + ':'
      })
      this.modalService.dismissAll()
    }
    this.submitted = true
  }

}
