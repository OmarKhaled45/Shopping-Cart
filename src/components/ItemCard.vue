<script>
export default {
    name: 'ItemCard',
    props: {
        item: {
            type: Object,
            required: true,
        },
        inCart: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        handleClick() {
            this.$emit(this.inCart ? 'remove' : 'add', this.item);
        },
        formatPrice(value) {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(value);
        },
    }
};

</script>

<style lang="scss">
.item-card {
    --card-padding-x: 10px;
    --card-padding-y: 10px;
    --card-header-bg: #F6F7F8;
    --title-color: #223263;
    --price-color: #40BFFF;
    --card-br: 5px;
    --card-max-height: 100%;
    --text-fs: 12px;
    --img-height: 130px;
    --img-width: 130px;

    background-color: #fff;
    border: 3px solid var(--card-header-bg);
    border-radius: var(--card-br);
    display: flex;
    flex-direction: column;
    height: var(--card-max-height);
    box-shadow: 0px 4px 4px rgba(30, 84, 157, 0.125), inset 0px 0px 4px rgba(0, 0, 0, 0.1);
    // box-shadow: 0px 4px 10px 0px rgba(30, 84, 157, 0.15), inset 0px 0px 4px rgba(0, 0, 0, 0.1);

    @media (min-width: 375px) {
        --card-padding-x: 14px;
    }

    @media (min-width: 576px) {
        --text-fs: 18px;
        --img-height: 140px;
        --img-width: auto;
        --card-padding-x: 18px;
    }

    @media (min-width: 768px) {
        --card-padding-x: 22px;
    }

    .card-header,
    .card-body,
    .card-footer {
        padding: var(--card-padding-y) var(--card-padding-x);
    }

    .card-header {
        background-color: var(--card-header-bg);
        display: grid;
        place-items: center;

        @media (min-width: 576px) {
            padding: 2.5rem var(--card-padding-x) 2.5rem var(--card-padding-x);
        }

        img {
            width: var(--img-width);
            height: var(--img-height);
            object-fit: contain;
        }
    }

    .card-body {
        padding-top: 10px;
    }

    .card-footer {
        padding-top: 0;
        display: flex;
        justify-content: center;
        margin-top: auto;
    }

    .card-body,
    .card-footer {
        @media (min-width: 576px) {
            padding-bottom: 1rem;
        }
    }

    h3 {
        font-size: var(--text-fs);
        font-weight: bold;
        width: 100%;
        text-align: center;
        color: var(--title-color);
        margin: 0 auto 6px auto;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    p {
        font-size: var(--text-fs);
        font-weight: bold;
        width: max-content;
        color: var(--price-color);
        margin: 0 auto;
    }

    .item-image {
        width: 100px;
        height: 100px;
    }

    .item-details {
        text-align: center;
    }
}
</style>

<template>
    <div class="col">
        <div class="item-card" :aria-label="item.title">
            <div class="card-header" :title="item.title">
                <img :src="item.image" loading="lazy" :alt="item.name">
            </div>
            <div class="card-body">
                <h3>{{ item.name }}</h3>
                <p>{{ formatPrice(item.price) }} EGP</p>
            </div>
            <div class="card-footer">
                <button type="button" :aria-label="inCart ? 'Remove' : 'Add'" :class="inCart ? 'btn-remove' : 'btn-add'"
                    @click="handleClick">
                    {{ inCart ? 'Remove' : 'Add' }}
                </button>
            </div>
        </div>
    </div>
</template>