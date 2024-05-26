<template>
    <div class="receipt-popup">
        <div class="popup-content">
            <button class="close-btn" @click="$emit('close')">X</button>
            <h2>Receipt</h2>
            <ul>
                <li v-for="item in items" :key="item.id">{{ item.title }} - {{ item.price }} EGP</li>
            </ul>
            <div class="total-price">
                Total: {{ total }} EGP
            </div>
            <button @click="$emit('confirm')">Confirm Purchase</button>
        </div>
    </div>
</template>

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
};
</script>

<style lang="scss">
.receipt-popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
    position: relative;
    color: black;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: black; /* Change text color to black */
}

button {
    margin: 20px;
}
</style>