export interface AbstractModel {
    id?: number,
    version?: number;
    createdDate?: string;
    updatedDate?: string;
    [key: string]: any | null | undefined | string | number;
}
