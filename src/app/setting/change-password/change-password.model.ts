
/**
 * Định nghĩa tham số được truyền vào khi gọi dữ liệu thay đổi mật khẩu
 */
export interface ParamChangePassword {
    current_password: string;
    password: string;
    confirm_password: string;
}