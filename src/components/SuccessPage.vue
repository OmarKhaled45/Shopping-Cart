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
    --img-width: 72px;
    --title-fs: 24px;
    --text-fs: 12px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    height: 100dvh;
    height: 100svh;

    @media (min-width: 576px) {
        --img-width: 100px;
        --title-fs: 28px;
        --text-fs: 14px;
    }

    @media (min-width: 768px) {
        --img-width: 130px;
        --title-fs: 32px;
        --text-fs: 16px;
    }

    &>* {
        margin-top: 0;
        text-align: center;
    }

    h1 {
        font-size: var(--title-fs);
        color: #223263;
    }

    p {
        font-size: var(--text-fs);
    }

    img {
        width: var(--img-width);
        height: var(--img-width);
    }
}
</style>

<template>
    <div class="success-page sec-spacing">
        <img src="../assets/img/success.svg" alt="success icon">
        <h1>Success!</h1>
        <p>Your purchase was successful!</p>
        <p>You will be redirected to the home page shortly.</p>
    </div>
</template>