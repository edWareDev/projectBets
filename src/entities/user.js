export class User {
    constructor({ username, password, saldo, matchs }) {
        this.username = username
        this.password = password
        this.saldo = saldo || 0
        this.predictionsCorrects = 0
        this.predictionsIncorrects = 0
        this.matchs = matchs || {}
    }
}