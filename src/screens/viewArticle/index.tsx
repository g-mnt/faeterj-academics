import React, { useState, type ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import { type ViewArticleScreenProps } from './types'
import { Button, IconButton, Text, useTheme } from 'react-native-paper'
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
import { Dialog } from 'src/components/Dialog'

export const ViewArticleScreen = withAuthLayout(({ route }: ViewArticleScreenProps): ReactNode => {
  const [user] = useUserStore((state) => [state.user])
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const [removeConfirmation, setRemoveConfirmation] = useState(false)
  const [approveConfirmation, setApproveConfirmation] = useState(false)
  const [rejectConfirmation, setRejectConfirmation] = useState(false)
  const { goBack } = useNavigation<ApplicationStackScreenProps>()
  const { successToast, errorToast } = useToast()
  const [, fetchUpdate] = useFetch(ArticleRepository.update)
  const [, fetchDelete] = useFetch(ArticleRepository.delete)
  const { colors } = useTheme()
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
    if (status === ArticleStatuses.Approved) {
      setApproveConfirmation(false)
    }

    if (status === ArticleStatuses.Rejected) {
      setRejectConfirmation(false)
    }

    if (error === null && data !== null) {
      successToast(data.message)
      goBack()
    }
  }

  async function handleDelete (): Promise<void> {
    const { data, error } = await fetchDelete(article)
    setRemoveConfirmation(false)
    if (error === null && data !== null) {
      successToast(data.message)
      goBack()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Dialog
        visible={removeConfirmation}
        description='Ao confirmar o artigo será removido permanentemente'
        onDismiss={() => { setRemoveConfirmation(false) }}
        onCancelPress={() => { setRemoveConfirmation(false) }}
        onConfirmationPress={handleDelete}
      />

      <Dialog
        visible={approveConfirmation}
        description='Ao confirmar o artigo ficará público para todos os alunos.'
        onDismiss={() => { setApproveConfirmation(false) }}
        onCancelPress={() => { setApproveConfirmation(false) }}
        onConfirmationPress={() => { handleStatus(ArticleStatuses.Approved).catch(() => {}) }}
      />

      <Dialog
        visible={rejectConfirmation}
        description='Ao confirmar o artigo não será publicado para os alunos.'
        onDismiss={() => { setRejectConfirmation(false) }}
        onCancelPress={() => { setRejectConfirmation(false) }}
        onConfirmationPress={() => { handleStatus(ArticleStatuses.Rejected).catch(() => {}) }}
      />

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
      {article.status === ArticleStatuses.Pending && user?.role === UserRole.Student
        ? (
          <View style={styles.approvalContainer}>
            <Button
              style={styles.approvalButtons}
              mode="outlined"
              onPress={() => { setRejectConfirmation(true) }}
            >
              Rejeitar
            </Button>
            <Button
              style={styles.approvalButtons}
              mode="contained"
              onPress={() => { setApproveConfirmation(true) }}
              textColor='white'
            >
              Aprovar
            </Button>
          </View>
          )
        : null}

      {user?.role === UserRole.Professor || user?.id !== article.author.id
        ? (
          <View style={styles.approvalContainer}>
            <Button
              style={styles.approvalButtons}
              buttonColor={colors.error}
              textColor="white"
              mode="outlined"
              onPress={() => { setRemoveConfirmation(true) }}
            >
              Deletar
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
    paddingTop: 20
  },
  approvalButtons: {
    flex: 1
  }
})
