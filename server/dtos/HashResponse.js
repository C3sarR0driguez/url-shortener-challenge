
class HashResponse {
    constructor(url, hash, removeToken, createdAt, visits){
        this.url = url;
        this.hash = hash;
        this.removeToken = removeToken;
        this.createdAt = createdAt;
        this.visits = visits;
    }
}

module.exports = HashResponse;
