export interface ParamsOrderConfirm {
    products: DataParamOrderConfirm[];
}

interface DataParamOrderConfirm {
    product_id: number;
    quantity: number;
    price: number;
}