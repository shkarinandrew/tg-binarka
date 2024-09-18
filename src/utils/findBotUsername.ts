export const findBotUsername = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const botUsername = urlParams.get('bot_username');

  return botUsername;
};
