async function fetchRepositories() {
    const username = "helllo-there";
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=4`);
    const repos = await response.json();

    const repoGrid = document.getElementById("repo-grid");
    repoGrid.innerHTML = ""; // Clear previous content

    repos.forEach((repo, index) => {
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

        // Mousemove event for inverse tilt effect
        repoBox.addEventListener("mousemove", (e) => {
            const rect = repoBox.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Reverse the tilt direction
            const rotateX = ((centerY - y) / centerY) * 10; // Flipped X-axis
            const rotateY = ((x - centerX) / centerX) * 10; // Flipped Y-axis

            repoBox.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;

            // Push away effect for other boxes
            document.querySelectorAll(".repo-box").forEach((box, i) => {
                if (i !== index) {
                    box.style.transform = "scale(0.9) translateY(10px)";
                }
            });
        });

        // Reset all transformations on mouse leave
        repoBox.addEventListener("mouseleave", () => {
            repoBox.style.transform = "perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)";
            document.querySelectorAll(".repo-box").forEach((box) => {
                box.style.transform = "scale(1) translateY(0)";
            });
        });

        repoGrid.appendChild(repoBox);
    });
}

fetchRepositories();
