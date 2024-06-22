import React, { useState } from 'react'
import { KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Button, Icon, Text, TextInput, useTheme } from 'react-native-paper'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import * as DocumentPicker from 'expo-document-picker'
export const PublishArticleScreen = withAuthLayout(() => {
  const {colors} = useTheme()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [uploadedFile, setUploadedFile] = useState<DocumentPicker.DocumentPickerAsset | null>(null)

  async function handlePickFile (): Promise<void> {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' })
    if (!result.canceled) {
      setUploadedFile(result.assets[0])
    }
  }

  return (
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={styles.mainContainer}
            keyboardShouldPersistTaps='always'
            automaticallyAdjustKeyboardInsets
          >
            <View style={styles.formUpload}>
                <Text style={styles.inputLabel}>Titulo</Text>
                <TextInput
                    style={styles.input}
                    theme={{ roundness: 20 }}
                    mode="outlined"
                    testID="email-input"
                    placeholder="Titulo"
                    value={title}
                    onChangeText={setTitle}
                    onBlur={() => { }}
                    // left={<TextInput.Icon icon="email-outline" />}
                />
                <Text style={styles.inputLabel}>Descrição</Text>
                <TextInput
                    style={styles.input}
                    theme={{ roundness: 20 }}
                    mode="outlined"
                    testID="email-input"
                    placeholder="Descrição"
                    value={description}
                    onChangeText={setDescription}
                    onBlur={() => { }}
                    // left={<TextInput.Icon icon="email-outline" />}
                />
                <Text style={styles.inputLabel}>PDF Upload</Text>
                <Pressable
                    onPress={() => { handlePickFile().catch(() => {}) }}
                    style={styles.uploadButton}>
                    <Icon source='file-upload-outline' size={100} color={colors.primary} />
                </Pressable>
                {uploadedFile !== null && (
                  <View style={styles.uploadedFileContainer}>
                    <Text style={{ color: colors.error }} >{uploadedFile.name}</Text>
                    <Icon source='trash-can-outline' size={30} color={colors.error} />
                  </View>
                )}
            </View>
            <Button
                mode="contained"
                onPress={() => { }}>
                Publicar Artigo
            </Button>
          </ScrollView>
        </View>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'space-between'
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10
  },
  input: {
    marginBottom: 25
  },
  formUpload: {
    flex: 1,
    marginBottom: 20
  },
  uploadButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: 30,
    maxHeight: 250
  },
  uploadedFileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  }
})
