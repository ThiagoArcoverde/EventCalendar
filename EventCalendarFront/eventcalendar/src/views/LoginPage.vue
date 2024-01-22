<template>
    <div class="home">
        <div class="title is-1 is-spaced home-title">Event Calendar</div>
        <form class="container" @submit.prevent="login">
            <input class="input is-medium" type="text" placeholder="Email" v-model="email">
            <input class="input is-medium" type="password" placeholder="Password" v-model="password">
            <button class="button is-success is-medium card-button">Login</button>
            <router-link to="/register" class="card-register-link">Don't have an account yet? Register here</router-link>
        </form>
    </div>
    <div class="error-message" v-if="errorMessage != undefined">{{ errorMessage }}</div>
</template>

<script>
import axios from 'axios';


export default {
    name: 'LoginPage',
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            apiUrl: 'http://localhost:5001'
        }
    },
    methods: {
        login() {
            if (this.email == '' || this.password == '') {
                this.errorMessage = 'Please fill all the fields'
                return
            }

            const loginRequestObject = {
                email: this.email,
                password: this.password
            }

            axios.post(`${this.apiUrl}/login`, loginRequestObject)
                .then(response => {
                    if (response.status == 200) {
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('userId', response.data.userId)
                        this.$router.push({ name: 'Home' })
                        return
                    }
                })
                .catch(error => {
                    console.log(error)
                    this.errorMessage = error.response.data
                    console.log(this.errorMessage)
                })


        }
    }
}

</script>

<style scoped>
.home {
    padding: 2rem;
}

.home-title {
    color: white;
    margin-bottom: 2rem;
}

.container {
    background: linear-gradient(0deg, rgb(25, 25, 62) 55%, rgb(13, 65, 76) 100%, 0.3);
    backdrop-filter: blur(15px);
    border: 2px solid darkgray;
    border-radius: 16px;
    width: 25%;
    margin: auto;
    padding: 1rem;
    padding-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input {
    margin: 1rem;
    width: 80%;
}

.card-button {
    margin-top: 8%;
    width: 33%;
    margin-bottom: 5%;
}

.card-register-link {
    color: darkgray;
    font-size: 0.8rem;
}

.error-message{
    color: red;
    font-size: large;
}
</style>