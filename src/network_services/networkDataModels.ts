
export type PlansDataModel = {
    invested_amount?: number,
    id?: string,
    created_at?: string,
    maturity_date?: string,
    plan_name?: string,
    target_amount?: number,
    total_returns?: number,
    user_id?: string
}

export type UserLoginModel = {
    id?: string,
    email_address?: string,
    first_name?: string,
    last_name?: string,
    username?: string,
    total_balance?: number,
    total_returns?: number,
    token?: string
}

export type UserSessionModel = {
    id?: string,
    email_address?: string,
    first_name?: string,
    last_name?: string,
    username?: string,
    iat?: number,
    exp?: number,
    total_balance?: number,
    total_returns?: number,
}

export type QuotesModel = {
    quote?: string,
    author?: string
}

export type RatesModel = {
    buy_rate?: number,
    sell_rate?: number
}