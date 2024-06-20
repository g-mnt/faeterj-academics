import {View, StyleSheet, FlatList} from "react-native";
import {withAuthLayout} from "src/HOC/withAuthLayout";
import {ArticleCard} from "components/ArticleCard";
import {ArticleRepository} from "repositories/article";
import {Text} from "react-native-paper";
import {useInfinityScroll} from "hooks/useInfinityScroll";

export const HomeScreen = withAuthLayout(() => {
    const {data, loadMore} = useInfinityScroll(ArticleRepository.index, {params: {}});
    return (
        <View>
            {data ? (
                <FlatList
                    data={data}
                    onEndReached={loadMore}
                    renderItem={({item, index})  => (
                        <ArticleCard
                            key={index}
                            style={styles.article}
                            article={{
                                ...item,
                                favorite: false
                            }}
                        />
                    )}
                />
            ) : <Text>No data</Text>}

        </View>
    )
});

const styles = StyleSheet.create({
    article: {
        marginBottom: 20,
        marginHorizontal: 2,
    }
});