<template>
    <headerbuttons />
    <div class="container">
        <div class="calendar-container">
            <FullCalendar :options="calendarOptions" :events="calendarEvents" class="calendar full-calendar" />
        </div>
    </div>
</template>

<script>
import headerbuttons from '../components/HeaderButtons.vue'
import FullCalendar from '@fullcalendar/vue3'
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios'

export default {
    components: {
        headerbuttons,
        FullCalendar
    },
    data() {
        return {
            calendarOptions: {
                plugins: [timeGridPlugin, dayGridPlugin, interactionPlugin],
                initialView: 'dayGridWeek',
                events: [],
                headerToolbar: {
                    left: 'prev,next',
                    center: 'title',
                    right: 'timeGridDay,dayGridWeek',
                },
                eventColor: '#378006',
                allDaySlot: false,
                aspectRatio: 2.5,
                eventDisplay: 'block',
                displayEventTime: false

            },
            events: [],
            apiUrl: 'http://localhost:5001',
        }
    },
    created() {
        this.userId = localStorage.getItem('userId')
        console.log(this.userId)

        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        axios.get(`${this.apiUrl}/userEvents/${this.userId}`)
            .then(response => {
                this.events = response.data
                this.events.forEach(event => {
                    this.calendarOptions.events.push({
                        title: event.title,
                        start: event.initialDate,
                        end: event.finalDate
                    })
                })
            })
            .catch(error => {
                if (error.response.status == 401) {
                    this.$router.push({ name: 'Login' })
                    return
                }
            })

    },
}
</script>

<style scoped>
.calendar-container {
    width: 100%;
    margin: auto;
}

.container {
    width: 100%;
    height: 32rem;
}
</style>

<style>
.fc-event-title {
    white-space: normal !important;
}

.fc-timegrid-slot {
    overflow-x: hidden !important;
    border: none !important;
}

</style>