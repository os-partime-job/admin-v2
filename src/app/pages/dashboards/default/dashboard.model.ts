// Chart data
export interface ChartType {
    chart?: any;
    plotOptions?: any;
    colors?: any;
    series?: any;
    fill?: any;
    dataLabels?: any;
    legend?: any;
    xaxis?: any;
    stroke?: any;
    labels?: any;
}
export interface DashBoardInfo {
  order_info?: {
    total_order?: any,
    order_init?: any,
    order_wait_payment?: any,
    order_delivery?: any,
    order_success?: any,
    order_cancel?: any
  },
  revenue_data?: {
    total_price?: any,
    price_wait_payment?: any,
    price_delivery?: any,
    price_success?: any,
    price_cancel?: any
  }
}


