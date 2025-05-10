class Storagex {
    static key = "searchedUsers";

    static getSearchedUsersFromStorage() {
        let users = localStorage.getItem(this.key);
        return users ? JSON.parse(users) : [];
    }

    static checkUser(username) {
        const users = this.getSearchedUsersFromStorage();
        return !users.includes(username);
    }

    static addSearchedUserToStorage(username) {
        const users = this.getSearchedUsersFromStorage();
        if (this.checkUser(username)) {
            users.push(username.trim());
            localStorage.setItem(this.key, JSON.stringify(users));
        }
    }
    clearAllSearchedUsersFromUI() {
        this.searchedUserList.innerHTML = "";
    }

    static clearAllSearchedUsersFromStorage() {
        localStorage.removeItem(this.key);
    }
   
    
}
