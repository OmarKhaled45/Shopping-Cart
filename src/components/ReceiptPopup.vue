<script>
export default {
    name: 'ReceiptPopup',
    props: {
        items: {
            type: Array,
            required: true,
        },
        total: {
            type: Number,
            required: true,
        },
    },
    methods: {
        formatPrice(value) {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(value);
        },
    },
};
</script>

<style lang="scss">
@use 'sass:color';
@use '../assets/scss/colors' as *;

.receipt-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-content {
    --header-fs: 20px;
    --text-fs: 14px;
    --close-icon-w: 18px;
    --px: 1rem;
    --py: 1rem;
    --v-spacing: 12px;

    background: white;
    border-radius: 5px;
    text-align: center;
    position: relative;
    color: black;
    max-width: 90%;
    padding: var(--py) var(--px);

    @media (min-width: 460px) {
        --px: 2rem;
        --py: 1.5rem;
    }

    @media (min-width: 576px) {
        --header-fs: 24px;
        --text-fs: 16px;
        --close-icon-w: 22px;
        --px: 3rem;
        --py: 2rem;
        --v-spacing: 1rem;
    }

    @media (min-width: 768px) {
        --header-fs: 28px;
        --text-fs: 18px;
        --close-icon-w: 26px;
        --px: 3.5rem;
        --py: 2.5rem;
        --v-spacing: 1.25rem;

        max-width: 75%;
    }

    @media (min-width: 992px) {
        --header-fs: 32px;
        --text-fs: 24px;
    }

    @media (min-width: 1200px) {
        --px: 4rem;
        --py: 3rem;
        --v-spacing: 2rem;

        max-width: 65%;
    }

    @media (min-width: 1400px) {
        max-width: 50%;
    }
}

.popup-header {
    padding-bottom: var(--v-spacing);

    h2 {
        font-size: var(--header-fs);
        font-weight: 600;
        color: color.scale($primary-blue, $lightness: 30%);
        margin: 0;
    }
}

.popup-body {
    max-height: 50vh;
    max-height: 50dvh;
    max-height: 50svh;
    overflow-y: auto;
    margin-bottom: var(--v-spacing);
}

.popup-footer {
    .total-price {
        justify-content: center;
        margin: calc(var(--v-spacing) * 1.5) 0 calc(var(--v-spacing) * .5) 0;
    }
}

.close-btn {
    position: absolute;
    top: calc(var(--py) * .5);
    right: calc(var(--px) * .5);
    background-color: transparent !important;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: black;
    padding: 0;
    min-width: unset;


    svg {
        fill: color.scale($primary-blue, $lightness: 30%);
        opacity: .85;
        width: var(--close-icon-w);
        height: var(--close-icon-w);
    }

    &:hover {
        svg {
            opacity: 1;
        }
    }
}
</style>

<template>
    <div class="receipt-popup">
        <div class="popup-content">
            <button type="button" class="close-btn" @click="$emit('close')" aria-label="close popup">
                <svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="1"
                        d="M17.4919 11.7454L24.5942 18.1825C25.0203 18.5687 25.2334 19.0837 25.2334 19.5987C25.2334 20.178 25.0203 20.693 24.5942 21.0792L23.0317 22.4954C22.5345 22.8816 21.9664 23.0747 21.3982 23.0747C20.759 23.0747 20.2618 22.8816 19.8357 22.4954L12.7334 16.0582L5.63113 22.4954C5.20499 22.8816 4.63681 23.0747 4.06863 23.0747C3.42942 23.0747 2.86124 22.8816 2.4351 22.4954L0.872603 21.0792C0.446467 20.693 0.233398 20.178 0.233398 19.5987C0.233398 19.0837 0.446467 18.5687 0.872603 18.1825L7.97488 11.7454L0.872603 5.30824C0.446467 4.92201 0.233398 4.47141 0.233398 3.89207C0.233398 3.3771 0.446467 2.86213 0.872603 2.41153L2.4351 0.995358C2.86124 0.60913 3.42942 0.416016 4.06863 0.416016C4.63681 0.416016 5.20499 0.60913 5.63113 0.995358L12.7334 7.43249L19.8357 0.995358C20.2618 0.60913 20.759 0.416016 21.3982 0.416016C21.9664 0.416016 22.5345 0.60913 23.0317 0.995358L24.5942 2.41153C25.0203 2.86213 25.2334 3.3771 25.2334 3.89207C25.2334 4.47141 25.0203 4.92201 24.5942 5.30824L17.4919 11.7454Z" />
                </svg>
            </button>
            <div class="popup-header" v-if="items.length">
                <h2>Receipt</h2>
            </div>
            <div class="popup-body">
                <div class="table-responsive">
                    <table class="table" v-if="items.length" aria-label="Receipt">
                        <thead>
                            <tr>
                                <th scope="col">PRODUCT</th>
                                <th scope="col">PRICE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in items" :key="item.id">
                                <td>
                                    <div class="item-cont" :aria-label="item.name + ' costs ' + formatPrice(item.price) + ' EGP'">
                                        <div class="img-cont">
                                            <img :src="item.image" :alt="item.title">
                                        </div>
                                        {{ item.name }}
                                    </div>
                                </td>
                                <td>
                                    {{ formatPrice(item.price) }} EGP
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="popup-footer">
                <div class="total-price" v-if="items.length" :aria-label="'Total price is ' + formatPrice(total) + ' EGP'">
                    <span>TOTAL:</span>
                    <span>{{ formatPrice(total) }} EGP</span>
                </div>
                <h2 v-if="!items.length">The cart is Empty!</h2>
                <button type="button" class="btn-lg" :class="!items.length ? 'btn-back' : ''"
                    @click="items.length ? $emit('confirm') : $emit('close')" :aria-label="items.length ? 'Confirm Purchase' : 'Back'">
                    {{ items.length ? 'Confirm Purchase' : 'Back' }}
                </button>
            </div>
        </div>
    </div>
</template>