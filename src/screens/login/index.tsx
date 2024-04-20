import React, {useState} from 'react';
import {View} from 'react-native';
import {Button, Icon, TextInput} from "react-native-paper";
import {withGuestLayout} from "src/HOC/withGuestLayout";
import {LoginErrors, LoginForm} from "screens/login/types";
import {ErrorMessage} from "components/ErrorMessage";
import {EMAIL_INVALID_ERROR, EMAIL_REQUIRED_ERROR, PASSWORD_REQUIRED_ERROR} from "screens/login/constants";
import {validateEmail, validateRequired} from "src/helpers";
import {RequiredRule} from "src/helpers/constants";

const initialLoginForm: LoginForm = {
    email: "",
    password: ""
}

const initialLoginErrors: LoginErrors = {
    email: EMAIL_REQUIRED_ERROR,
    touchedEmail: false,
    password: PASSWORD_REQUIRED_ERROR,
    touchedPassword: false
}

export const LoginScreen = withGuestLayout(() => {
    const [form, setForm] = useState<LoginForm>(initialLoginForm)
    const [errors, setErrors] = useState<LoginErrors>(initialLoginErrors)
    const handleEmailChange = (value: string) => {
        const validation = validateEmail(value, true)

        setErrors((errors) => ({
            ...errors,
            email:  validation.approved ? false : validation.rule === RequiredRule ?
                    EMAIL_REQUIRED_ERROR :
                    EMAIL_INVALID_ERROR,
            touchedEmail: false,
        }))

        setForm((form) => ({
            ...form,
            email: value
        }))
    }

    const handlePasswordChange = (value: string) => {
        const validation = validateRequired(value)

        setErrors((errors) => ({
            ...errors,
            password:  validation.approved ? false : PASSWORD_REQUIRED_ERROR,
            touchedPassword: false,
        }))

        setForm((form) => ({
            ...form,
            password: value
        }))
    }

    const handleBlur = (type: keyof LoginForm) => {
        setErrors((errors) => ({
            ...errors,
            touchedPassword: type === "password" ? true : errors.touchedPassword,
            touchedEmail: type === "email" ? true : errors.touchedEmail
        }))
    }

    const handleSubmit = () => {
        console.log(form)
    }
    return (
        <View style={{flex: 1, justifyContent:"center", width:"100%", maxWidth:520 }}>
            <View style={{ flex:2, justifyContent: 'center', alignItems: 'center'}}>
                <Icon size={120} source={require("@assets/app_icon.jpg")} />
            </View>

            <View style={{flex:2}}>

                <View style={{flex:1}}>
                    <View style={{flex:2}}>
                        <TextInput
                            style={{marginBottom: 10}}
                            theme={{roundness: 20}}
                            mode="outlined"
                            label="Email"
                            testID="email-input"
                            placeholder="Email"
                            value={form.email}
                            onChangeText={handleEmailChange}
                            onBlur={() => handleBlur("email")}
                            left={<TextInput.Icon icon="email-outline" />}
                        />
                        {errors.email && errors.touchedEmail ? (
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
                            value={form.password}
                            onChangeText={handlePasswordChange}
                            onBlur={() => handleBlur("password")}
                            right={<TextInput.Icon icon="eye" />}
                            left={<TextInput.Icon icon="lock-outline" />}
                        />
                        {errors.password && errors.touchedPassword ? (
                            <ErrorMessage message={errors.password} />
                        ) : null}
                        <Button
                            style={{alignSelf: "center"}}
                            labelStyle={{fontSize: 16, fontWeight: "normal"}}
                            rippleColor="transparent"
                            mode="text"
                            onPress={() => {}}
                        >
                            Esqueci minha senha
                        </Button>
                    </View>
                    <Button mode="contained" disabled={!!errors.email || !!errors.password} onPress={handleSubmit}>
                        Login
                    </Button>
                </View>
            </View>
        </View>
    )
});