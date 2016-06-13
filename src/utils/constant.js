/**
 * Created by Administrator on 2016/4/30.
 */
import path from 'path';
export const platformTypes = [
    "订阅号",
    "服务号",
    "个人微信号"
];

export const ORDER_STATUS = {
    WAITING_CHECKOUT: "待回访",
    WAITING_RECEIVE: "待收货",
    CONFIRM_RECEIVED: "确认收货",
    REJECT: "已拒收",
    CHEAT: "假单",
    COMPLETED: "已返款",
    VISITED: "已回访"
};

export const ORDER_STATUS_LIST = [
    "待回访",
	  "已回访",
    "待收货",
    "确认收货",
    "已拒收",
    "假单",
    "已返款"

];

export const PERMISSION_LIST = [
    //"全部订单",
    "待回访",
    "已回访",
    "待收货",
    "确认收货",
    "已拒收",
    "假单",
    "已返款"
    //,
    //"订单奖励"

];

export const ORDER_STATUS_RELATION = new Map([
    [1, ORDER_STATUS.WAITING_CHECKOUT],
    [2, ORDER_STATUS.WAITING_RECEIVE],
    [3, ORDER_STATUS.CONFIRM_RECEIVED],
    [4, ORDER_STATUS.REJECT],
    [5, ORDER_STATUS.CHEAT],
    [6, ORDER_STATUS.COMPLETED],
    [7, ORDER_STATUS.VISITED]
]);

export const CARRIER_LIST = [
    "顺丰"
];

export const getCSVPath = () => {
  return path.resolve(__dirname, "../../download/orders.csv");
};
