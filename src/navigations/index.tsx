import React from "react";
import {GuestNavigation} from "navigations/guest";
import {useUserStore} from "src/store/user";
import {ApplicationNavigation} from "navigations/application";

export const Navigations : React.FC = () => {
    const {user} = useUserStore();
    return !user ? <GuestNavigation /> : <ApplicationNavigation />;
}