<template>
        <div class="container">
            <div class="title is-medium">Edit Success</div>
            <div class="content">
                <p>
                    You have successfully changed your information.
                </p>
            </div>
            <button @click="goToProfile" class="button is-success is-medium">Continue</button>
        </div>
</template>

<script>
export default {
    methods: {
        goToProfile() {
            this.$router.push('/profile')
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