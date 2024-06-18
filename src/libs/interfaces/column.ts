export interface ColumnInterface {

  /**
   * Tên hiện thị của cột
   */
  title: string;

  /**
   * Tên định danh của cột.
   * Lưu ý: trong 1 table, các cột không được trùng nhau
   */
  name: string;

  /**
   * Là một function.
   * Hàm này dùng để tùy chỉnh lại cách hiển thị của cột
   */
  render?: any;

  /**
   * Css class cho cột
   */
  class?: string;

  /**
   * Nếu là true thì sẽ giới hạn ký tự hiển thị trong cột là 80 kí tự.
   * Nếu là number thì giá trị đó là giới hạn ký tự hiển thị
   */
  limit?: boolean | number;

  /**
   * Căn lề hiển thị
   * left | center | right
   */
  align?: string;

  /**
   * Hex hoặc rgb
   */
  backgroundColor?: string;
  fontSize?: string;
  fontWeight?: number;
  fontStyle?: string;
  tooltip?: boolean;

  /**
   * Độ rộng của cột
   * Tất cả đơn vị của css
   * VD: 100px, 2em, 2rem
   */
  width?: string;
  minWidth?: string;
  cursor?: string;

  action?: string;
  controller?: string;
  module?: string;

  /**
   * Cài đặt hiển thị cột
   * Mặc định là hiển thị
   */
  isShow?: boolean;
}
