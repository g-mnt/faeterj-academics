import {validateEmail, validateRequired} from "src/helpers";
import {EmailRule, RequiredRule} from "src/helpers/constants";

describe("Helpers tests", () => {
    it("should validate required", () => {
        expect(validateRequired("")).toStrictEqual({
            rule: RequiredRule,
            approved: false,
        })

        expect(validateRequired("       ")).toStrictEqual({
            rule: RequiredRule,
            approved: false,
        })
    })

    expect(validateRequired("anything")).toStrictEqual({
        rule: RequiredRule,
        approved: true,
    })

    it("should validate email", () => {
        expect(validateEmail("", true)).toStrictEqual({
            rule: RequiredRule,
            approved: false,
        })

        expect(validateEmail("")).toStrictEqual({
            rule: EmailRule,
            approved: false,
        })

        expect(validateEmail("a")).toStrictEqual({
            rule: EmailRule,
            approved: false,
        })

        expect(validateEmail("email@email")).toStrictEqual({
            rule: EmailRule,
            approved: false,
        })

        expect(validateEmail("email@email.c")).toStrictEqual({
            rule: EmailRule,
            approved: false,
        })

        expect(validateEmail("email@email.com")).toStrictEqual({
            rule: EmailRule,
            approved: true,
        })
    })
})