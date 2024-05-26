<template>
    <div>
        <h1>Items List</h1>
        <CategoryFilter :categories="categories" v-model="selectedCategory" />
        <div>{{ selectedCategory }}</div>
        <div class="item-list">
            <ItemCard v-for="item in filteredItems" :key="item.id" :item="item" @add="addToCart"
                @remove="removeFromCart" :in-cart="isInCart(item)" />
        </div>
        <div class="total-price">
            Total: {{ totalPrice }} EGP
        </div>
        <button @click="showReceiptPopup">Buy</button>
        <ReceiptPopup v-if="showReceipt" :items="cart" :total="totalPrice" @close="closePopup"
            @confirm="confirmPurchase" />
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import CategoryFilter from './CategoryFilter.vue';
import ItemCard from './ItemCard.vue';
import ReceiptPopup from './ReceiptPopup.vue';
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
        const categories = ref([
            { id: 1, name: 'Category 1' },
            { id: 2, name: 'Category 2' },
            { id: 3, name: 'Category 3' },
        ]);
        const cart = ref(JSON.parse(localStorage.getItem('cart')) || []);
        const showReceipt = ref(false);
        const selectedCategory = ref('');

        const filteredItems = computed(() => {
            if (selectedCategory.value) {
                return items.value.filter(item => item.categoryId === selectedCategory.value);
            }
            return items.value;
        });

        const saveCartToLocalStorage = () => {
            localStorage.setItem('cart', JSON.stringify(cart.value));
        };

        const addToCart = (item) => {
            if (!cart.value.find(cartItem => cartItem.id === item.id)) {
                cart.value.push(item);
                saveCartToLocalStorage();
            }
        };

        const removeFromCart = (item) => {
            const index = cart.value.findIndex(cartItem => cartItem.id === item.id);
            if (index > -1) {
                cart.value.splice(index, 1);
                saveCartToLocalStorage();
            }
        };

        const isInCart = (item) => {
            return cart.value.some(cartItem => cartItem.id === item.id);
        };

        const totalPrice = computed(() => {
            return cart.value.reduce((total, item) => total + item.price, 0);
        });

        const showReceiptPopup = () => {
            showReceipt.value = true;
        };

        const closePopup = () => {
            showReceipt.value = false;
        };

        const confirmPurchase = () => {
            closePopup();
            localStorage.removeItem('cart');
            cart.value = [];
            router.push('/success');
        };

        watch(cart, saveCartToLocalStorage, { deep: true });

        return {
            items,
            categories,
            cart,
            showReceipt,
            selectedCategory,
            filteredItems,
            addToCart,
            removeFromCart,
            isInCart,
            totalPrice,
            showReceiptPopup,
            closePopup,
            confirmPurchase,
        };
    },
};
</script>

<style scoped lang="scss">
.item-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}
.total-price {
    font-weight: bold;
    margin: 20px 0;
}
</style>