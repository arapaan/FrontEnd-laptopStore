(function() {
    const userSession = localStorage.getItem('jwt_token');

    if (userSession) {
        window.location.href = '/sarab/index.html';
    }
})();
const btnEl = document.querySelector('.login');

const clickHandler = () => {
    async function login() {
        try {
            const ie1 = document.getElementById('email');
            const email = ie1.value;
            // console.log('Email: ', email); 
            const ie2 = document.getElementById('password');
            const password = ie2.value;
            // console.log('Password: ', password); 

            const userLogin = {
                email: email,
                password: password
            };

            const api = await fetch('http://127.0.0.1:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',                
                },
                body: JSON.stringify(userLogin)
            })

            if(!api.ok) {
                throw new Error(`HTTP error! Status: ${api.status}`);
            }            

            const { data } = await api.json()
            console.log(data)
            localStorage.removeItem('id_cart')
            console.log('id_cart')
            localStorage.setItem('jwt_token', data.jwt_token);
            localStorage.getItem('jwt_token')
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.getItem('user')

            window.location.href = 'index.html';
        } catch (error) {
            console.error('Fetch Failed:', error.message);
            document.getElementById('data-container').innerHTML = 'Failed to load data.';
        }    
    }

    login();
}

btnEl.addEventListener('click', clickHandler);

