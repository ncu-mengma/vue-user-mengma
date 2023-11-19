<template>
    <div class="header">
        <div class="mid-content">
            <img src="@/assets/logo.png" class="logo" />
            <div class="nav">
                <a-menu v-model="current" mode="horizontal" @click="click">
                    <a-menu-item key="home">首页</a-menu-item>
                    <a-menu-item key="study"> 学习</a-menu-item>
                    <a-menu-item key="group">组队</a-menu-item>
                </a-menu>
            </div>
            <div class="search-bar">
                <a-input-search placeholder="请输入搜索内容" enter-button @search="onSearch" />
            </div>
            <AvatarPopOver />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import AvatarPopOver from './avatarPopOver.vue';
export default {
    comments: { AvatarPopOver },
    data() {
        return {
            current: ['mail', 'app'],
        };
    },
    methods: {
        onSearch(value) {
        },
        click(item, key, keyPath) {
            this.$store.commit('user/SET_SHOWLOGIN', true);
            console.log(this.$store.getters.nickName);
        }
    },
    components: { AvatarPopOver }
}
</script>

<style lang="stylus" scoped>
.header
    height 56px
    width 100%
    z-index 101
    box-shadow: 0 0 0 0 transparent,0 0 0 0 transparent,0 1px 4px 0 rgba(0,0,0,.02),0 2px 12px 0 rgba(0,0,0,.04),0 2px 6px 0 rgba(0,0,0,.02);
    background: #FFFFFF
    .mid-content
        margin 0 auto
        display flex
        align-items center 
        height 100%
        width 1200px
        .logo
            height 53%
            margin-right 50px
        .nav
            .ant-menu-horizontal
                border-bottom:none
        .search-bar
            margin:0 30px 0 auto
            
</style>