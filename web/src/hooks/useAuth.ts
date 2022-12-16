import { ref } from 'vue';
import useApi from './useApi';

const SESSION_VARIABLE_NAME = 'eInsSession';

export interface Session {
  user: {
    userId: string;
    email: string;
    picture: string;
    firstName: string;
    lastName: string;
  };
  userRole: string[];
}

const useAuth = () => {
  const sessionToken = ref<string>('');
  const session = ref<Session>();
  const loading = ref<boolean>(false);
  const { get } = useApi();

  const storeToken = (token: string) => {
    if (token) {
      localStorage.removeItem(SESSION_VARIABLE_NAME);
      localStorage.setItem(SESSION_VARIABLE_NAME, token);
      getSession();
    }
  };

  const getLocalSession = () => {
    const token = localStorage.getItem(SESSION_VARIABLE_NAME);
    return token;
  };

  const getSession = async () => {
    let success = false;
    loading.value = true;
    const token = getLocalSession();
    if (token) {
      sessionToken.value = token;
      const profile = await get('/user/profile', token);
      if (profile?.status === 200) {
        success = true;
        session.value = profile.data;
      }
    }
    loading.value = false;
    return success;
  };

  const clearSession = () => {
    sessionToken.value = '';
    localStorage.removeItem(SESSION_VARIABLE_NAME);
  };

  return {
    storeToken,
    session,
    getSession,
    getLocalSession,
    clearSession,
    loading
  };
};

export default useAuth;
