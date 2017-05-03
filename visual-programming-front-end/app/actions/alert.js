export const ALERT_SHOW = 'ALERT_SHOW';

const showAlert = (text) => {
  return {
    type: ALERT_SHOW,
    text,
  };
};

export { showAlert };
