<template>
    <div class="navbar">
        <div
            @click="$router.push('/')"
            @keydown="$router.push('/')"
        >
            Vue 3
        </div>
        <div class="navbarBtns">
            <my-button @click="$router.push('/posts')">
                Посты
            </my-button>
            <my-button @click="$router.push('/store')">
                Store
            </my-button>
            <my-button
                style="margin-left: 20px"
                @click="$router.push('/about')"
            >
                О приложении
            </my-button>
        </div>
    </div>
</template>

<script>

export default {
  name: 'NavbarApp'
};
</script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  background: $primaryLight;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbarBtns {
  margin-left: auto;

}
</style>
