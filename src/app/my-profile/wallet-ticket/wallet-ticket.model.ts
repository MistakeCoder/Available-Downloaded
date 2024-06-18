
export interface ParamCreate {
    customer_id: number;
    amount: string;
    type: string;
    customer_account_id: number;
    bank_name: string;
    beneficiary_account: string;
    beneficiary: string;
    note: string;
}

export interface CreatePaymentAccounts {
    status: boolean;
    message: string;
}


export interface GetAllBanks {
    data: DataGetAllBanks[];
    status: boolean;
}

interface DataGetAllBanks {
    id: number;
    name: string;
}

export interface GetAllPaymentMethods {
    data: DataGetAllPaymentMethods;
    status: boolean;
}

interface DataGetAllPaymentMethods {
    id: number;
    name: string;
}


export interface ParamChangeStatusWalletTickets {
    status: string;
    payment_method_id: number;
    bankbank_account_id: number;
}

