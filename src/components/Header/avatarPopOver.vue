<template>
    <div class="avatar">
        <div class="item">
            <a-avatar v-if="!account" size="large">
                <span>登录</span>
            </a-avatar>
            <a-avatar class="sink hvr-grow" size="large" :src="avatar" v-if="account">
                <a-icon slot="icon" type="user" />
            </a-avatar>
        </div>
        <div class="popover">

            <div class="top">
                {{ nickName }}
            </div>
            <div class="mid">
                <a v-for="(item, index) in avatarMidField" :href="item.link">
                    <div class="field-value">{{ item.value }}</div>
                    <div class="field">{{ item.name }}</div>
                </a>
            </div>
            <div class="bottom">
                <ul>
                    <li>
                        <a>
                            <i class="el-icon-user-solid"></i>
                            个人中心
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        avatarMidField() {
            const { fanCount, followCount, likeNum } = this;
            return [
                { name: '粉丝', value: fanCount, link: '' },
                { name: '关注', value: followCount, link: '' },
                { name: '获赞', value: likeNum, link: '' }
            ];
        },
        ...mapGetters(['nickName', 'fanCount', 'followCount', 'account', 'avatar'])
    },
}
</script>

<style lang="stylus" scoped>
.avatar
    display flex
    align-items center
    height 100%
    cursor default
    position relative
    .item
        cursor pointer
    &:hover
        .sink
            transform: translateY(30px) scale(1.3) !important;
            z-index 100
        .popover
            display block

    .popover
        cursor default
        display none
        position absolute
        top 100%
        left 50%
        width 300px
        transform: translateX(-50%);   
        background: #FFFFFF
        box-shadow: 0 0 30px rgba(0,0,0,.1);
        border-radius: 8px;
        .top
            margin-top 30px
            padding 0px 24px 18px 24px
            font-size 1rem
            cursor auto
        .mid
            display flex
            justify-content space-around
            padding 8px 0
            border-top   1px solid #e8e8ed;
            border-bottom 1px solid #e8e8ed;
            .field-value
                cursor pointer 
                font-size: 20px;
                font-style: normal;
                font-weight: 600;
                display: block;
                line-height: 30px;
                height: 30px;
        .bottom
            ul 
                list-style-type none
                padding: 8px 0;
                font-weight: 400;
                color: #555666;
                border-radius: 0 0 4px 4px;
                a
                    display: flex;
                    align-items center
                    padding: 0 16px;
                    height: 40px;
                    line-height: 40px;
                    i
                        margin-right 8px
                    &:hover
                        background: #f0f0f5;
                        color inherit
</style>