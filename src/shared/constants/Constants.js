const IS_DEV = true;

const DEV_URL = "https://edry.escarez.com/api2/";
const PROD_URL = "";

const Constants = {
  IS_DEV,
  BASE_URI: IS_DEV ? DEV_URL : PROD_URL,

  API_OK: 1,
  API_NOT_OK: 0,

  ENDPOINT: {
    // AUTH
    LOGIN: "mobile/auth/login/",
    REFRESH: "mobile/auth/refresh/",
    LOGOUT: "mobile/auth/logout/",
    ME: "mobile/auth/me/",

    // BOOKINGS
    GET_BOOKING: (bookingId) => `mobile/bookings/${bookingId}/`,
    FINISH_BOOKING: (bookingId) => `mobile/bookings/${bookingId}/finish/`,
    GET_TECHNICIAN_BOOKINGS: (technicianId) =>
      `mobile/bookings/technician/${technicianId}/`,
  },
};

export default Constants;
