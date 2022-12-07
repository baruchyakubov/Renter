<template>
    <el-select-v2 v-model="value" filterable :options="options" placeholder="Please select" style="width: 240px"
        multiple />
</template>
  
<script>
export default {
    // data() {
    //     return {
    //         initials: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
    //         options: this.getOptions()
    //     }
    // },
    // methods: {
    //     getOptions() {
    //        return Array.from({ length: 1000 }).map((_, idx) => ({
    //             value: `Option${idx + 1}`,
    //             label: `${this.initials[idx % 10]}${idx}`,
    //         }))
    //     }
    // }
}

</script>


