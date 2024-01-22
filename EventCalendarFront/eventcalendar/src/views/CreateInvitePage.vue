<template>
    <headerbuttons />
    <div class="container" v-if="events.length > 0">
        <h3 class="title is-4">Escolha o evento que deseja criar o convite</h3>
        <div class="select is-medium is-rounded">
            <select v-model="selectedEvent">
                <option v-for="(event) in events" :key="event.id"> {{ event.id }} - {{ event.title }}</option>
            </select>
        </div>
        <h3 class="title is-4">Informe o email do usuario que deseja convidar</h3>
        <input class="input is-medium" type="email" v-model="selectedEmail">
        <button @click="createInvite" class="button is-success is-medium is-rounded">Create invite</button>
    </div>
    <div v-if="events.length <= 0" class="no-events">
        <p>Looks like you dont have any events here.</p>
        <button @click="goToEventPage" class="button is-success is-rounded is-medium">Create a new event</button>
    </div>


    <div v-if="errorMessage.length > 0" class="error">
        <p> {{ errorMessage }}</p>
    </div>
    <div v-if="successMessage.length > 0" class="success">
        <p> {{ successMessage }}</p>
    </div>
</template>

<script>
import headerbuttons from '../components/HeaderButtons.vue'
import axios from 'axios'

export default {
    components: {
        headerbuttons,
    },
    data() {
        return {
            events: [],
            userId: '',
            apiUrl: 'http://localhost:5001',
            selectedEvent: '',
            selectedEmail: '',
            invitedId: '',
            errorMessage: '',
            successMessage: ''
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        axios.get(`${this.apiUrl}/userEvents/${this.userId}`)
            .then((response) => {
                this.events = response.data
                console.log(this.events)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    methods: {
        createInvite() {

            //validate empty fields
            if (this.selectedEvent == '' || this.selectedEmail == '') {
                this.errorMessage = 'Please fill all the fields'
                this.successMessage = ''
                return
            }

            if (!this.selectedEmail.includes('@')) {
                this.errorMessage = 'Please inform a valid email'
                this.successMessage = ''
                return
            }

            const eventId = this.selectedEvent.split('-')[0]
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            axios.get(`${this.apiUrl}/user/email/${this.selectedEmail}`)
                .then((response) => {
                    if (this.userId == response.data.id) {
                        this.errorMessage = 'You cannot invite yourself'
                        this.successMessage = ''
                        return
                    }
                    axios.post(`${this.apiUrl}/invite`, {
                        invitedId: response.data.id,
                        eventId: eventId,
                        inviterId: this.userId
                    })
                        .then((response) => {
                            if(response.status != 201){
                                this.errorMessage = 'Invite already exists'
                                this.successMessage = ''
                                return
                            }
                            this.successMessage = 'Invite created successfully'
                        })
                        .catch((error) => {
                            console.log(error)
                            this.errorMessage = error.response.data
                            this.successMessage = ''
                        })
                })
                .catch((error) => {
                    console.log(error)
                    this.errorMessage = error.response.data
                    this.successMessage = ''
                })
        },
        goToEventPage(){
            this.$router.push({ name: 'CreateEvent' })
        }
    }
}


</script>

<style scoped>
.title {
    color: whitesmoke
}

.container {
    width: 40%;
}

.button {
    margin-top: 1rem;
}

.select{
    margin-bottom: 2rem;
}

.error{
    color: red
}

.success{
    color:greenyellow
}
</style>