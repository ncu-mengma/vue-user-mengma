<template>
    <el-dialog :visible="showLogin" width="500px" :lock-scroll="false" @close="close" :close-on-click-modal="false"
        :close-on-press-escape="false" ref="dialog">
        <el-tabs v-model="activeName">
            <el-tab-pane label="注册" name="register">
                <el-form ref="registerForm" :model="registerForm" :rules="registerRules">
                    <el-form-item prop="nickName">
                        <el-input prefix-icon="el-icon-user" placeholder="请输入昵称" v-model="registerForm.nickName"></el-input>
                    </el-form-item>
                    <el-form-item prop="account">
                        <el-input prefix-icon="el-icon-user" placeholder="请输入账号" v-model="registerForm.account"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input show-password prefix-icon="el-icon-lock" placeholder="请输入密码"
                            v-model="registerForm.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input show-password prefix-icon="el-icon-lock" placeholder="确认密码"
                            v-model="registerForm.checkPass"></el-input>
                    </el-form-item>
                    <el-form-item prop="mail">
                        <el-input type="email" prefix-icon="el-icon-lock" placeholder="请输入邮箱"
                            v-model="registerForm.mail"></el-input>
                    </el-form-item>
                    <el-form-item prop="mailCodeInput" ref="mailCodeInput">

                        <div style="display: flex;">
                            <el-input class="radius-adjust-right-input" prefix-icon="el-icon-lock" placeholder="请输入邮箱验证码"
                                v-model="registerForm.mailCodeInput"></el-input>


                            <el-button class="radius-adjust-left-button" type="primary" :disabled="countDown > 0"
                                native-type="button" @click="getMailCode">{{ countDown > 0 ? `${countDown} 秒后重试` : '获取验证码'
                                }}</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="submit-button" round type="primary" @click="registerSubmit">注册</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="登录" name="login">
                <el-form ref="loginForm" :model="loginForm">
                    <el-form-item prop="account">
                        <el-input prefix-icon="el-icon-user" placeholder="请输入账号" v-model="loginForm.account"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input show-password prefix-icon="el-icon-lock" placeholder="请输入密码"
                            v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="submit-button" round type="primary" @click="loginSubmit()">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

    </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { getMailCode, validRegisterMail, validRegisterAccount, validMailCode } from '@/api/user'
export default {
    computed: {
        ...mapGetters(['showLogin']),
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var validateMailCode = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else {
                validMailCode({ mail: this.registerForm.mail, code: this.registerForm.mailCodeInput }).then(() => {
                    callback()
                }).catch(error => {
                    callback(new Error(error))
                })
            }
        };
        var validateAccount = (rule, value, callback) => {
            validRegisterAccount({ account: this.registerForm.account }).then(() => {
                callback()
            }).catch(() => {
                callback(new Error('账号已存在'))
            })
        };
        var validateMail = (rule, value, callback) => {
            validRegisterMail({ mail: this.registerForm.mail }).then(() => {
                callback()
            }).catch((error) => {
                callback(new Error(error))
            })
        };
        return {
            countDown: 0,
            loginForm: {
                account: '',
                password: ''
            },
            registerForm: {
                nickName: '',
                account: '',
                password: '',
                checkPass: '',
                mail: '',
                sex: 'boy',
                mailCodeInput: '',
            },
            activeName: 'login',
            registerRules: {
                nickName: [
                    { required: true, message: '请输入昵称', trigger: 'blur' },
                    { min: 2, max: 20, message: '昵称长度在 2 到 20 个字符', trigger: 'blur' },
                    { pattern: /^[^\s!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/, message: '昵称不能包含特殊字符', trigger: 'blur' }
                ],
                account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 8, max: 16, message: '长度在 8 到 16 个字符', trigger: 'blur' },
                    { validator: validateAccount, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 8, max: 20, pattern: /^(?=.*\d)(?=.*[A-Z])\S*$/, message: '密码需包含至少一个数字和一个大写字母,长度为 8 到 20 个字符,且不包含空格', trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                mail: [
                    { required: true, message: '请输入正确的邮箱', type: 'email', trigger: 'blur' },
                    { validator: validateMail, trigger: 'blur' }
                ],
                mailCodeInput: [
                    { validator: validateMailCode, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        close() {
            this.$store.commit('user/SET_SHOWLOGIN', false)
        },
        loginSubmit() {
            this.$store.dispatch("user/login", this.loginForm).then(() => {
                this.$message.success('登录成功！')
            }).catch((msg) => {
                this.$message.error(msg)
            })
            this.close()
        },
        registerSubmit() {
            this.$refs.registerForm.validate((res, _) => {
                if (res) {
                    const { account, password, mail, sex, nickName } = this.registerForm
                    const data = { account, password, mail, sex, nickName }
                    this.$store.dispatch("user/register", data).then(() => {
                        this.$message({
                            message: '注册成功！',
                            type: 'success'
                        });
                        this.activeName = 'login'
                    })
                }
            })

        },
        getMailCode() {
            if (this.registerForm.mail != '') {
                this.countDown = 60
                const timer = setInterval(() => {
                    this.countDown--
                    if (this.countDown <= 0) {
                        clearInterval(timer)
                    }
                }, 1000)
                getMailCode({ mail: this.registerForm.mail }).catch(error => {
                    this.$refs.mailCodeInput.error = error
                })
            }

        }
    }
}
</script>

<style lang="stylus" scoped>
>>> .el-dialog
    border-radius 20px !important
    .radius-adjust-right-input
        input   
            border-radius 4px 0 0 4px
    .radius-adjust-left-button
        border-radius 0 4px 4px 0

    .submit-button
        width 100% 
</style>