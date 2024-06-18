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