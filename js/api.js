const API = (function () {
    const BASE_URL = 'https://study.duyiedu.com'
    const TOKEN_KEY = 'token'

    function get (path) {
        const headers = {}
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            headers.authorization = `Bearer ${token}`
        }
        return fetch(BASE_URL + path, { headers })
    }

    function post (path, body) {
        const headers = {
            'Content-Type': 'application/json'
        }
        const token = localStorage.getItem(TOKEN_KEY)
        if (token) {
            headers.authorization = `Bearer ${token}`
        }
        return fetch(BASE_URL + path, { method: 'post', headers, body: JSON.stringify(body)})
    }

    async function register (userInfo) {
        return await post('/api/user/reg', userInfo).then(res => res.json())
    }

    async function login (userInfo) {
        const response = await post('/api/user/login', userInfo)
        const res = await response.json()
        if (res.code === 0) {
            const token = response.headers.get('authorization')
            localStorage.setItem(TOKEN_KEY, token)
        }
        return res
    }


    async function exists (loginId) {
        return await get('/api/user/exists?loginId='+loginId)
            .then(res => res.json())
    }

    async function profile () {
        return await get('/api/user/profile').then(res => res.json())
    }

    async function sendChat (content) {
        return await post('/api/chat', content).then(res => res.json())
    }

    async function chatHistory () {
        return await get( '/api/chat/history').then(res => res.json())
    }

    function loginOut() {
        localStorage.removeItem(TOKEN_KEY)
    }

    return {
        register,
        login,
        exists,
        profile,
        sendChat,
        chatHistory,
        loginOut
    }
})()
