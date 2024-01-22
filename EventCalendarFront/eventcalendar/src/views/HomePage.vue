<template>
    <headerbuttons />
    <div class="container">
        <div class="title is-1"> Upcoming events</div>
        <div class="events-container">
            <div v-for="(event) in events" :key="event.id">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">
                            {{ event.title }} - {{ new Date(Date.parse(event.initialDate)).toLocaleDateString('pt-br') }}
                        </p>
                    </header>
                    <p class="subtitle">
                        {{ event.description }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerbuttons from '../components/HeaderButtons.vue'
import axios from 'axios'

export default {

    created() {
        this.userId = localStorage.getItem('userId')
        this.token = localStorage.getItem('token')

        console.log(this.userId)

        axios.defaults.headers.common['Authorization'] = this.token
        axios.get(`${this.apiUrl}/userEvents/${this.userId}`)
            .then(response => {
                console.log(response)
                this.events = response.data
            })
            .catch(error => {
                if(error.response.status == 401){
                    this.$router.push({ name: 'Login' })
                    return
                }
            })
    },
    data() {
        return {
            userId: '',
            token: '',
            apiUrl: 'http://localhost:5001',
            events: []
        }
    },
    components: {
        headerbuttons
    },
}
</script>

<style scoped>
.title {
    color: white
}

.container{
    width: 32rem;
    padding-bottom: 4rem;
}

.card-header {
    background-color: rgb(130, 200, 170);
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border: solid 1px darkgray;
}

.card {
    width: 32rem;
    height: 16rem;
    background-color: rgb(200, 255, 225);
    border-radius: 16px;
    box-shadow: 0 0 16px 16px rgba(0, 0, 0, 0.3);
    margin: 2rem;
}

.card-header-title {
    color: rgb(10, 85, 35);
}

.events-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.subtitle{
    margin-top: 1rem;
}
</style>