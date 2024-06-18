/**
 * Khai báo định nghĩa biến được sử dụng từ kết quả trả về cho chức năng đăng nhập
 */
export interface LoginModel {
    access_token: string;
    status: boolean;
    message: string;
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
}
/**
 * Khai báo định nghĩa biến được sử dụng khi truyền dữ liệu qua chức năng đăng nhập
 */
export interface ParamLoginModel {
    email: string;
    password: string;
}

