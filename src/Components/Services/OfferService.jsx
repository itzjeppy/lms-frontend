import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/lms/offers";

class OfferService {
  getOfferById(offerId) {
    return axios({
      method: "get",
      url: BASE_URL + "/getOfferById?offer_id=" + offerId ,
      responseType: "json",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    });
  }

  // Get customers
  getOffers() {
    return axios({
      method: "get",
      url: `${BASE_URL}/getOffers`,
      responseType: "json",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    });
  }

  // Delete Offer
  deleteOffers(offerId) {
    return axios({
      method: "delete",
      url: BASE_URL + "/deleteOffer?offer_id=" + offerId ,
      responseType: "string",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    });
  }
  //update Offer
  updateOffers(offerObj,offerId) {
    return axios({
      method: "put",
      url: BASE_URL + "/updateOffer?offer_id="+ offerId,
      data: offerObj,
      responseType: "json",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
    });
  }

  //Create Offer
  createOffers(offerObj) {
    console.log("inside service of createOffers", offerObj);
    return axios({
        method: "post",
        url: BASE_URL + "/createOffer",
        data: offerObj,
        responseType: "json",
        headers: {
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": "*"
        },
    })
}

getOfferByProgramId(programId) {
  return axios({
    method: "get",
    url: BASE_URL + "/getOffersByProgramId?program_id=" + programId ,
    responseType: "json",
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
  });
}


}

export default new OfferService();