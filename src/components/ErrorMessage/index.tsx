import React from "react";
import {ErrorMessageProps} from "components/ErrorMessage/types";
import {Text, useTheme} from "react-native-paper";

export const ErrorMessage: React.FC<ErrorMessageProps> = ({message, style}) => {
    const theme = useTheme();
    return (
        <Text style={{ fontSize: 14, marginLeft:20, color: theme.colors.error, ...style}}>
            {message}
        </Text>
    )
}