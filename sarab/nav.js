(function() {    
    // setTimeout(function(){
    //     location.reload();
    // }, 5000);

    async function cartId() {
        const token = localStorage.getItem('jwt_token');
    
        const api = await fetch('http://127.0.0.1:8000/api/cart', {
            method: 'GET',
            headers: {
                'Authorization':  `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if(!api.ok) {
            const errorData = await api.json(); 
            console.log('errorData: ', errorData)
            throw new Error(errorData.message || 'An error occurred on the server');
        }

        const { data } = await api.json();
        localStorage.setItem('id_cart', data.id);
    }

    cartId();

    async function me() {
        const token = localStorage.getItem('jwt_token');
    
        const api = await fetch('http://127.0.0.1:8000/api/auth/me', {
            method: 'GET',
            headers: {
                'Authorization':  `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
    
        if(!api.ok) {
            throw new Error(`HTTP error! Status: ${api.status}`);
        }
    
        // get response
        const { data } = await api.json();
        console.log(data.roles[0].name)

        if(data.roles[0].name != 'admin') {
            const adminPage = document.getElementById('adminLink');
            adminPage.style.display = 'none'
        }
    }

    me();

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
                    <li class="nav-item"><a class="nav-link" id="adminLink" href="/sarab/admin.html">Admin</a></li>
                </ul>
            </div>
            <div id="logoutPage">
                <a href="#" id="logoutLink" style="display: flex; position: absolute; top: 20px; right: 20px;">
                    <img src="img/assets/log-out.png" style="width: 28px; height: auto;" alt="">
                </a>
            </div>            
        </div>
    </nav>
    `;

    container.innerHTML = htmlContent;

    // console.log('Checking user login status...');
    isUserLoggedIn();
})();

// hide login link if user is logged in
function isUserLoggedIn() {
    const token = localStorage.getItem('jwt_token');
    // console.log('Token:', token);        
    if (token) {
        const l = document.getElementById('loginLink');
        l.style.display = 'none';

    } else {
        const logout = document.getElementById('logoutLink')
        logout.style.display = 'none'

        const admin = document.getElementById('adminLink');
        admin.style.display = 'none';
    }
}


// logout functionality
const logoutLink = document.getElementById('logoutLink');
logoutLink.addEventListener('click', () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user');
    window.location.href = '/sarab/login.html';
});
