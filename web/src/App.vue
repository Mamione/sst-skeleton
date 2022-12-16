<script lang="ts">
import '@/assets/main.scss';
import useAuth from './hooks/useAuth';
import { provide } from 'vue';

export default {
  components: {},
  setup() {
    const { getSession, session, loading } = useAuth();

    getSession();
    provide('session', session);

    return {
      loading,
      session,
      getSession
    };
  }
};
</script>

<template>
  <h1>Hello</h1>
</template>
