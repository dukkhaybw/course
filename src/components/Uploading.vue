<template>
  <div>
    <input type="file" accept="image/*"  @change='change' ref='fileInput'>
  </div>
</template>

<script>
export default {
  methods: {
    change(e){
      let file = e.target.files[0]
      let fd = new FormData()
      fd.append('file',file)
      this.$emit('change',fd)
    },
    show(){
      this.$refs.fileInput.click()
    }
  },
}
</script>

<style>

</style>