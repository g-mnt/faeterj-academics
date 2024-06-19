import {View, StyleSheet, FlatList} from "react-native";
import {withAuthLayout} from "src/HOC/withAuthLayout";
import {ArticleCard} from "components/ArticleCard";
import {ArticleRepository} from "repositories/article";
import {useFetch} from "hooks/useFetch";
import {Text} from "react-native-paper";

export const HomeScreen = withAuthLayout(() => {
    const [{data}] = useFetch(ArticleRepository.index, {params: {}});
    return (
        <View>
            {data ? (
                <FlatList data={data.data} renderItem={({item, index})  => (
                    <ArticleCard
                        key={index}
                        style={styles.article}
                        article={{
                            ...item,
                            favorite: false
                        }}
                    />
                )}/>
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