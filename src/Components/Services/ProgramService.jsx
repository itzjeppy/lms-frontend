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

//update program
updateProgram(programObj) {
  console.log("Program Object in Service: ",programObj);
  return axios({
    method: "put",
    url: BASE_URL + "/updateProgram",
    data: programObj,
    responseType: "json",
    headers: {
      "Content-Type": "application/json", 
      "Access-Control-Allow-Origin": "*"
    },
  });
}

deleteProgram(programId) {
  return axios({
    method: "delete",
    url: BASE_URL + "/deleteProgramById?id=" + programId ,
    responseType: "string",
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  });
}

getProgramsById(programId) {
  return axios({
    method: "get",
    url: `${BASE_URL}/getProgramById?id=${programId}`,
    responseType: "json",
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  });
}

getDefaultProgramsById(partnerId) {
  return axios({
    method: "get",
    url: `${BASE_URL}/getDefaultProgramId?partnerId=${partnerId}`,
    responseType: "json",
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  });
}

}

export default new ProgramService();