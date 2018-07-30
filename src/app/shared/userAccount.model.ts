export class UserAccount {
    constructor(public balance: number, public currency: string,
        public account_id: string,
        public account_name: string,
        public account_type: string,
        public balance_date: string,
        public bic_swift: string,
        public iban: string,
        public internal_id: string,
        public product: string,
        public sort_code: any) {}
    }
