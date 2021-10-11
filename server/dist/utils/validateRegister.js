"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegister = void 0;
const validateRegister = (options) => {
    if (!options.email.includes("@")) {
        return [
            {
                field: "email",
                message: "invalid email",
            },
        ];
    }
    if (options.username.length < 3) {
        return [
            {
                field: "username",
                message: "username must be at least 3 characters long",
            },
        ];
    }
    if (options.username.includes("@")) {
        return [
            {
                field: "username",
                message: "username can't contain '@'",
            },
        ];
    }
    if (options.password.length < 3) {
        return [
            {
                field: "password",
                message: "password must be at least 3 characters long",
            },
        ];
    }
    return null;
};
exports.validateRegister = validateRegister;
//# sourceMappingURL=validateRegister.js.map