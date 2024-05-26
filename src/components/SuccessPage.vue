<template>
    <div class="success-page">
        <h1>Success!</h1>
        <p>Your purchase was successful.</p>
        <p>You will be redirected to the home page shortly.</p>
    </div>
</template>

<script>
export default {
    name: 'SuccessPage',
    mounted() {
        setTimeout(() => {
            this.$router.push('/');
        }, 5000); // 5 seconds
    },
};
</script>

<style scoped lang="scss">
.success-page {
    text-align: center;
    margin-top: 50px;
}
</style>