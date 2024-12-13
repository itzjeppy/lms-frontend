import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/lms/users";
 
class UserService{
 
    getUserByPartnerId(tierId) {
        return axios({
          method: "get",
          url: `${BASE_URL}/getUsersByPartner?partner_id=${tierId}`,
          responseType: "json",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        });
      }
}
 
export default new UserService();