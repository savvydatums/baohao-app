export type TLoggedInUser = {
    result: { token: string, userId: number, status: string },
    error: null
}

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