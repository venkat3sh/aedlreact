export const userService = {
    login,
    // logout,
}

function login(pw) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            "role": "write",
            "password": pw
        })
    };

    return fetch(`http://22.174.139.218/auth/login`, requestOptions)
        .then(response => response.json())
        .then(result => {
            // if the result has a message in it, that means we got a 400 error
            if (result.message) {
                return result.message
              } else if (result.token) {
                let currentTime = new Date().getTime()
                localStorage.setItem('token', result.token)
                localStorage.setItem('tokenCreatedAt', currentTime)

                if (this.props.history.location.pathname === "/unload/cnfgrn") {
                this.props.history.push("/write-mode/unload/cnfgrn")
                } else if (this.props.history.location.pathname === "/processing/cnfgrn") {
                this.props.history.push("/write-mode/processing/cnfgrn")
                } else {
                // window.location.reload(true)
              }
            }
        })
    };

// function logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('token');
// }