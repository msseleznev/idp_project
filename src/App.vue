<template>
    <div>
        <navbar-app />
        <div class="app">
            <router-view />
        </div>
    </div>
</template>

<script>
import NavbarApp from '@/components/NavbarApp';

export default {
  components: { NavbarApp }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
  padding: 20px;
}
</style>
