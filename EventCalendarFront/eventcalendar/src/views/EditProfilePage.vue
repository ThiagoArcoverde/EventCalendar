<template>
    <headerbuttons />

    <div class="container">
        <form @submit.prevent="editProfile">
            <div class="card">
                <div class="card-header">
                    <p class="card-header-title title is-3">Edit your profile information</p>
                </div>
                <div class="card-content">
                    <div class="input-container">
                        <h4 class="subtitle is-4">Name: </h4>
                        <input class="input is-medium" type="text" placeholder="Name" v-model="name">
                    </div>
                    <div class="input-container">
                        <h4 class="subtitle is-4">Email: </h4>
                        <input class="input is-medium" type="email" placeholder="Email" v-model="email">
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
    data: () => ({
        name: '',
        oldName: '',
        email: '',
        oldEmail: '',
        userId: '',
        errorMessage: '',
        apiUrl: 'http://localhost:5001'
    }),
    components: {
        headerbuttons
    },
    created: function () {
        this.userId = localStorage.getItem('userId')
        var token = localStorage.getItem('token')

        axios.defaults.headers.common['Authorization'] = token
        axios.get(`${this.apiUrl}/user/${this.userId}`)
            .then((response) => {
                this.name = response.data.name
                this.oldName = response.data.name
                this.email = response.data.email
                this.oldEmail = response.data.email
            })
            .catch((error) => {
                console.log(error)
            })
    },
    methods: {
        editProfile() {
            if (this.name == '' || this.email == '') {
                this.errorMessage = 'Please fill all the fields'
                console.log(this.errorMessage)
                return
            }
            if (this.name.length > 250 || this.email.length > 250) {
                this.errorMessage = 'Name and email must have less than 250 characters'
                return
            }

            if (this.name == this.oldName && this.email == this.oldEmail) {
                this.errorMessage = 'You must change at least one field'
                return
            }

            const editProfileRequestObject = {
                name: this.name,
                email: this.email,
                userId: this.userId
            }
            console.log('d')
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            axios.put(`${this.apiUrl}/user/updateInfo`, editProfileRequestObject)
                .then(response => {
                    console.log(response)
                    if (response.status == 201) {
                        this.$router.push({ name: 'EditProfileSuccess' })
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

.error-message{
    margin-top: 1rem;
    color: red;
    font-size: large;
}
</style>