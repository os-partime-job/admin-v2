import {Component, OnInit, ViewChild} from '@angular/core';
import {emailSentBarChart, monthlyEarningChart} from './data';
import {ChartType, DashBoardInfo} from './dashboard.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EventService} from '../../../core/services/event.service';

import {ConfigService} from '../../../core/services/config.service';
import {OrderService} from "../../../core/services/order.service";
import {ToastService} from "../../../core/toast/toast-service";
import {NumberService} from "../../../core/services/number.service";
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  isVisible: string;

  emailSentBarChart: ChartType;
  monthlyEarningChart: ChartType;
  transactions: Array<[]>;
  statData: Array<[]>;
  dashBoardInfo: DashBoardInfo;

  formSearch: FormGroup = this.formBuilder.group({
    startDate: ['', [Validators.required, Validators.pattern('([0-9]{2})?[0-9]{2}(-)(1[0-2]|0?[1-9])\\2(3[01]|[12][0-9]|0?[1-9])')]],
    endDate: ['', [Validators.required, Validators.pattern('([0-9]{2})?[0-9]{2}(-)(1[0-2]|0?[1-9])\\2(3[01]|[12][0-9]|0?[1-9])')]]
  });

  isActive: string;
  submitted: boolean = false;

  @ViewChild('content') content;

  constructor(private modalService: NgbModal,
              private configService: ConfigService,
              private eventService: EventService,
              private orderService: OrderService,
              private toastService: ToastService,
              private numberService: NumberService,
              private formBuilder: FormBuilder,) {
  }

  async ngOnInit() {

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
    await this.getTwoDate();
    this.getDashBoardInfo();

    /**
     * Fetches the data
     */
    this.fetchData();
  }

  get form() {
    return this.formSearch.controls;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.openModal();
    }, 2000);
  }

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
    this.modalService.open(this.content, {centered: true});
  }

  weeklyreport() {
    this.isActive = 'week';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }];
  }

  monthlyreport() {
    this.isActive = 'month';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }, {
        name: 'Series B',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series C',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }];
  }

  yearlyreport() {
    this.isActive = 'year';
    this.emailSentBarChart.series =
      [{
        name: 'Series A',
        data: [13, 23, 20, 8, 13, 27, 18, 22, 10, 16, 24, 22]
      }, {
        name: 'Series B',
        data: [11, 17, 15, 15, 21, 14, 11, 18, 17, 12, 20, 18]
      }, {
        name: 'Series C',
        data: [44, 55, 41, 67, 22, 43, 36, 52, 24, 18, 36, 48]
      }];
  }


  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
  changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }

  getDashBoardInfo() {
    if (this.formSearch.valid) {
      if (this.validateEndDate(this.form['endDate'].value)) {
        return this.toastService.show('End Date can not bigger current date!!!', {
          classname: 'bg-danger text-light',
          delay: 5000
        })
      } else {
        const request = {
          startDate: this.form['startDate'].value,
          endDate: this.form['endDate'].value,
        } as any;
        this.orderService.getInfoDashBoard(request).subscribe((res) => {
          this.submitted = false;
          this.dashBoardInfo = res.data;
          // @ts-ignore
          this.dashBoardInfo?.revenue_data?.total_price = this.convertNumber(this.dashBoardInfo?.revenue_data?.total_price) + ' VNĐ';
          // @ts-ignore
          this.dashBoardInfo?.revenue_data?.price_wait_payment = this.convertNumber(this.dashBoardInfo?.revenue_data?.price_wait_payment) + ' VNĐ';
          // @ts-ignore
          this.dashBoardInfo?.revenue_data?.price_delivery = this.convertNumber(this.dashBoardInfo?.revenue_data?.price_delivery) + ' VNĐ';
          // @ts-ignore
          this.dashBoardInfo?.revenue_data?.price_success = this.convertNumber(this.dashBoardInfo?.revenue_data?.price_success) + ' VNĐ';
          // @ts-ignore
          this.dashBoardInfo?.revenue_data?.price_cancel = this.convertNumber(this.dashBoardInfo?.revenue_data?.price_cancel) + ' VNĐ';
        }, error => {
          this.toastService.show('Get information dashboard fail!!!', {classname: 'bg-danger text-light', delay: 5000})
        });
      }
    } else {
      this.submitted = true;
    }
  }

  convertNumber(number) {
    return this.numberService.convertNumber(number);
  }

  async getTwoDate() {
    let currentDate = new Date();
    let beforeDate = new Date();
    beforeDate.setDate(currentDate.getDate() - 30);

    this.form['startDate'].setValue(this.convertDateToStringFormat(beforeDate));
    this.form['endDate'].setValue(this.convertDateToStringFormat(currentDate));
  }

  convertDateToStringFormat(date: Date) {
    return date.getFullYear() + '-' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate()));
  }

  validateEndDate(endDate: string) {
    const dateParts = endDate.split("-");
    const year = parseInt(dateParts[0], 10);
    const month = parseInt(dateParts[1], 10) - 1;
    const day = parseInt(dateParts[2], 10);
    const date = new Date(year, month, day, 0, 0, 0, 0);
    const currentDate = new Date();
    return currentDate < date;
  }

}
