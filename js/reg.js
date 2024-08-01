const form = $('.user-form')

const loginIdValidator = new FieldValidator('#txtLoginId', async function (val) {
    if (!val) {
        return '请填写账号'
    }
    const res = await API.exists(val)
    if (res.data) {
        return '账号已注册'
    }
})

const nickNameValidator = new FieldValidator('#txtNickname', async function (val) {
    if (!val) {
        return '请填写昵称'
    }
})

const loginPwdValidator = new FieldValidator('#txtLoginPwd', async function (val) {
    if (!val) {
        return '请填写密码'
    }
})

const loginPwdConfirmValidator = new FieldValidator('#txtLoginPwdConfirm', async function (val) {
    if (!val) {
        return '请填写确认密码'
    }
    if (val !== loginPwdValidator.el.value) {
        return '请检查密码'
    }
})

form.addEventListener('submit', async function (e) {
    e.preventDefault()
    const res = await FieldValidator.validate([
        loginIdValidator,
        nickNameValidator,
        loginPwdValidator,
        loginPwdConfirmValidator
    ])
    if (!res) return
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    const resp = await API.register(data)
    if (!resp.code) {
        alert('注册成功')
        location.href = './login.html'
    } else {
        alert(resp.msg)
    }
})
