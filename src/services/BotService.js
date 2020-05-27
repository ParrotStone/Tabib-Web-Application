import http from "./HttpService";
import config from "../config.json";
import utils from "../utils.js";

const { apiStartBot, apiSearchBot } = config;

export const searchSymptoms = async (value) => {
  if (!value) return [];

  try {
    await http.get(apiStartBot);
    const { data } = await http.get(`${apiSearchBot}${value}`);

    const { result } = data;
    // In case there is no matching
    if (!result) {
      return [];
    }

    // Sorting, removing the separators, and picking only the first 15 symptom
    const symptomsList = utils
      .sortStrArr(result)
      .map((symptom) => symptom.split("_").join(" "))
      .slice(0, 15);

    return symptomsList;
  } catch (ex) {
    utils.reportUserErrors(ex);
  }
};

export default {
  searchSymptoms,
};
