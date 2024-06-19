import {View, StyleSheet, FlatList} from "react-native";
import {withAuthLayout} from "src/HOC/withAuthLayout";
import {ArticleCard} from "components/ArticleCard";

export const HomeScreen = withAuthLayout(() => {
    const author = {
        name: 'Miguel',
        role: 'Professor'
    };

    const articles = [{
        title: 'Lorem Ipsum',
        description: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
        author,
        favorite: true,
    },
        {
            title: 'Lorem Ipsum',
            description: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            author,
            favorite: true,
        },
        {
            title: 'Lorem Ipsum',
            description: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            author,
            favorite: true,
        },
        {
            title: 'Lorem Ipsum',
            description: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            author,
            favorite: false,
        },
        {
            title: 'Lorem Ipsum',
            description: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            author,
            favorite: false
        },
        {
            title: 'Lorem Ipsum',
            description: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            author,
            favorite: false
        },
        {
            title: 'Lorem Ipsum',
            description: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            author,
            favorite: false
        },
        {
            title: 'Lorem Ipsum',
            description: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
            author,
            favorite: true
        },
    ]
    return (
        <View>
            <FlatList data={articles} renderItem={({item, index})  => (
                <ArticleCard
                    key={index}
                    style={styles.article}
                    article={item}
                />
            )}/>
        </View>
    )
});

const styles = StyleSheet.create({
    article: {
        marginBottom: 20,
        marginHorizontal: 2,
    }
});