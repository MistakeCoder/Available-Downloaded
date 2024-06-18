export interface ParamUpdatePersonalInfo {
    name: string;
    emai: string;
    phone: string;
}

export interface FetchUsersLogin {
    data: DataFetchUsersLogin;
    status: boolean;
}

interface DataFetchUsersLogin {
    id: number;
    code: string;
    name: string;
    email: string;
    referral: DataReferral;
}

interface DataReferral {
    code: string;
}