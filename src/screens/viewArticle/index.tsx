import React, { useState, type ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import { type ViewArticleScreenProps } from './types'
import { Button, IconButton, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { type ApplicationStackScreenProps } from 'src/navigations/types'
import Pdf from 'react-native-pdf'
import * as FileSystem from 'expo-file-system'
import * as IntentLauncher from 'expo-intent-launcher'
import { useToast } from 'src/hooks/useToast'
import { ArticleStatuses } from 'src/types/models/article'
import { useUserStore } from 'src/store/user'
import { UserRole } from 'src/types/models/user'
import { useFetch } from 'src/hooks/useFetch'
import { ArticleRepository } from 'src/repositories/article'

export const ViewArticleScreen = withAuthLayout(({ route }: ViewArticleScreenProps): ReactNode => {
  const [user] = useUserStore((state) => [state.user])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const { goBack } = useNavigation<ApplicationStackScreenProps>()
  const { successToast, errorToast } = useToast()
  const [, fetchUpdate] = useFetch(ArticleRepository.update)
  const article = route.params.article

  async function initiateDownload (): Promise<void> {
    try {
      const { uri } = await FileSystem.downloadAsync(article.document_url, FileSystem.documentDirectory + 'test.pdf')
      const cUri = await FileSystem.getContentUriAsync(uri)
      successToast('Download concluido')
      await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
        data: cUri,
        flags: 1
      })
    } catch (e) {
      console.log(e)
      errorToast('Falha no download')
    }
  }

  async function handleStatus (status: ArticleStatuses): Promise<void> {
    const { data, error } = await fetchUpdate({ id: article.id, status })
    if (error === null && data !== null) {
      console.log(data)
      successToast(data.message)
      goBack()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <IconButton icon="arrow-left" size={30} onPress={goBack} />
        <Text style={styles.articleTitle}>{article.title}</Text>
      </View>

      <View style={styles.controlContainer}>
        <Text style={styles.articlePage}>{`Page: ${currentPage}/${totalPages}`}</Text>
        <View style={styles.commandsContainer}>
          <IconButton icon={'tray-arrow-down'} iconColor='white' onPress={initiateDownload}/>
          <IconButton icon={article.favorite ? 'star' : 'star-outline'} iconColor={'white'} onPress={() => { console.log('favorite') }}/>
        </View>
      </View>
      <Pdf
        trustAllCerts={false}
        source={{ uri: article.document_url }}
        enableDoubleTapZoom
        onLoadComplete={(numberOfPages) => {
          setTotalPages(numberOfPages)
        }}
        onPageChanged={(page) => {
          setCurrentPage(page)
        }}
        style={{ flex: 1 }}
      />
      {article.status === ArticleStatuses.Pending && user?.role === UserRole.Professor
        ? (
          <View style={styles.approvalContainer}>
            <Button
              style={styles.approvalButtons}
              mode="outlined"
              onPress={() => { handleStatus(ArticleStatuses.Rejected).catch(() => {}) }}
            >
              <Text>Reject</Text>
            </Button>
            <Button
              style={styles.approvalButtons}
              mode="contained"
              onPress={() => { handleStatus(ArticleStatuses.Approved).catch(() => {}) }}
            >
              <Text style={styles.approveButtonText}>Approve</Text>
            </Button>
          </View>
          )
        : null}
    </View>
  )
})

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  articleTitle: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 20
  },
  articlePage: {
    textAlign: 'center',
    fontWeight: 700,
    fontSize: 16,
    color: 'white'
  },
  controlContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'darkgray'
  },
  commandsContainer: {
    flexDirection: 'row'
  },
  approvalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    columnGap: 5,
    paddingTop: 10
  },
  approvalButtons: {
    flex: 1
  },
  approveButtonText: {
    color: 'white'
  }
})
