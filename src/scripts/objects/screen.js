const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                         <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                         <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😓'}</h1>
                                             <p>${user.bio ?? 'Não possui nome cadastrado 😓'}</p>
                                             <p>
                                             <span>Seguidores: ${user.followers}<span>
                                             <br>
                                             <span>Seguindo: ${user.following}<span>
                                            </div>
                                        </div>`
        let repositoriesItens = ''
        user.repositories.forEach(repo => {
            repositoriesItens += `<li>
                              <a href="${repo.html_url}" target="_blank">
                               <strong>${repo.name}</strong>
                              <div class="repo-info-line">
                               <span class="emoji-box">🧑‍💻${repo.language ?? 'N/D'}</span>
                               <span class="emoji-box">⭐${repo.stargazers_count}</span>
                               <span class="emoji-box">👀${repo.watchers_count}</span>
                               <span class="emoji-box">🍴${repo.forks_count}</span>
                             </div>
                             </a>
                             </li>`
        })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                            <h2>Repositórios</h2>
                                            <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItems = ''
        user.events.forEach(event => {
            let message = 'Sem mensagem de commit'
            if (event.type === 'PushEvent') {
                message = event.payload.commits?.[0]?.message || message
            }

            eventsItems += `<li>
                             <strong>${event.repo.name}</strong> –  ${message}
                            </li>`
        })

        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                            <h2>Eventos</h2>
                                            <br>
                                            <ul>${eventsItems}</ul>
                                            </div>`
        }
    },

    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }