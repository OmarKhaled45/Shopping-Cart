<script>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import CategoryFilter from '../components/CategoryFilter.vue';
import ItemCard from '../components/ItemCard.vue';
import ReceiptPopup from '../components/ReceiptPopup.vue';
import data from '../data/items.json';

export default {
    name: 'HomePage',
    components: {
        CategoryFilter,
        ItemCard,
        ReceiptPopup,
    },
    setup() {
        const router = useRouter();
        const items = ref(data);
        const selectedCategory = ref('');

        // demo category list - should be dynamically created based on the item list
        const categories = ref([
            { id: 1, name: 'Samsung' },
            { id: 2, name: 'HP' },
            { id: 3, name: 'Joyroom' },
        ]);

        const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);
        const showReceipt = ref(false);

        const filteredItems = computed(() =>
            selectedCategory.value
                ? items.value.filter(item => item.categoryId === parseInt(selectedCategory.value))
                : items.value
        );

        const selectedCategoryName = computed(() => {
            const category = categories.value.find(
                category => category.id === parseInt(selectedCategory.value)
            );
            return category ? category.name : 'All Categories';
        });

        const totalPrice = computed(() =>
            cart.value.reduce((acc, item) => acc + item.price, 0)
        );

        const addToCart = item => {
            cart.value.push(item);
            updateLocalStorage();
        };

        const removeFromCart = item => {
            cart.value = cart.value.filter(cartItem => cartItem.id !== item.id);
            updateLocalStorage();
        };

        const isInCart = item => cart.value.some(cartItem => cartItem.id === item.id);

        const showReceiptPopup = () => {
            showReceipt.value = true;
            document.body.classList.add('popup-open')
        };

        const closePopup = () => {
            showReceipt.value = false;
            document.body.classList.remove('popup-open')
        };

        const confirmPurchase = () => {
            showReceipt.value = false;
            localStorage.removeItem('cart');
            router.push('/success');
            document.body.classList.remove('popup-open')
        };

        const updateLocalStorage = () => {
            localStorage.setItem('cart', JSON.stringify(cart.value));
        };

        watch(cart, updateLocalStorage, { deep: true });

        const formatPrice = value => {
            return new Intl.NumberFormat('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(value);
        };

        return {
            items,
            selectedCategory,
            categories,
            selectedCategoryName,
            cart,
            showReceipt,
            filteredItems,
            totalPrice,
            addToCart,
            removeFromCart,
            isInCart,
            showReceiptPopup,
            closePopup,
            confirmPurchase,
            formatPrice,
        };
    },
};
</script>

<style scoped lang="scss">
@use 'sass:color';
@use '../assets/scss/colors' as *;

.item-list {
    --g-x: 16px;
    --g-y: 16px;

    display: grid;
    grid-template-columns: minmax(0, 1fr);

    @media (min-width: 414px) {
        --g-x: 20px;
        --g-y: 20px;

        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 460px) {}

    @media (min-width: 576px) {
        --g-x: 26px;
        --g-y: 26px;
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    @media (min-width: 992px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

.total-cont {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;

    .total-price {
        font-weight: 600;
    }

    @media (min-width: 768px) {
        justify-content: space-between;
    }
}

.v-enter-active,
.v-leave-active {
    transition: opacity 0.15s ease-in-out;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.category-cont {
    --pb: var(--sec-spacing-bottom);

    display: flex;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;
    column-gap: 48px;
    row-gap: 1rem;
    background-color: #F6F7F8;
    padding: 20px;
    margin-top: calc(var(--sec-spacing-top) * .8);
    margin-bottom: calc(var(--pb) * 1.1);

    * {
        font-size: 12px;
    }

    @media (min-width: 414px) {
        margin-bottom: calc(var(--pb) * 1.3);

        * {
            font-size: 14px;
        }
    }

    @media (min-width: 576px) {
        margin-top: calc(var(--sec-spacing-top) * 1);
        margin-bottom: calc(var(--pb) * 1.6);
        margin-right: var(--sec-spacing-x);
        margin-left: var(--sec-spacing-x);

        * {
            font-size: 16px;
            font-weight: normal;
        }
    }

    @media (min-width: 768px) {
        margin-top: calc(var(--sec-spacing-top) * .4);
        margin-bottom: calc(var(--pb) * .8);
    }
    
    @media (min-width: 992px) {
        margin-bottom: calc(var(--pb) * .6);
    }

    .selected {
        display: flex;
        align-items: center;
        gap: .5rem;
    }

    .selected-cat {
        width: max-content;
        min-width: 75px;
        height: auto;
        padding: .5rem .75rem;
        text-align: center;
        border: 2px solid $primary-blue;
        color: color.scale($primary-blue, $lightness: -25%);
        border-radius: 50px;
        background-color: transparent;
    }
}
</style>

<template>
    <main class="main-cont">
        <div class="container bg-primary page-header">
            <!-- <h1 class="text-white">Shopping Cart Demo</h1> -->
            <h1 class="text-white" aria-label="Selected Category">{{ selectedCategoryName }}</h1>
        </div>
        <div class="container category-cont">
            <CategoryFilter :categories="categories" v-model="selectedCategory" />
            <!-- <div class="selected">
                <span>Selected Category:</span>
                <div class="selected-cat">
                    <span>{{ selectedCategoryName }}</span>
                </div>
            </div> -->
        </div>
        <div class="item-list row sec-spacing pt-0">
            <ItemCard v-for="item in filteredItems" :key="item.id" :item="item" @add="addToCart"
                @remove="removeFromCart" :in-cart="isInCart(item)" />
        </div>
        <div class="container bg-primary total-cont mt-auto">
            <div class="total-price text-white" :aria-label="'Total price is ' + formatPrice(totalPrice) + ' EGP'">
                <span>TOTAL PRICE:</span>
                <span>{{ formatPrice(totalPrice) }} EGP</span>
            </div>
            <button type="button" class="btn-lg btn-white" @click="showReceiptPopup" aria-label="buy">Buy</button>
            <Transition>
                <ReceiptPopup v-if="showReceipt" :items="cart" :total="totalPrice" @click.self="closePopup"
                    @close="closePopup" @confirm="confirmPurchase" :aria-hidden="!showReceipt" />
            </Transition>
        </div>
    </main>
</template>