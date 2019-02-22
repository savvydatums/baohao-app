export type TLoggedInUser = {
    user: {
        status: string, // show pending, approved or processing
    },
    cookie: string,
    status: string,
    error?: string|null,
}

// ignore user info for now.
// {
//     "status": "ok",
//     "cookie": "testyuser_editor2|1550548435|S5yFfbHpv67XmLK1ppi5NdH5OxDVwc8XG4xjJVYMFMv|7f91426d37d9967b2ecbff22438ccf6c48420fad3a7936ab0901b7478487519a",
//     "cookie_name": "wordpress_logged_in_47d09ac172f64910fd18721af47ca0ff",
// }

export type TRegistered = {
    result: { userId: number, emailId: number },
    error: null
}

export type TGroupRegistered = {
    result: { ticket_number: string, emailId: number },
    error: null
}

export type TResendEmail = {
    result: { email_status: string },
    error: null
}

export type TInsights = {
    result : {
        medical: object[],
        savingAndLife: object[],
        investment: object[],
        general: object[]
    },
    error: null
}