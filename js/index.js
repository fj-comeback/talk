(async function () {
    // 判断用户是否登录，没有登录跳转到登录页，已经登录获取用户信息
    const res = await API.profile()
    if (res.code !== 0) {
        alert('请登录')
        location.href = './login.html'
        return
    }
    const doms = {
        aside: {
            loginId: $('#loginId'),
            nickName: $('#nickname'),
            logout: $('.close .icon-close')
        },
        chatContainer: $('.chat-container'),
        txtMsgContainer: $('.msg-container'),
        txtMsg: $('#txtMsg')
    }
    doms.aside.loginId.innerText = res.data.loginId
    doms.aside.nickName.innerText = res.data.nickname
    doms.aside.logout.addEventListener('click', function () {
        API.loginOut()
        location.href = './login.html'
    })

    /**
     * @param {Object} chatInfo
     * @param {string} chatInfo.content - 聊天内容
     * @param {number} chatInfo.createdAt - 发出时间
     * @param {string | null} chatInfo.from - 发送者
     * @param {string | null} chatInfo.to - 发送目标
     */
    function addChatInfo(chatInfo) {
        const div = $$$('div'),
            avatar = $$$('img'),
            content = $$$('div'),
            date = $$$('div')
        div.classList.add('chat-item')
        avatar.classList.add('chat-avatar')
        content.classList.add('chat-content')
        date.classList.add('chat-date')
        content.innerText = chatInfo.content
        date.innerText = dateFormat(chatInfo.createdAt)
        if (chatInfo.from !== null) {
            div.classList.add('me')
            avatar.src = './asset/avatar.png'
        } else {
            avatar.src = './asset/robot-avatar.jpg'
        }
        div.appendChild(avatar)
        div.appendChild(content)
        div.appendChild(date)
        doms.chatContainer.appendChild(div)
    }

    function scrollBottom () {
        doms.chatContainer.scrollTop = doms.chatContainer.scrollHeight
    }
    // 回填历史聊天记录
    async function getHistory() {
        const chatRecords = await API.chatHistory()
        if (chatRecords.code === 0) {
            for (const chatRecord of chatRecords.data) {
                addChatInfo(chatRecord)
            }
            scrollBottom()
        }
    }

    await getHistory()

    async function sendMessage() {
        const content = doms.txtMsg.value.trim()
        if (!content) {
            return
        }
        addChatInfo({
            content: content,
            createdAt: dateFormat(Date.now()),
            from: doms.aside.loginId.innerText,
            to: null
        })
        doms.txtMsg.value = ''
        scrollBottom()
        const resp = await API.sendChat({content})
        if (resp.code) return
        addChatInfo({
            content: resp.data.content,
            createdAt: dateFormat(Date.now()),
            from: null,
            to: doms.aside.loginId.innerText
        })
        scrollBottom()
    }

    doms.txtMsgContainer.addEventListener('submit', function (e) {
        e.preventDefault()
        sendMessage()
    })

})()
