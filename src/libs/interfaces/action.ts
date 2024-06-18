export interface ActionInterface {
  /**
   * Tên hiện thị của action
   */
  title: string;

  /**
   * Tên định danh của action.
   * Lưu ý: tên gữa các action không được giống nhau
   */
  name: string;

  /**
   * Hình minh họa của action
   */
  icon?: string;

  /**
   * Quyết định xem action sẽ xuất hiện khi chọn dòng.
   * Nếu true thì chỉ 1. false thì >= 1.
   */
  isOne?: boolean;

  /**
   * Quyết định xem action có được xuất hiện trên mỗi dòng hay không.
   */
  onRow?: boolean;

  /**
   * Chỉ định xem action sẽ xuất hiện hoặc không xuất hiện ở nhữn tab nào.
   * Ví dụ:[false, 'trash', 'filter' ] hoặc [true, 'trash']
   */
  onTab?: any[];

  /**
   * Sẽ quyết định việc action có hiện lên hay không
   */
  permission?: boolean;

  /**
   * Css class cho action
   */
  class?: string;

  color?: string;

  /**
   * Dữ liệu tùy chỉnh
   */
  params?: any;

  action?: string;
  controller?: string;
  module?: string;
  isShow?: boolean;

  /**
   * Kiểm tra hiển thị bằng callback function
   */
  isShowFn?: (any: any) => boolean;
}
