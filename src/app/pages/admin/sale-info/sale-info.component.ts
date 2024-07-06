import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartType, DashBoardInfo} from "../../dashboards/default/dashboard.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ConfigService} from "../../../core/services/config.service";
import {EventService} from "../../../core/services/event.service";
import {OrderService} from "../../../core/services/order.service";
import {ToastService} from "../../../core/toast/toast-service";
import {NumberService} from "../../../core/services/number.service";
import {emailSentBarChart, monthlyEarningChart} from "../../dashboards/default/data";
import {SaleInfo} from "./sale-info.model";

@Component({
  selector: 'app-sale-info',
  templateUrl: './sale-info.component.html',
  styleUrls: ['./sale-info.component.scss']
})
export class SaleInfoComponent implements OnInit {

  isVisible: string;

  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: Array<[]>;
  statData: Array<[]>;
  dashBoardInfo: DashBoardInfo;
  saleInfo: SaleInfo;
  page = 1;
  count = 0;
  pageSize = 9;
  searchOrder:string = '';

  isActive: string;

  @ViewChild('content') content;
  constructor(private modalService: NgbModal,
              private configService: ConfigService,
              private eventService: EventService,
              private orderService: OrderService,
              private toastService :ToastService,
              private numberService: NumberService) {
  }

  ngOnInit() {

    /**
     * horizontal-vertical layput set
     */
    const attribute = document.body.getAttribute('data-layout');

    this.isVisible = attribute;
    const vertical = document.getElementById('layout-vertical');
    if (vertical != null) {
      vertical.setAttribute('checked', 'true');
    }
    if (attribute == 'horizontal') {
      const horizontal = document.getElementById('layout-horizontal');
      if (horizontal != null) {
        horizontal.setAttribute('checked', 'true');
        console.log(horizontal);
      }
    }
    this.getDashBoardInfo();
    this.getDetailSale();
    /**
     * Fetches the data
     */
    this.fetchData();
  }

  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.openModal();
  //   }, 2000);
  // }

  /**
   * Fetches the data
   */
  private fetchData() {
    this.emailSentBarChart = emailSentBarChart;
    this.monthlyEarningChart = monthlyEarningChart;

    this.isActive = 'year';
    this.configService.getConfig().subscribe(data => {
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
  }

  openModal() {
    this.modalService.open(this.content, { centered: true });
  }

  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }
  getDashBoardInfo() {
    this.orderService.getInfoDashBoard().subscribe((res) => {
      this.dashBoardInfo = res.data;
      // @ts-ignore
      this.dashBoardInfo?.revenue_data?.total_price = this.convertNumber(this.dashBoardInfo?.revenue_data?.total_price)+ ' VNĐ';
      // @ts-ignore
      this.dashBoardInfo?.revenue_data?.price_wait_payment =this.convertNumber(this.dashBoardInfo?.revenue_data?.price_wait_payment)  + ' VNĐ';
      // @ts-ignore
      this.dashBoardInfo?.revenue_data?.price_delivery = this.convertNumber(this.dashBoardInfo?.revenue_data?.price_delivery) + ' VNĐ';
      // @ts-ignore
      this.dashBoardInfo?.revenue_data?.price_success = this.convertNumber(this.dashBoardInfo?.revenue_data?.price_success) + ' VNĐ';
      // @ts-ignore
      this.dashBoardInfo?.revenue_data?.price_cancel = this.convertNumber(this.dashBoardInfo?.revenue_data?.price_cancel) + ' VNĐ';
    }, error => {
      this.toastService.show('Get information dashboard fail!!!', { classname: 'bg-danger text-light', delay: 5000 })
    })
  }
  convertNumber(number){
    return this.numberService.convertNumber(number);
  }
  getDetailSale(){
    const request = {
      title:this.searchOrder,
      limit:this.pageSize,
      offset:(this.page-1)*this.pageSize,
    } as any;
    this.orderService.getDetailSale(request).subscribe((res) =>{
      this.saleInfo = res.data;
      this.saleInfo.total_price = this.convertNumber(this.saleInfo.total_price) + ' VNĐ';
    }, error => {
      this.toastService.show('Get information Sale fail!!!', { classname: 'bg-danger text-light', delay: 5000 })
    });
  }

}
