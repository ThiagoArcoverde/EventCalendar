<template>
    <div class="container">
        <div class="title is-medium">Register Success</div>
        <div class="content">
            <p>
                You have successfully registered. Please login to continue
            </p>
        </div>
        <button @click="goToLogin" class="button is-success is-medium">Login</button>
    </div>
</template>

<script>
export default{
    methods:{
        goToLogin(){
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.title {
    padding-top: 25%;
    color: white
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.button {
    width: 8rem;
}
</style>