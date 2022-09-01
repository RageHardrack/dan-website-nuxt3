import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime.js";
import localizedFormat from "dayjs/plugin/localizedFormat.js";
import updateLocale from "dayjs/plugin/updateLocale.js";

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);
dayjs.extend(updateLocale);
// OTHER PLUGINS

export default defineNuxtPlugin(() => {
  return {
    provide: {
      dayjs,
    },
  };
});
