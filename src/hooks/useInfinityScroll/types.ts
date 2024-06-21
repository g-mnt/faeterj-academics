import {PaginatedRequestProps} from "types/request";

export type InfinityScrollParamsProps<P extends PaginatedRequestProps> = {
    initialPage?: number,
    params?: P,
}