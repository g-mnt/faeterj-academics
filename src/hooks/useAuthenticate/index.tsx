import {useUserStore} from "src/store/user";
import {User} from "types/models/user";
import {storeToken} from "src/services/storage";

export function useAuthenticate(){
    const {setUser} = useUserStore();

    const authenticate = (user: User, token: string) => {
       setUser(user);
       storeToken(token).catch(() => {});
    }

    return {authenticate}
}
