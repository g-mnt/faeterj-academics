import {fireEvent, render} from "@testing-library/react-native";
import {LoginScreen} from "screens/login";
import {mockNavigateFn} from "mocks/navigationMock";
jest.useFakeTimers();

describe('Login screen', () => {
    it('should render email input', () => {
        const {getByTestId, debug} = render(<LoginScreen />);
        getByTestId('email-input');
    });

    it('should render password input', () => {
        const {getByTestId} = render(<LoginScreen />);
        getByTestId('senha-input');
    });

    it('should render login button', () => {
        const {getByText} = render(<LoginScreen />);
        getByText('Login');
    })

    it('should render forgot password button', () => {
        const {getByText} = render(<LoginScreen />);
        getByText('Esqueci minha senha');
    })

    it('should navigate to forgot password screen', () => {
        const {getByText} = render(<LoginScreen />);
        const forgotPasswordButton = getByText('Esqueci minha senha');
        fireEvent.press(forgotPasswordButton)

        expect(mockNavigateFn).toHaveBeenCalledWith("ForgotPassword");
    });

    it('should render email required error', () => {
        const {getByText, getByTestId} = render(<LoginScreen/>);
        const emailInput = getByTestId('email-input');

        fireEvent(emailInput, "blur");
        getByText('Email obrigatório!');

        fireEvent.changeText(emailInput, 'email');
        fireEvent(emailInput, "blur");
        getByText('Email inválido!');

        fireEvent.changeText(emailInput, 'email@email.');
        fireEvent(emailInput, "blur");
        getByText('Email inválido!');
    })

    it('should login the user', () => {
        const {getByTestId, getByText} = render(<LoginScreen />)
        const emailInput = getByTestId('email-input');
        const passwordInput = getByTestId('password-input');

        fireEvent(emailInput, 'valid@email.com');
        fireEvent(passwordInput, 'validPassword');

        const loginButton= getByText('Login');
        fireEvent.press(loginButton);
        expect(mockNavigateFn).toHaveBeenCalledWith("Home");
    })
});