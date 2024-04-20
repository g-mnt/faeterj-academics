import { EmailRule, RequiredRule} from "src/helpers/constants";

export type ValidationRules = typeof EmailRule | typeof RequiredRule;
export type ValidationReturn = {
    rule: ValidationRules,
    approved: boolean,
}
