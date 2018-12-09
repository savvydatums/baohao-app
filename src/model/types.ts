export type TLoggedInUser = {
    result: { token: string, userId: number, status: string },
    error: null
}

export type TRegistered = {
    result: { userId: number },
    error: null
}

export type TGroupResigered = {
    result: { ticket_number: string },
    error: null
}