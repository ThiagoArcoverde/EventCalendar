<template>
    <headerbuttons />
    <div class="container">
        <div class="card">
            <div class="card-header">
                <p class="card-header-title title is-2">Create a new event</p>
            </div>
            <div class="card-content">
                <h4 class="subtitle is-4">Event title</h4>
                <input class="input" type="text" v-model="eventTitle">
                <h4 class="subtitle is-4">Event description</h4>
                <input class="input" type="text" v-model="eventDescription">
                <h4 class="subtitle is-4">Starting date and time</h4>
                <div class="date-section">
                    <input class="input date-input" type="date" timezone="pt-br" v-model="eventInitialDate">
                    <input class="input date-input" type="time" timezone="pt-br" v-model="eventInitialTime">
                </div>
                <h4 class="subtitle is-4">Ending date and time</h4>
                <div class="date-section">
                    <input class="input date-input" type="date" v-model="eventFinalDate">
                    <input class="input date-input" type="time" v-model="eventFinalTime">
                </div>
                <button @click="createEvent" class="button is-success is-rounded is-medium">Create event</button>
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
    data(){
        return{
            eventTitle: '',
            eventDescription: '',
            eventInitialDate: '',
            eventInitialTime: '',
            eventFinalDate: '',
            eventFinalTime: '',
            userId: ''
        }
    },
    methods:{
        createEvent(){
            this.userId = localStorage.getItem('userId')

            //validate title and description
            if(this.eventTitle == '' || this.eventDescription == ''){
                alert('Please fill the title and description fields')
                return
            }

            //validate initial date and time
            if(this.eventInitialDate == '' || this.eventInitialTime == ''){
                alert('Please fill the initial date and time fields')
                return
            }

            //validate final date and time
            if(this.eventFinalDate == '' || this.eventFinalTime == ''){
                alert('Please fill the final date and time fields')
                return
            }

            //parse date and time to the string format '2024-07-13T18:30:00'
            const initialDate = this.eventInitialDate + 'T' + this.eventInitialTime
            const finalDate = this.eventFinalDate + 'T' + this.eventFinalTime

            //create eventRequestObject
            const eventRequestObject = {
                title: this.eventTitle,
                description: this.eventDescription,
                initialDate: initialDate,
                finalDate: finalDate,
                userId: this.userId
            }

            console.log(initialDate)
            console.log(finalDate)

            //send eventRequestObject to backend using axios
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token')
            axios.post('http://localhost:5001/event', eventRequestObject)
                .then(() => {
                    alert('Event created successfully')
                    this.$router.push({name: 'Events'})
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
    width: 50%;
    background-color: rgb(200, 255, 225);
    border-radius: 16px;
    box-shadow: 0 0 16px 16px rgba(0, 0, 0, 0.3);
}

.my-events {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.date-section {
    display: flex;
    flex-direction: row;
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

.input {
    margin-bottom: 1rem;
}

.date-input{
    width: 40%;
    margin: auto;
    margin-bottom: 2rem;
}
</style>