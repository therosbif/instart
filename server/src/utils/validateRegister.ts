import { UserPassInput } from "../resolvers/UserPassInput";

export const validateRegister = (options: UserPassInput) => {
  //email
  if (!options.email.includes("@")) {
    return [
      {
        field: "email",
        message: "invalid email",
      },
    ];
  }
  //username
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
  //password
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
