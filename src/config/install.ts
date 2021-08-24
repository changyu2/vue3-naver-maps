import { App } from "vue";
import { install } from "../types";
import { components } from "./components";

export function install(app: App<Element>, options: install.options) {
  // const ERROR_MSG_BROWSER =
  //   "Sorry, this plugin is only available in browsers at now. If you are using Nuxt.js, turn off ssr for this plugin.";
  const ERROR_MSG_CLIENT = "options must be included clientId";

  if (!options.clientId) throw new Error(ERROR_MSG_CLIENT);

  _setupScript(options);
  components(app);
}

/**
 * vue3-naver-maps script setup
 */
function _setupScript(options: install.options) {
  const isExist = document.getElementById("vue3-naver-maps");
  if (!isExist) {
    const URL = _createURL(options);

    new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.setAttribute("id", "vue3-naver-maps");
      script.setAttribute("src", URL);
      script.setAttribute("async", "");
      script.setAttribute("defer", "");
      script.onerror = () => {
        reject(new Error(`[vue3-naver-maps] Failed to load`));
      };
      document.head.appendChild(script);
    });
  }
}

/**
 * create Javscript naver-maps URL
 */
function _createURL(options: install.options) {
  const baseURL: string =
    "https://openapi.map.naver.com/openapi/v3/maps.js" + "?";
  const category: install.category = options.category
    ? options.category
    : "ncp";
  const clientId: string = "ClientId=" + options.clientId;
  const subModules: string = options.subModules
    ? "&submodules=" + options.subModules
    : "";

  return baseURL + category + clientId + subModules;
}