class UI {
    constructor() {
        this.profileContentDiv = document.querySelector("#profileContentDiv");
        this.githubNameInput = document.querySelector("#githubname");
        this.tableContent = document.querySelector("#tableContent");
        this.searchedUserList = document.querySelector("#searchedUserList");
        this.isShowRepo = true;
        this.currentRepos = []; // Repolar burada tutulacak
    }

    addSearchedUserToUI(username) {
        if (Storagex.checkUser(username)) {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = username;
            this.searchedUserList.appendChild(li);
        }
    }

    addUserProfileToUI(user) {
        this.profileContentDiv.innerHTML = `
            <div class="col-sm-12 col-md-4 col-lg-4">
                <div id="profileDiv">
                    <img class="avatar mb-3" id="profilId" src="${user.avatar_url}" width="200" height="200">
                    <hr style="border: 1px solid dark; width:200px">
                    <span>${user.login}</span>
                </div>
            </div>
            <div class="col-sm-12 col-md-8 col-lg-8">
                <div id="badgeDiv" class="mt-2">
                    <button type="button" class="btn btn-danger">
                        Takipçi <span class="badge badge-dark">${user.followers}</span>
                    </button>
                    <button type="button" class="btn btn-warning">
                        Takip Edilen <span class="badge badge-dark">${user.following}</span>
                    </button>
                    <button type="button" class="btn btn-secondary">
                        Repolar <span class="badge badge-dark">${user.public_repos}</span>
                    </button>
                </div>
                <div id="infoDiv" class="mt-3">
                    <div class="info">
                        <img src="images/images (1).png" width="40" height="40">
                        <span>${user.company || ""}</span>
                    </div>
                    <div class="info">
                        <img src="images/images (3).png" width="40" height="40">
                        <span>${user.location || ""}</span>
                    </div>
                    <div class="info">
                        <img src="images/images (2).png" width="40" height="40">
                        <span>${user.email || ""}</span>
                    </div>
                    <div class="info">
                        <a id="showRepo" href="#">Repoları Göster</a>
                    </div>
                </div>
            </div>
        `;
    }
    showRepos(repos) {
        if (this.isShowRepo) {
            this.tableContent.innerHTML = "";
            let sayac = 1;
            repos.forEach(repo => {
                this.tableContent.innerHTML += `
                    <tr>
                        <th scope="row">${sayac}</th>
                        <td>${repo.name}</td>
                        <td>${repo.created_at}</td>
                    </tr>
                `;
                sayac++;
            });
            this.isShowRepo = false;
        } else {
            this.tableContent.innerHTML = "";
            this.isShowRepo = true;
        }

        const link = document.querySelector("#showRepo");
        if (link) {
            link.textContent = this.isShowRepo ? "Repoları Göster" : "Repoları Kapat";
        }
    }

    clearInput() {
        this.githubNameInput.value = "";
        this.profileContentDiv.innerHTML = "";
        this.tableContent.innerHTML = "";
    }
    clearAllSearchedUsersFromUI() {
        this.searchedUserList.innerHTML = "";
    }
    
}

