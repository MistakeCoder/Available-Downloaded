export interface GetDownloadPoint {
    data: DataGetDownloadPoint;
    status: boolean;
}

interface DataGetDownloadPoint {
    total_free: number;
    total_daily: number;
    total_other: number;
}

export interface ParamDownloadResources {
    download_sources_id: string;
    download_sources_link: string;
}