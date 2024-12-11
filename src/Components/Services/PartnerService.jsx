import axios from "axios";
const BASE_URL = "http://localhost:8080/lms/api/v1/partner/";
 

class PartnerService {
    getPartnerById(id) {
        return axios({
          method: "get",
          url: BASE_URL + "getPartnerById?id=" + id ,
          responseType: "json",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        });
      }
    
      registerPartner(partnerObj) {
        console.log("inside service of createCoupons", partnerObj);
        return axios({
            method: "post",
            url: BASE_URL + "registerPartner",
            data: partnerObj,
            responseType: "json",
            headers: {
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": "*"
            },
        })
    }
  
    Login(id,email) {
      return axios({
        method: "get",
        url: BASE_URL + "partnerLogin/?email=" + email +"&pwd="+id,
        responseType: "json",
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
      });
    }
    
}

export default new PartnerService();