<template>
    <div class="register">
        <div class="title is-1">Register</div>
        <form class="container" @submit.prevent="register">
            <input class="input is-medium" type="text" placeholder="Insert your name" v-model="name">
            <input class="input is-medium" type="email" placeholder="Insert your email" v-model="email">
            <input class="input is-medium" type="password" placeholder="insert your password" v-model="password">
            <input class="input is-medium" type="password" placeholder="Confirm your password"  v-model="confirmPassword">
            <button class="button is-success is-medium">Register</button>
            <router-link to="/" class="card-login-link">Do you already have an account? Login here</router-link>
        </form>
    </div>
    <div class="error-message" v-if="errorMessage != undefined">{{ errorMessage }}</div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'RegisterPage',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            errorMessage: '',
            apiUrl: 'http://localhost:5001'
        }
    },
    methods: {
        register(){
            if(this.name == '' || this.email == '' || this.password == '' || this.confirmPassword == ''){
                this.errorMessage = 'Please fill all the fields'
                return
            }

            if(this.password != this.confirmPassword){
                this.errorMessage = 'Passwords do not match'
                return
            }

            const registerRequestObject = {
                name: this.name,
                email: this.email,
                password: this.password
            }

            axios.post(`${this.apiUrl}/user`, registerRequestObject)
                .then(response => {
                    console.log(response)
                    if(response.status == 201){
                        this.$router.push({ name: 'RegisterSuccess' })
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
.register{
    padding: 2rem;

}


.title {
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

.input{
    margin: 1rem;
    width: 80%;
}

.button{
    margin-top: 1rem;
    margin-bottom: 2rem;
}

.card-login-link {
    color: darkgray;
    font-size: 0.8rem;
}

.error-message{
    color: red;
    font-size: large;
}

</style>