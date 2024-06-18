export interface GetAllProducts {
    data: DataGetAllProducts;
    status: boolean;
}

interface DataGetAllProducts {
    id: number;
    name: string;
    price: string;
    acceptance_point: number;
    download_package: {};
}