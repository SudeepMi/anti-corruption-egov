const User = () =>{
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    if(localStorage.getItem('token') && localStorage.getItem('user')){
       return {
            user: JSON.parse(localStorage.getItem('user')),
            token: localStorage.getItem('token'),
            logOut: logOut
       }
    }
    return false;
}

export default User;