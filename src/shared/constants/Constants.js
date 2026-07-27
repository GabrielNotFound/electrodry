const IS_DEV = true;

const PROD_URL = "";
const DEV_URL = "";

const BASE_DEV = {
  API_OK: 1,
  API_NOT_OK: 0,

  API_KEY: "REPLACE_WITH_YOUR_API_KEY",
  BASE_URI: IS_DEV ? DEV_URL : PROD_URL,

  ENDPOINT: {
    // AUTH
    LOGIN: "auth/login/",
    GET_USER_DETAILS: "auth/get_user_details/",

    // BOOKINGS
    GET_BOOKING_LIST: "booking/get_list/",
    GET_BOOKING_DETAILS: "booking/get_details/",
    UPDATE_BOOKING_STATUS: "booking/update_status/",

    // PRE-INSPECTION
    SUBMIT_PRE_INSPECTION: "inspection/submit/",
    UPLOAD_INSPECTION_PHOTO: "inspection/upload_photo/",

    // RECONCILIATION / REPORTS
    GET_DAILY_RECONCILIATION: "reports/daily_reconciliation/",
    GET_WEEKLY_REPORT: "reports/weekly/",
  },
};

const Constants = { ...BASE_DEV, IS_DEV };

export default Constants;
