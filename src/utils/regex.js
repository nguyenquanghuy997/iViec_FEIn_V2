export const CHECK_NUMBER = /^\d+$/;
export const CHECK_PHONE = /^\d{3}-\d{4}-\d{4}$|^\d{11}$/;
export const CHECK_POST_CODE = /^[0-9, -]+$/;
export const CHECK_WHITESPACE =!/^\s*$/;
export const CHECK_EMAIL=/^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/gi