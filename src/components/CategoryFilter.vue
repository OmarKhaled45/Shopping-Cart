<template>
    <select v-model="selected" @change="updateCategory">
        <option value="">All Categories</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
    </select>
</template>

<script>
export default {
    props: ['categories', 'modelValue'],
    computed: {
        selected: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            }
        }
    },
    methods: {
        updateCategory() {
            this.$emit('update:modelValue', this.selected);
        }
    }
};
</script>

<style lang="scss">
.category-filter {
    margin: 10px 0;

    select {
        padding: 5px;
        border: 1px solid #ccc;
    }
}
</style>