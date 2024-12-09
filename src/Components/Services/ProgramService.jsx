import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/lms/programs";

class ProgramService {
  // Get customers
  getAllPrograms() {
    return axios({
      method: "get",
      url: `${BASE_URL}/getAllPrograms`,
      responseType: "json",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    });
  }

  // Get customers
  getProgramsByPartner(partnerId) {
    return axios({
      method: "get",
      url: `${BASE_URL}/getAllPartnerPrograms?partner_id=${partnerId}`,
      responseType: "json",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    });
  }

  //Create Offer
  createProgram(programObj) {
    console.log("inside service of createProgram", programObj);
    return axios({
        method: "post",
        url: BASE_URL + "/createProgram",
        data: programObj,
        responseType: "json",
        headers: {
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": "*"
        },
    })
}


}

export default new ProgramService();