export class Command {
    membersOnCooldown;
    constructor(logger) {
        this.logger = logger;
        this.membersOnCooldown = new Set();
    }    
    addToCooldown(memberID, commandTimeout){
        this.membersOnCooldown.add(memberID);
        setTimeout(function(){
            this.membersOnCooldown.delete(memberID);
        }, commandTimeout);
    }
}
