async function fetchRepositories() {
    const username = "helllo-there";
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
    const repos = await response.json();

    const repoGrid = document.getElementById("repo-grid");
    repoGrid.innerHTML = ""; // Clear previous content

    repos.forEach(repo => {
        const repoBox = document.createElement("div");
        repoBox.className = "repo-box";
        
        repoBox.innerHTML = `
            <a href="${repo.html_url}" target="_blank" style="text-decoration:none; color:white;">
                <h3>${repo.name}</h3>
                <p>${repo.description || "No description available"}</p>
                <img src="https://img.shields.io/github/stars/${username}/${repo.name}?style=social" alt="Stars">
                <img src="https://img.shields.io/github/languages/top/${username}/${repo.name}" alt="Language">
            </a>
        `;

        repoGrid.appendChild(repoBox);
    });
}

fetchRepositories();
