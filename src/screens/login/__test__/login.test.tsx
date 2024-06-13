import {fireEvent, render, waitFor} from "@testing-library/react-native";
import {LoginScreen} from "screens/login";
import {mockNavigateFn} from "mocks/navigationMock";
import {mockLoginFunction, mockLoginUser, mockToken} from "mocks/authRepositoryMock";
import * as authenticate from "hooks/useAuthenticate";
import {AxiosError} from "axios";
jest.useFakeTimers();

const form = {
    email: "gabriel@faeterj.com",
    password: "password"
}

describe('Login screen', () => {
    it('should render email input', () => {
        const {getByTestId} = render(<LoginScreen />);
        getByTestId('email-input');
    });

    it('should render password input', () => {
        const {getByTestId} = render(<LoginScreen />);
        getByTestId('password-input');
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

    it('should render email invalid error', () => {
        const {getByText, getByTestId} = render(<LoginScreen/>);
        const emailInput = getByTestId('email-input');

        fireEvent.changeText(emailInput, 'email');
        fireEvent(emailInput, "blur");
        getByText('Email inválido!');

        fireEvent.changeText(emailInput, 'email@email.');
        fireEvent(emailInput, "blur");
        getByText('Email inválido!');
    })

    it('should render password errors', () => {
        const {getByText, getByTestId} = render(<LoginScreen/>);
        const passwordInput = getByTestId('password-input');

        fireEvent(passwordInput, "blur");
        getByText('Senha obrigatória!');

        fireEvent.changeText(passwordInput, "   ")
        fireEvent(passwordInput, "blur");
        getByText('Senha obrigatória!');
    })

    it('should call login endpoint with login form', async () => {
        performLogin()

        await waitFor(() => {
            expect(mockLoginFunction).toHaveBeenCalledWith({...form});
        })
    });

    it('should call authenticate with login response data', async () => {
        const mockAuthenticateFn = jest.fn();
        jest.spyOn(authenticate, "useAuthenticate").mockReturnValue({
            authenticate: mockAuthenticateFn
        })

        performLogin()

        await waitFor(() => {
            expect(mockAuthenticateFn).toHaveBeenCalledWith({...mockLoginUser}, mockToken);
        })
    });

    it('should not call authenticate if login fails', async () => {
        const mockAuthenticateFn = jest.fn();
        mockLoginFunction.mockImplementation( () => {throw new AxiosError("something went wrong");});
        jest.spyOn(authenticate, "useAuthenticate").mockReturnValue({
            authenticate: mockAuthenticateFn
        })

        performLogin()

        await waitFor(() => {
            expect(mockAuthenticateFn).not.toHaveBeenCalled();
        })
    });
});

function performLogin(){
    const {getByTestId, getByText} = render(<LoginScreen />)

    fireEvent.changeText(getByTestId('email-input'), form.email);
    fireEvent.changeText(getByTestId('password-input'), form.password);

    const loginButton= getByText('Login');
    fireEvent.press(loginButton);
}
