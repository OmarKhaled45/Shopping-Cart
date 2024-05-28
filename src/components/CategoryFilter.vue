<script>
export default {
    name: 'CategoryFilter',
    props: {
        categories: {
            type: Array,
            required: true,
        },
        modelValue: {
            type: [String, Number],
            default: '',
        },
    },
    computed: {
        selected: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit('update:modelValue', value);
            },
        },
    },
};
</script>

<style lang="scss">
.category-filter {
    display: flex;
    align-items: center;
    gap: .75rem;
}

select {
    --px: 1rem;
    --py: .5rem;

    position: relative;
    border: 2px solid #e2e2e2;
    background-color: transparent;
    border-radius: 5px;
    padding: var(--py) calc(var(--px) * 1.5) var(--py) var(--px);
    -moz-appearance:none; /* Firefox */
    -webkit-appearance:none; /* Safari and Chrome */
    appearance:none;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOSIgaGVpZ2h0PSI1IiB2aWV3Qm94PSIwIDAgOSA1IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8cGF0aCBkPSJNNC41MzA5OCA0LjU2MDU1TDAuODQ3MTY4IDAuNTYwNTQ3SDguMjE1ODhMNC41MzA5OCA0LjU2MDU1WiIgZmlsbD0iIzIyMjYyQSIvPgo8L3N2Zz4K);
    background-position: calc(100% - calc(var(--px) * .5)) 50%;
    background-repeat: no-repeat;
    background-size: auto;

    &:focus {
        outline: 2px solid #d1d1d1;
    }
}

select::-ms-expand {
    display: none; /* Internet Explorer 10 and Internet Explorer 11 */
}

/* Target Internet Explorer 9 to undo the custom arrow */
@media screen and (min-width:0\0) {
    select {
        background-image:none\9;
        padding: 5px\9;
    }
}
</style>

<template>
    <div class="category-filter">
        <label for="category" id="cat-lbl">Filter by Category:</label>
        <select id="category" aria-labelledby="#cat-lbl" v-model="selected">
            <option value="" aria-label="All Categories">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id" :aria-label="category.name">
                {{ category.name }}
            </option>
        </select>
    </div>
</template>