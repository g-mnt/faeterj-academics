import {useUserStore} from "src/store/user";
import {User} from "types/models/user";
import {storeToken} from "src/services/storage";
import {setApiToken} from "src/services/api";

export function useAuthenticate(){
    const {setUser} = useUserStore();

    const authenticate = (user: User, token: string) => {
        setUser(user);
        setApiToken(token);
        storeToken(token).catch(() => {});
    }

    return {authenticate}
}
