const githubName = document.querySelector("#githubname");
const form = document.querySelector("#searchForm");
const clearButton = document.querySelector("#clearButton");
const clearAllButton = document.querySelector("#buttonTT");

const github = new Github();
const ui = new UI();

// Event listener'lar
runEventListeners();

function runEventListeners() {
    form.addEventListener("submit", search);
    clearButton.addEventListener("click", clearInput);
    clearAllButton.addEventListener("click", clearAllSearchedUsers);
    document.addEventListener("DOMContentLoaded", runPageLoaded);
    document.addEventListener("click", handleRepoToggle);
}

// Sayfa yüklendiğinde storage'dan kullanıcıları çek ve UI'ye ekle
function runPageLoaded() {
    const users = Storagex.getSearchedUserFromStorage();
    users.forEach(user => ui.addSearchedUserToUI(user));
}

// Arama formu temizle
function clearInput() {
    ui.clearInput();
}

// Kullanıcı araması yap
function search(e) {
    e.preventDefault();

    const username = githubName.value.trim();

    if (!username) {
        alert("Kullanıcı adı kısmını doldurunuz.");
        return;
    }

    github.getGithubData(username)
        .then(response => {
            ui.addSearchedUserToUI(username);
            Storagex.addSearchedUserToStorage(username);
            ui.addUserProfileToUI(response.user);
            ui.currentRepos = response.repo;
        })
        .catch(error => {
            console.log(error);
            alert("Kullanıcı bulunamadı!");
        });
}

// Repoları aç/kapat
function handleRepoToggle(e) {
    if (e.target && e.target.id === "showRepo") {
        e.preventDefault();
        ui.showRepos(ui.currentRepos);
    }
}

function clearAllSearchedUsers() {
    Storagex.clearAllSearchedUsersFromStorage();
    ui.searchedUserList.innerHTML = "";
}




