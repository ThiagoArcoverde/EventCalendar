<template>
    <headerbuttons />
    <div class="container">
        <form @submit.prevent="updatePassword">
            <div class="card">
                <div class="card-header">
                    <p class="card-header-title title is-3">Update your password</p>
                </div>
                <div class="card-content">
                    <div class="input-container">
                        <h4 class="subtitle is-4">Password: </h4>
                        <input class="input is-medium" type="password" v-model="password">
                    </div>
                    <div class="input-container">
                        <h4 class="subtitle is-4">Confirm it: </h4>
                        <input class="input is-medium" type="password" v-model="confirmPassword">
                    </div>
                    <button class="button is-success is-medium is-rounded">Save changes</button>
                </div>
            </div>
        </form>
    </div>
    <div v-if="errorMessage != undefined" class="error-message">{{ errorMessage }}</div>
</template>


<script>
import headerbuttons from '../components/HeaderButtons.vue'
import axios from 'axios'

export default {

    components: {
        headerbuttons
    },
    data: () => ({
        password: '',
        confirmPassword: '',
        errorMessage: undefined,
        apiUrl: 'http://localhost:5001',
        userId: localStorage.getItem('userId')
    }),
    methods: {
        updatePassword() {
            if (this.password != this.confirmPassword) {
                this.errorMessage = "Passwords don't match"
                return
            }

            if(this.password.length <= 0) {
                this.errorMessage = "Password can't be empty"
                return
            }



            const passwordRequestObject = {
                password: this.password,
                userId: this.userId
            }

            var token = localStorage.getItem('token')
            axios.defaults.headers.common['Authorization'] = token
            axios.put(`${this.apiUrl}/user/changePassword`, passwordRequestObject, {
                password: this.password
            })
                .then((response) => {
                    console.log(response)
                    this.$router.push('/profile/changePassword/success')
                })
                .catch((error) => {
                    console.log(error)
                })
        }

    }
}

</script>



<style scoped>
.container {
    width: 40rem;
}

.card {
    background-color: rgb(200, 255, 225);
    border-radius: 16px;
    box-shadow: 0 0 16px 16px rgba(0, 0, 0, 0.3);
}

.card-header {
    background-color: rgb(130, 200, 170);
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
}

.card-header-title {
    color: rgb(10, 85, 35);
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;

}

.input {
    margin-bottom: 2rem;
    margin-left: 1rem;
    width: 20rem;
    background-color: whitesmoke;
}

.input-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    
}

.subtitle {
    color: rgb(10, 85, 35);
}

.error-message {
    margin-top: 1rem;
    color: red;
    font-size: large;
}
</style>