import React from 'react';
import { View } from 'react-native';
import {Button, Icon, Text, TextInput} from "react-native-paper";
import {withGuestLayout} from "src/HOC/withGuestLayout";
import {Formik} from "formik";
import {LoginForm} from "screens/login/types";
import * as Yup from "yup"
import {ErrorMessage} from "components/ErrorMessage";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido!').required('Email obrigatório!'),
    password: Yup.string().required('Senha obrigatória!')
})

export const LoginScreen = withGuestLayout(() => {
    const initialForm: LoginForm = {
        email: "",
        password: ""
    }
    const handleSubmit = (values: LoginForm) => {
        console.log(values)
    }
    return (
        <View style={{flex: 1, justifyContent:"center", width:"100%", maxWidth:520 }}>
            <View style={{ flex:2, justifyContent: 'center', alignItems: 'center'}}>
                <Icon size={120} source={require("@assets/app_icon.jpg")} />
            </View>

            <View style={{flex:2}}>
                <Formik validationSchema={LoginSchema} validateOnBlur validateOnMount={false} initialValues={initialForm} onSubmit={handleSubmit} >
                    {({
                        handleSubmit,
                        handleBlur,
                        handleChange,
                        errors,
                        touched
                    }) => (
                        <View style={{flex:1}}>
                            <View style={{flex:2}}>
                                <TextInput
                                    style={{marginBottom: 10}}
                                    theme={{roundness: 20}}
                                    mode="outlined"
                                    label="Email"
                                    testID="email-input"
                                    placeholder="Email"
                                    onChangeText={handleChange("email")}
                                    onBlur={handleBlur("email")}
                                    left={<TextInput.Icon icon="email-outline" />}
                                />
                                {errors.email && touched.email ? (
                                    <ErrorMessage message={errors.email} style={{marginBottom: 8}} />
                                ) : null}
                                <TextInput
                                    style={{marginBottom: 10}}
                                    theme={{roundness: 20}}
                                    mode="outlined"
                                    label="Senha"
                                    testID="senha-input"
                                    placeholder="Senha"
                                    secureTextEntry={true}
                                    onChangeText={handleChange("password")}
                                    onBlur={handleBlur("password")}
                                    right={<TextInput.Icon icon="eye" />}
                                    left={<TextInput.Icon icon="lock-outline" />}
                                />
                                {errors.password && touched.password ? (
                                    <ErrorMessage message={errors.password} />
                                ) : null}
                            </View>
                            <Button mode="contained" onPress={() => handleSubmit()}>
                                Login
                            </Button>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
});