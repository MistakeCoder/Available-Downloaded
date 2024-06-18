/**
 * Khai báo định nghĩa kiểu dữ liệu được truyền qua tham số khi thêm phương thức thanh toán
 */
export interface ParamAddPaymentMethod {
    bank_id: number;
    benificiary_account: string;
    benificiary: string;
    type: string;
    is_default: boolean;
}


export interface GetPaymentMethodList {
    data: DataGetPaymentMethodList;
    status: boolean;
}

interface DataGetPaymentMethodList {
    id: number;
    bank_id: number;
    beneficiary_account: string;
    beneficiary: string;
    type: string;
    is_default: boolean;
    bank: object;
}