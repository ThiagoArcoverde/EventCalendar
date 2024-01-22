<template>
    <headerbuttons />
    <div class="container">
        <div class="invite-someone-section">
            <button @click="goToCreateInvitePage" class="button is-large is-link is-rounded">Invite someone to your events</button>
        </div>
        <div v-if="invites.length > 0" class="card">
            <div class="card-header">
                <p class="card-header-title">My invites</p>
            </div>
            <div v-for="(invite) in invites[0]" :key="invite.id" class="card-content">
                <div class="invite-section">
                    <h3 class="title is-4">{{ invite.event.title }} </h3>
                    <h3 class="subtitle is-5"> {{ new Date(Date.parse(invite.event.initialDate)).toLocaleDateString('pt-br',
                        options) }} - {{ new Date(Date.parse(invite.event.finalDate)).toLocaleDateString('pt-br', options)
    }}
                    </h3>
                    <h4 class="subtitle is-6">{{ invite.event.description }}</h4>
                    <div class="invite-button-section">
                        <button @click="acceptInvite(invite.id)" class="button is-success is-rounded">Accept</button>
                        <button @click="declineInvite(invite.id)" class="button is-danger is-rounded">Decline</button>
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
    data: () => ({
        invites: [],
        userId: '',
        apiUrl: 'http://localhost:5001',
        options: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    }),
    created() {
        this.userId = localStorage.getItem('userId')
        var token = localStorage.getItem('token')

        axios.defaults.headers.common['Authorization'] = token
        axios.get(`${this.apiUrl}/userInvites/${this.userId}`)
            .then((inviteResponse) => {
                this.invites.push(inviteResponse.data)
                console.log(inviteResponse)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    methods: {
        acceptInvite(inviteId) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            axios.post(`${this.apiUrl}/invite/accept`, {
                inviteId: inviteId,
                invitedId: this.userId
            })
                .then((response) => {
                    window.location.reload()
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        declineInvite(inviteId) {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            axios.post(`${this.apiUrl}/invite/decline`, {
                inviteId: inviteId,
                invitedId: this.userId
            })
                .then((response) => {
                    window.location.reload()
                    console.log(response)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        goToCreateInvitePage() {
            this.$router.push({ name: 'CreateInvite' })
        }
    }
}

</script>

<style scoped>
.invite-someone-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2rem;
}

.invite-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 66%;
    margin: auto;
    padding: 1rem;
    padding: 1rem;
    border-radius: 16px;
    background-color: rgb(10, 85, 35, 0.3);
    color: darkgray
}

.button {
    margin: 0.5rem;
}

.card-header-title {
    color: rgb(10, 85, 35);
}

.card-header {
    background-color: rgb(130, 200, 170);
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
    border: solid 1px darkgray;
}

.card {
    background-color: rgb(200, 255, 225);
    border-radius: 16px;
    box-shadow: 0 0 16px 16px rgba(0, 0, 0, 0.3);
    width: 80%;
    margin: auto;
}
</style>