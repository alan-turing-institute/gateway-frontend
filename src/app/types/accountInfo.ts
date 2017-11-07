export class AccountInfo {
    userTally: number;
    userCredit: number;
    organisationCredit: number;
    organisationTally: number;

    constructor (newUserTally:number, newUserCredit:number, newOrganisationTally:number, newOrganisationCredit: number) {
        this.userTally = newUserTally;
        this.userCredit = newUserCredit;
        this.organisationTally = newOrganisationTally;
        this.organisationCredit = newOrganisationCredit;
    }
}
