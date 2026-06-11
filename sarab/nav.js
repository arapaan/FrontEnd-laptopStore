(function() {    
    // setTimeout(function(){
    //     location.reload();
    // }, 5000);

    const now = new Date();
    const formatDate = new Intl.DateTimeFormat('en-CA', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(now);
    
    const hasil = formatDate.replace(',', ''); 

    console.log(hasil);
    console.log('Expires At: ', localStorage.getItem('expires_at'))

    $expiresAt = localStorage.getItem('expires_at');
    
    if ($expiresAt && hasil > $expiresAt) {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('user');
        window.location.href = '/sarab/login.html';
    }


    // show navbar
    const container = document.getElementById('navSidebar');

    let htmlContent = `
        <nav class="navbar navbar-expand-lg">
        <div class="container">            
            <div class="collapse navbar-collapse" id="navmenu">
                <ul class="navbar-nav mx-auto">
                    <li class="nav-item"><a class="nav-link" href="/sarab/index.html">Product</a></li>
                    <li class="nav-item"><a class="nav-link" id="loginLink" href="/sarab/login.html">Login</a></li>
                    <li class="nav-item"><a class="nav-link" href="/sarab/admin.html">Admin</a></li>
                </ul>
            </div>
            <a href="#" id="logoutLink" style="display: flex; position: absolute; top: 20px; right: 20px;">
                <img src="img/assets/log-out.png" style="width: 28px; height: auto;" alt="">
            </a>
        </div>
    </nav>
    `;

    container.innerHTML = htmlContent;

    console.log('Checking user login status...');
    isUserLoggedIn();
})();

// hide login link if user is logged in
function isUserLoggedIn() {
    const token = localStorage.getItem('jwt_token');
    console.log('Token:', token);        
    if (token) {
        const l = document.getElementById('loginLink');
        l.style.display = 'none';
    }
}


// logout functionality
const logoutLink = document.getElementById('logoutLink');
logoutLink.addEventListener('click', () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    window.location.href = '/sarab/login.html';
});
