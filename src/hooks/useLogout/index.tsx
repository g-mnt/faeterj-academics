import {removeToken} from "src/services/storage";
import {useUserStore} from "src/store/user";

export const useLogout = () => {
    const {unsetUser} = useUserStore();
    const logout = () => {
        removeToken().catch(() => {});
        unsetUser();
    }
    return {
        logout
    }
}