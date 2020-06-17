import http from "./HttpService";
import config from "../config.json";
import utils from "../utils.js";
import { getCurrentUser } from "./AuthService";

const { apiStartBot, apiSearchBot, apiDiseaseSearch, apiDiseaseInfo } = config;

export const startSession = async () => {
  await http.get(apiStartBot);
};

export const searchSymptoms = async (symptomName) => {
  if (!symptomName) return [];

  try {
    const { data } = await http.get(`${apiSearchBot}${symptomName}`);

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

(async () => {
  if (!getCurrentUser()) return;
  // if (!diseaseName) return [];
  try {
    const { data } = await http.post(apiDiseaseSearch, { pref: "" });

    const { Diseases } = data;
    // Sorting, and picking only the first 4 symptom
    // const sortedDiseases = utils.sortStrArr(Diseases).slice(0, 4);
    const sortedDiseases = utils.sortStrArr(Diseases);

    localStorage.setItem("disease-list", JSON.stringify(sortedDiseases));
  } catch (ex) {
    utils.reportUserErrors(ex);
  }
})();

export const submitDiseaseName = async (diseaseName) => {
  try {
    const { data: diseaseInfo } = await http.post(apiDiseaseInfo, {
      disease: diseaseName,
    });
    return diseaseInfo;
  } catch (ex) {
    utils.reportUserErrors(ex);
  }
};

export default {
  startSession,
  searchSymptoms,
  submitDiseaseName,
};
