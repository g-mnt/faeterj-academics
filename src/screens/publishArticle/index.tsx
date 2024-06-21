import React, { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import { withAuthLayout } from 'src/HOC/withAuthLayout'
import * as DocumentPicker from 'expo-document-picker'
export const PublishArticleScreen = withAuthLayout(() => {
  const [form, setForm] = useState({
    title: '',
    description: ''
  })

  async function handlePickFile (): Promise<void> {
    const result = await DocumentPicker.getDocumentAsync()
    if (result.output !== null) {
      console.log(result)
    }
  }

  return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.inputLabel}>Titulo</Text>
                <TextInput
                    style={styles.input}
                    theme={{ roundness: 20 }}
                    mode="outlined"
                    testID="email-input"
                    placeholder="Titulo"
                    value={form.title}
                    onChangeText={(value) => {
                      setForm((form) => ({ ...form, title: value }))
                    }}
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
                    value={form.description}
                    onChangeText={(value) => {
                      setForm((form) => ({ ...form, description: value }))
                    }}
                    onBlur={() => { }}
                    // left={<TextInput.Icon icon="email-outline" />}
                />
                <Text style={styles.inputLabel}>PDF Upload</Text>
                <Button onPress={handlePickFile} style={{ backgroundColor: 'red', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Upload PDF</Text>
                </Button>
            </View>
            <Button
                mode="contained"
                onPress={() => { }}>
                Publicar Artigo
            </Button>
        </View>
  )
})

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  inputLabel: {
    fontSize: 20,
    fontWeight: 600,
    marginBottom: 10
  },
  input: {
    marginBottom: 25
  }
})
