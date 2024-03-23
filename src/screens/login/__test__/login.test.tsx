import {fireEvent, render} from "@testing-library/react-native";
import {LoginScreen} from "screens/login";
import {mockNavigateFn} from "mocks/navigationMock";

describe('Login screen', () => {
    it('should render email input', () => {
        const {getByPlaceholderText} = render(<LoginScreen />);
        getByPlaceholderText('Email');
    });

    it('should render password input', () => {
        const {getByPlaceholderText} = render(<LoginScreen />);
        getByPlaceholderText('Senha');
    });

    it('should render login button', () => {
        const {getByText} = render(<LoginScreen />);
        getByText('Login');
    })

    it('should render forgot password button', () => {
        const {getByText} = render(<LoginScreen />);
        getByText('Esqueci minha senha');
    })

    it('should render email error', () => {
        const {getByText, getByPlaceholderText} = render(<LoginScreen />);
        const loginButton = getByText('Login');
        const emailInput = getByPlaceholderText('Email');

        fireEvent.press(loginButton);
        getByText('Email é obrigatório');

        fireEvent.changeText(emailInput, 'email');
        fireEvent.press(loginButton);
        getByText('Email inválido');

        fireEvent.changeText(emailInput, 'email@email');
        fireEvent.press(loginButton);
        getByText('Email inválido');
    })

    it('should login the user', () => {
        const {getByPlaceholderText, getByText} = render(<LoginScreen />)
        const emailInput = getByPlaceholderText('Email');
        const passwordInput = getByPlaceholderText('Password');

        fireEvent(emailInput, 'valid@email.com');
        fireEvent(passwordInput, 'validPassword');

        const loginButton= getByText('Login');
        fireEvent.press(loginButton);
        expect(mockNavigateFn).toHaveBeenCalledWith("Home");
    })
});