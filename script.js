async function searchUser() {
    const username = document.getElementById('searchInput').value;
    const profileDiv = document.getElementById('profile');
    const errorMsg = document.getElementById('error');

    // Reset display
    profileDiv.style.display = 'none';
    errorMsg.style.display = 'none';
    errorMsg.innerText = '';

    if (!username) {
        alert("Please enter a username");
        return;
    }

    try {
        // Fetch data from GitHub API
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
            throw new Error('User not found');
        }

        const data = await response.json();

        // Populate HTML with data
        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('name').innerText = data.name || data.login;
        document.getElementById('bio').innerText = data.bio || 'No bio available';
        document.getElementById('repos').innerText = data.public_repos;
        document.getElementById('followers').innerText = data.followers;
        document.getElementById('profileLink').href = data.html_url;

        // Show profile
        profileDiv.style.display = 'block';

    } catch (error) {
        errorMsg.style.display = 'block';
        errorMsg.innerText = error.message;
    }
}