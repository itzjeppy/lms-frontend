import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/lms";
 

class SuperAdminService {

    getAllPartners(){
        return axios({
            method: "get",
            url: BASE_URL + "/partner/getAllPartners",
            responseType: "json",
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
          });
    }

    getApprovedPartners(){
        return axios({
            method: "get",
            url: BASE_URL + "/SuperAdmin/getApprovedPartners",
            responseType: "json",
            headers: {
              "Access-Control-Allow-Origin": "*"
            },
          });
    }

    updatePartner(id,status){
        return axios({
            method: "put",
            url: BASE_URL + "/SuperAdmin/UpdatingPartner/?id="+id+"&status="+status,
            responseType: "json",
            headers: {
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": "*"
            },
        })
    }

    deletePartner(id){
      return axios({
        method: "delete",
        url: BASE_URL + "/partner/deletePartnerById?id="+id,
        responseType: "json",
        headers: {
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": "*"
        },
    })
    }

    
}

export default new SuperAdminService();