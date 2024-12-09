import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/lms/tiers";

class TierService{
    getTiersByPartnerId(partnerId) {
        return axios({
          method: "get",
          url: `${BASE_URL}/getAllTiers?id=${partnerId}`,
          responseType: "json",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        });
      }
    
      // Delete tier
      deleteTiers(tierId) {
        return axios({
          method: "delete",
          url: BASE_URL + "/deleteTiersbyId?tierId="+tierId ,
          responseType: "string",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        });
      }

      createTiers(tierObj) {
        console.log("inside service of create", tierObj);
        return axios({
            method: "post",
            url: BASE_URL + "/createTiers",
            data: tierObj,
            responseType: "json",
            headers: {
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": "*"
            },
        })
    }
}

export default new TierService();



 