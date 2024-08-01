// 用户登录和注册的通用代码
class FieldValidator {
    constructor(field, validate) {
        this.el = $(field)
        this.err = this.el.nextElementSibling
        this.validatorFunc = validate
        this.el.addEventListener('blur', () => this.validate())
    }

    async validate () {
       const err = await this.validatorFunc(this.el.value)
        if (err) {
            this.err.innerHTML = err
            return false
        } else {
            this.err.innerHTML = ''
            return true
        }
    }

    static async validate (validatorArr) {
        const res = await Promise.all(validatorArr.map(item => item.validate()))
        return res.every(item => item)
    }
}


