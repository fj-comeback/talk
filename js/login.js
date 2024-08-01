const form = $('.user-form')

const loginIdValidator = new FieldValidator('#txtLoginId', async function (val) {
    if (!val) {
        return '请填写账号'
    }
    const res = await API.exists(val)
    if (!res.data) {
        return '账号不存在'
    }
})

const loginPwdValidator = new FieldValidator('#txtLoginPwd', async function (val) {
    if (!val) {
        return '请填写密码'
    }
})

form.addEventListener('submit', async function (e) {
    e.preventDefault()
    const res = await FieldValidator.validate([
        loginIdValidator,
        loginPwdValidator
    ])
    if (!res) return
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    const resp = await API.login(data)
    if (resp.code === 0){
        alert('登录成功')
        location.href = './index.html'
    } else {
        loginPwdValidator.err.innerHTML = resp.msg
        loginPwdValidator.el.value = ''
    }
})
