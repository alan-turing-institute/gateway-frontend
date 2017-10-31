export class AccountInfo {
    id: string;
    ran: string;
    remain: string;
    organization: string;
    constructor (newId:string, newRan:string, newRemain:string, newOrg: string) {
        this.id = newId;
        this.ran = newRan;
        this.remain = newRemain;
        this.organization = newOrg;
    }
}
