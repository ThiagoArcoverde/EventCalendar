<template>
    <div class="header">
        <button @click="goToHome" class="button is-success is-medium">Home</button>
        <button @click="goToEvents" class="button is-success is-medium">Events</button>
        <button @click="goToCalendar" class="button is-success is-medium">Calendar</button>
        <button @click="goToInvites" class="button is-success is-medium">Invites</button>
        <button @click="goToProfile" class="button is-success is-medium">Profile</button>
    </div>
</template>

<script>
export default {
    methods: {
        goToHome() {
            this.$router.push({ name: 'Home' })
        },
        goToEvents() {
            this.$router.push({ name: 'Events' })
        },
        goToCalendar() {
            this.$router.push({ name: 'Calendar' })

        },
        goToInvites() {
            this.$router.push({ name: 'Invite' })
        },
        goToProfile() {
            this.$router.push({ name: 'Profile' })
        }
    }
}
</script>

<style scoped>
.header {
    padding: 1rem;
    padding-left: 2%;
    padding-right: 2%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    height: 12vh;
    margin-bottom: 5%;
    background-color: #202020;
}

.button {
    border-radius: 8px;
    width: 12rem;
}

@media screen and (max-width: 800px) {
    .header {
        flex-direction: column;
        height: 40vh;
    }

    .button {
        margin-bottom: 1%;
        width: 24rem;
    }
}
</style>