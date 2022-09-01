import { pais } from "./countryCodes.js";


document.getElementById('producto').addEventListener('click', () => {
    window.location.assign('/api/productos')
})

document.getElementById('logOut').addEventListener('click', () => {
    window.location.assign('/api/login/log_out')
})

