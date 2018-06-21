<template>
	<div id="app">
		<div id="cover"></div>
		<Header></Header>
    <!-- <Todo></Todo> -->
    <router-link :to='{name: "app"}'>app</router-link>
    <router-link to='/login/123'>login123</router-link>
    <router-link to='/login/456'>login456</router-link>
    <!-- <router-link to='/login/exact'>login exact</router-link> -->
    <transition name="fade">
      <router-view />
    </transition>
		<Footer></Footer>
	</div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'
export default {
  components: {
    Header,
    // Todo,
    Footer
  }
}
</script>

<style lang="stylus" scoped>
    .fade-enter-active, .fade-leave-active{
      transition: opacity 0.5s
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */{
      opacity: 0
    }
    #app {
        position absolute
        left 0
        right 0
        top 0
        bottom 0
    }

    #cover {
        position absolute
        left 0
        top 0
        right 0
        bottom 0
        background-color #999
        opacity .9
        z-index -1
    }
</style>
