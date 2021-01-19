<template>
 <div>
 <p v-if="show">显示第一页</p>
 <p v-else>显示第二页</p>
 <button @click="dian">点我</button>
 </div>
</template>

<script>
export default {
 data () {
 return {
     show:true
 }
 },

 components: {},

 methods: {
     dian(){
         this.show=!this.show
     }
 }
}
</script>

<style scoped>
</style>