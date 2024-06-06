export const findBotUsername = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const botUsername = urlParams.get('bot_username');
  // const botUsername = 'binarkagogogo_bot';

  return botUsername;
};
