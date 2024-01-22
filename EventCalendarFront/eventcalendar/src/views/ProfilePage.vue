<template>
    <headerbuttons />
    <div class="container">
        <h1 class="title is-1 hello-section">Hello, <strong>{{ user.name }}</strong></h1>
        <div class="panel-info">
            <button @click="goToProfileEdit" class="button is-link is-rounded profile-button is-medium">Edit
                profile</button>
            <button @click="goToPasswordChange" class="button is-link is-rounded profile-button is-medium">Change
                password</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import headerbuttons from '../components/HeaderButtons.vue'

export default {
    data: () => ({
        user: {},
        userId: '',
        token: '',
        apiUrl: 'http://localhost:5001',
        recentEvents: [],
    }),
    components: {
        headerbuttons
    },
    created() {
        this.userId = localStorage.getItem('userId')
        this.token = localStorage.getItem('token')

        axios.defaults.headers.common['Authorization'] = this.token
        axios.get(`${this.apiUrl}/user/${this.userId}`)
            .then((response) => {
                this.user = response.data
            })
            .catch((error) => {
                console.log(error)
            })

    },
    methods: {
        goToProfileEdit() {
            this.$router.push({ name: 'EditProfile' })
        },
        goToPasswordChange() {
            this.$router.push({ name: 'ChangePassword' })
        }
    }
}


</script>

<style scoped>
.hello-section {
    color: whitesmoke;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 8rem;
}

.card-header {
    background-color: rgb(130, 200, 170);
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border: solid 1px darkgray;
}

.card-header-title {
    color: rgb(10, 85, 35);
}

.card {
    background-color: rgb(200, 255, 225);
    border-radius: 16px;
    box-shadow: 0 0 16px 16px rgba(0, 0, 0, 0.3);
}

.my-events {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.event-content {
    height: 16rem;
    width: 64rem;
    margin: 1rem;
    padding: 1rem;
    border-radius: 16px;
    background-color: rgb(10, 85, 35, 0.3);
    color: darkgray
}

.event-content:hover {
    cursor: pointer;
}

.panel-info {
    width: 100%;
}

.profile-button {
    width: 16rem;
    height: 3rem;
    margin: 1rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
}

.info-button {
    margin: 1rem
}
</style>