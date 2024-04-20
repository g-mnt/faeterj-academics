import {ValidationReturn} from "src/helpers/types";
import {EmailRule, RequiredRule} from "src/helpers/constants";

export const validateRequired = (value: string ): ValidationReturn => {
    let result: ValidationReturn = {
        rule: RequiredRule,
        approved:true
    }

    if((!value || value.trim().length === 0)){
        result.approved = false
    }

    return result
}
export const validateEmail = (value: string, required = false): ValidationReturn => {
    if(required && !validateRequired(value).approved){
        return {
            rule: RequiredRule,
            approved:false
        }
    }

    if(!value.toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    ) {
        return {
            rule: EmailRule,
            approved: false,
        }
    }

    return {
        rule: EmailRule,
        approved: true
    }
}