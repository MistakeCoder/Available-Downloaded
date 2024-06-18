
/**
 * Định nghĩa kiểu dữ liệu trả về khi gọi dữ liệu
 */
export interface GetDetailOrders {
    data: DataGetDetailOrders;
    status: boolean;
}

interface DataGetDetailOrders {
    id: number;
    code: string;
    order_status: string;
    payment_status: string;
    products: DataProducts[];
    customer: object;
}

interface DataProducts {
    id: number;
    code: string;
    name: string;
    pivot: object;
}

export interface GetAllPaymentMethod {
    data: DataGetAllPaymentMethod[];
    status: boolean;
}

interface DataGetAllPaymentMethod {
    id: number;
    name: string;
    note: string;
}

export interface GetPaymentAccount {
    data: DataGetPaymentAccount;
    status: boolean;
}

interface DataGetPaymentAccount {
    id: number;
    bank_id: number;
    benificiary_account: string;
    benificiary: string;
    note: string;
    payment_method_id: number;
    bank: object;
}

/**
 * Định nghĩa kiểu dữ liệu được truyền qua tham số khi gọi dữ liệu xác nhận thanh toán
 */
export interface ParamConfirmPayment {
    payment_method_id: number;
    bank_account_id: number;
    amount: string;
    order_id: number;
}