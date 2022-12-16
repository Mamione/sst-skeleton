import { provide } from 'vue';

const useNotification = () => {
  const show = (text: string, position?: string, buttonText?: string, buttonIcon?: string, action?: () => void) => {
    provide('notificationText', text);
    provide('notificationPosition', position);
    provide('notificationButtonText', buttonText);
    provide('notificationButtonIcon', buttonIcon);
    provide('notificationAction', action);
  };

  return {
    show
  };
};

export default useNotification;
