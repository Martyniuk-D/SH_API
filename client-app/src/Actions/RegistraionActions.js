export const onRegistration = (list) => {
    return {
        type: "REGISTRATION",
        payload: list
    }
}

export const onLogIn = (user) => {
    return {
        type: "LOGIN",
        payload: user
    }
}

export const getAllUsers = (list) => {
    return {
        type: "GET",
        payload: list
    }
}