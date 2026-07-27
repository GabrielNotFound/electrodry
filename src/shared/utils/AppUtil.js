/* eslint-disable no-console */
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Application from "expo-application";
import * as Crypto from "expo-crypto";
import * as Device from "expo-device";
import * as Location from "expo-location";
import * as Network from "expo-network";
import { Linking, Platform } from "react-native";
import uuid from "react-native-uuid";

const AppUtil = {
  debug: function (string) {
    if (__DEV__) {
      console.log(string);
    }
  },

  debugDeep: function (string) {
    if (__DEV__) {
      console.log(JSON.stringify(string, null, 2));
    }
  },

  debugObjectLoop: function (obj) {
    if (__DEV__) {
      for (const key in obj) {
        console.debug(`${key}: ${obj[key]}`);
      }
    }
  },

  // Expo Network replaces react-native-network-info
  getDeviceIP: async function () {
    try {
      const ip = await Network.getIpAddressAsync();
      return ip;
    } catch (e) {
      return "";
    }
  },

  getGeoLocation: async function () {
    try {
      const locationPromise = Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error("Location request timed out"));
        }, 3000);
      });

      const position = await Promise.race([locationPromise, timeoutPromise]);
      return `${position.coords.latitude},${position.coords.longitude}`;
    } catch (e) {
      return "";
    }
  },

  getUnixTimestamp: function () {
    return Math.round(new Date().getTime() / 1000);
  },

  getHash: async function (modeType, string) {
    if (string == "") {
      string = this.getRandomWords(256) + this.getUnixTimestamp();
    }

    let hash = "";

    if (modeType == 256) {
      hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        string,
      );
    } else if (modeType == 512) {
      hash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA512,
        string,
      );
    }

    return hash;
  },

  getAppVersionNo: function () {
    return Application.nativeApplicationVersion;
  },

  getUUID: function () {
    return uuid.v4();
  },

  getPlatform: function () {
    return Platform.OS;
  },

  getPlatformVersion: function () {
    return Platform.Version;
  },

  getPlatformBrand: function () {
    return Device.brand;
  },

  getPlatformUniqueId: async function () {
    let id = await AsyncStorage.getItem("DEVICE_UUID");
    if (!id) {
      id = uuid.v4();
      await AsyncStorage.setItem("DEVICE_UUID", id);
    }
    return id;
  },

  getBundleId: function () {
    return Application.applicationId;
  },

  getJSONString: function (json) {
    return JSON.stringify(json);
  },

  getSessionID: async function () {
    return await AsyncStorage.getItem("SESSION_ID");
  },

  goToDeviceSettings: function () {
    Platform.OS === "ios"
      ? Linking.openURL("app-settings:")
      : Linking.sendIntent("android.settings.SETTINGS");
  },

  fn: function (amount) {
    return Number(amount)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  maskAmount: function (amount) {
    return amount.replace(/./g, "*");
  },

  isEmail: function (str) {
    if (!str) {
      return false;
    }
    return str.includes("@");
  },
};

export default AppUtil;
