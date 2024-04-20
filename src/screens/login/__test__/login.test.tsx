import {fireEvent, render, waitFor} from "@testing-library/react-native";
import {LoginScreen} from "screens/login";
import {mockNavigateFn} from "mocks/navigationMock";

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

    it('should render email error', async () => {
        const {getByText, getByTestId} = render(<LoginScreen />);
        const emailInput = getByTestId('email-input');

        fireEvent(emailInput, "blur");

        await waitFor(() => {
            getByText('Email é obrigatório!');
        })

        // fireEvent.changeText(emailInput, 'email');
        // fireEvent(emailInput, "blur");
        //
        // getByText('Email inválido!');
        //
        // fireEvent.changeText(emailInput, 'email@email.');
        // fireEvent(emailInput, "blur");
        //
        // getByText('Email inválido!');
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