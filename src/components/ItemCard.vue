<template>
    <div class="item-card">
        <img :src="item.image" alt="item.name" />
        <h3>{{ item.name }}</h3>
        <p>{{ item.price }} EGP</p>
        <button @click="toggleCartItem">
            {{ inCart ? 'Remove' : 'Add' }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'ItemCard',
    props: {
        item: Object,
        inCart: Boolean,
    },
    methods: {
        toggleCartItem() {
            if (this.inCart) {
                this.$emit('remove', this.item);
            } else {
                this.$emit('add', this.item);
            }
        },
    },
};
</script>

<style lang="scss">
.item-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .item-image {
        width: 100px;
        height: 100px;
    }

    .item-details {
        text-align: center;
    }

    button {
        margin-top: 10px;
    }
}
</style>