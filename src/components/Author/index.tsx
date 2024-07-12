import {View, StyleSheet} from "react-native";
import {Avatar, Text} from "react-native-paper";
import {AuthorComponentProps} from "components/Author/types";

export const Author = ({author, ...props}: AuthorComponentProps) => {
    return (
        <View {...props} style={[styles.container, props.style]}>
            <Avatar.Icon style={styles.avatar} size={40} icon={author.avatar ?? 'account'} />
            <View>
                <Text>{author.name}</Text>
                <Text>{author.role}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 10,
    }

});