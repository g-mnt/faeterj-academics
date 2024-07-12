import {ViewProps} from "react-native";
export type AuthorComponentProps = {
    author: AuthorProps,
    size?: number,
} & ViewProps

export type AuthorProps = {
    name: string;
    role: string;
    avatar?: string;
}