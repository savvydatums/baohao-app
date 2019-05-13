export type TLoginRequestPayload = {
    registration_id: string;
    password: string;
	seconds: string;
	username?: string;
}

export type TLoginResponse = {
    status: string;
    error?: string;

    cookie?: string;
	cookie_name?: string;
    user?: {
        logged_in_status: string; // one of those PENDING | PROCESSING | DENY | APPROVED
    }
}

export type TRegisteredResponse = {
	code: number;
	message: string;
}

export type TFormResponse = {
	is_valid: boolean;
	confirmation_message:string;
}

export type TGroupRegistered = {
    result: { ticket_number: string, emailId: number },
    error: null
}

export type TResendEmail = {
    result: { email_status: string },
    error: null
}

export type TInsightPost = {
	authorId: string;
	authorName: string;
	categories: string[];
	categorySummary?: object;
	content: string;
	likes: number;
	source: string;
	timestamp: string;
	_id: string;
}

export type TInsightSummary = {
	key: string;
	amount: number;
	story?: TInsightPost[];
}