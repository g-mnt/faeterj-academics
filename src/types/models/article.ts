import {Author} from "types/models/author";

export type Article = {
    id: number;
    title: string;
    description: string;
    author: Author;
}