<script lang="ts">
  import styles from './login.module.scss';
  import logo from '@/assets/images/colored-elite-logo.png';
  import LoginActions from '@/components/login/loginActions.vue';

  export default {
    components: {
      LoginActions
    },
    setup(_, { emit }) {
      const login = () => {
        emit('login');
      };

      return { styles, logo, login };
    }
  };
</script>

<template>
  <section>
    <div class="mt-0 mb-0" :class="styles.pageContainer">
      <section class="has-text-centered" :class="styles.logo">
        <div class="columns">
          <div class="column">
            <img :src="logo" />
          </div>
        </div>
      </section>
      <LoginActions @login="login" />
    </div>
  </section>
</template>
