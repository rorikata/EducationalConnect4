<template>
    <nav class="navbar navbar-default">
        <div class="container">
            <ul class="nav navbar-nav">
                <li><router-link to="/" exact>Home</router-link></li>
                <li v-if="!user.authenticated"><router-link to="/signin" exact>Sign In</router-link></li>
                <li v-if="!user.authenticated"><router-link to="/signup" exact>Sign Up</router-link></li>
                <li v-if="user.authenticated"><router-link to="/addquestion" exact>Add Question</router-link></li>
                <li v-if="user.authenticated"><router-link to="/categories" exact>Categories</router-link></li>
                <li v-if="user.authenticated"><router-link to="/profile" exact>Profile</router-link></li>
                <li v-if="user.authenticated"><router-link to="/settings" exact>Settings</router-link></li>
                <li v-if="user.authenticated"><router-link to="/" v-on:click.native="logout()" >Logout</router-link></li>
            </ul>
        </div>
    </nav>
</template>

<script>
import auth from '../auth/index'
export default {
    data() {
        return {
            user: auth.user
        }
    },
    methods: {
        logout() {
            console.log('delete');
            auth.logout()
        }
    }

}

</script>

<style scoped>

</style>
