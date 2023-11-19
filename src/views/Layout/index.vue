<template>
    <div>
        <Header />
        <div class="main">
            <router-view />
        </div>
        <Footer />
        <LoginModal v-if="showLogin" />
    </div>
</template>

<script>
import { mapGetters } from "vuex"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import LoginModal from "@/components/LoginModal"
export default {
    computed: {
        ...mapGetters(['showLogin'])
    },
    components: { Header, Footer, LoginModal },

}
</script>

<style lang="stylus" scoped>
.main
    width 100%
    min-height: calc(100vh - 276px);
    background-color #f1f2f3
</style>