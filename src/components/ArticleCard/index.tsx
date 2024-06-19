import {Card, Icon, Text, useTheme} from "react-native-paper";
import {View, StyleSheet, Pressable} from "react-native";
import {Author} from "components/Author";
import {ArticleCardProps} from "components/ArticleCard/types";

export const ArticleCard = ({article, ...props}: ArticleCardProps) => {
    const {colors} = useTheme();
    return (
        <Card theme={{ roundness: 6 }} {...props}>
            <Card.Content>
                <View style={styles.articleTitleContainer}>
                    <Text style={styles.articleTitle}>{article.title}</Text>
                    <Pressable onPress={() => console.log('implement favorite funcitonality')}>
                        <Icon source={'star'} size={25} color={article.favorite ? colors.primary : colors.backdrop } />
                    </Pressable>
                </View>
                <Text numberOfLines={2} style={styles.articleDescription}>{article.description}</Text>
                <Author author={article.author} />
            </Card.Content>
        </Card>
    )
}

const styles = StyleSheet.create({
   articleTitleContainer: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       marginBottom: 10
   },
    articleTitle: {
        fontSize: 18,
        fontWeight: '700'
    },
    articleDescription: {
        fontSize: 15,
        fontWeight: '600',
        marginRight: 30,
        marginBottom: 15,
    }
});