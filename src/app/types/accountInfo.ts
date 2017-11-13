export class AccountInfo {
    userTally: number;
    userCredit: number;
    organisationCredit: number;
    organisationTally: number;

    constructor (newUserTally:number=null, newUserCredit:number=null, newOrganisationTally:number=null, newOrganisationCredit: number=null) {
        this.userTally = newUserTally;
        this.userCredit = newUserCredit;
        this.organisationTally = newOrganisationTally;
        this.organisationCredit = newOrganisationCredit;
    }
}
