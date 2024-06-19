import {AuthorProps} from "components/Author/types";
import {ViewStyle} from "react-native";

export type ArticleCardProps = {
    article: ArticleProps
    style?: ViewStyle
}

export type ArticleProps = {
    title: string;
    description: string;
    author: AuthorProps;
    favorite: boolean;
}