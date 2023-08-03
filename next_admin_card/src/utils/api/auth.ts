export const AUTH_TOKEN = '@token_admin_card_pj';
export const USER_INFO = '@admin_card_pj_info';

export const isLogin = () => {
  return (
    !!localStorage.getItem(USER_INFO) && !!localStorage.getItem(AUTH_TOKEN)
  );
};
