export function isLoggedIn() {
    let userAuth = JSON.parse(localStorage.getItem('user'));
    let today = new Date();
    let expiration = (userAuth) ? new Date(userAuth.expiresAt) : new Date();

    if (today > expiration) {
        localStorage.removeItem('user');
    }

    return localStorage.getItem('user');
}
