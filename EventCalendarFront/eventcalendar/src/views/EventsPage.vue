<template>
    <headerbuttons />
    <div class="container">
        <button @click="goToCreateEventPage" class="button is-link is-rounded is-medium">Create a new event</button>

        <div v-if="events.length > 0" class="card">
            <div class="card-header">
                <p class="card-header-title title is-2">Your next events</p>
            </div>
            <div class="card-content">
                <div class="content">
                    <div class="my-events">
                        <div v-for="(event) in events" :key="event.id">
                            <div class="event-content">
                                <h3 class="title is-3 event-info"> {{ event.title }} - {{ new
                                    Date(Date.parse(event.initialDate)).toLocaleDateString('pt-br') }}</h3>
                                <h4 class="subtitle is-4 event-info"> {{ event.description }}</h4>
                                <div class="event-button-section">
                                    <button @click="deleteEvent(event.id)"
                                        class="button is-danger is-rounded event-button">Delete event</button>
                                    <button @click="editEvent(event.id)"
                                        class="button is-success is-rounded event-button">Edit event</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import headerbuttons from '../components/HeaderButtons.vue'
import axios from 'axios'

export default {
    components: {
        headerbuttons
    },
    data() {
        return {
            events: [],
            userId: '',
            apiUrl: 'http://localhost:5001'
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        axios.get(`${this.apiUrl}/allEvents/${this.userId}`)
            .then((response) => {
                console.log(`a`)
                this.events = response.data
                console.log(this.events)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    methods: {
        deleteEvent(eventId) {
            axios.delete(`${this.apiUrl}/event/${eventId}`)
                .then(() => {
                    window.location.reload()
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        editEvent(eventId) {
            this.$router.push({ name: 'EditEvent', params: { eventId: eventId }})
        },
        goToCreateEventPage() {
            this.$router.push({ name: 'CreateEvent' })
        }

    }
}

</script>

<style scoped>
.button {
    margin-bottom: 2rem;
}

.event-button {
    width: 33%;
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

.event-button-section {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 0.5rem;
    height: 100%;
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
</style>