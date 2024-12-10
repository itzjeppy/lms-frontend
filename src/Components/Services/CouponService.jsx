import axios from "axios";
const BASE_URL = "http://localhost:8080/api/v1/lms/coupons";

class CouponService {
    getCouponById(couponId) {
        return axios({
          method: "get",
          url: BASE_URL + "/getCouponById?coupon_id=" + couponId ,
          responseType: "json",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        });
      }
    
      // Get customers
      getCoupons() {
        return axios({
          method: "get",
          url: `${BASE_URL}/getCoupons`,
          responseType: "json",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        });
      }
    
      // Delete Offer
      deleteCoupons(couponId) {
        return axios({
          method: "delete",
          url: BASE_URL + "/deleteCoupons?coupon_id=" + couponId ,
          responseType: "string",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        });
      }
      //update coupon
      updateCoupons(couponObj,couponId) {
        return axios({
          method: "put",
          url: BASE_URL + "/putCoupons?coupon_id="+ couponId,
          data: couponObj,
          responseType: "json",
          headers: {
            "Access-Control-Allow-Origin": "*"
          },
        });
      }
    
      //Create Offer
      createCoupons(couponObj) {
        console.log("inside service of createCoupons", couponObj);
        return axios({
            method: "post",
            url: BASE_URL + "/createCoupons",
            data: couponObj,
            responseType: "json",
            headers: {
                "Content-Type": "application/json", 
                "Access-Control-Allow-Origin": "*"
            },
        })
    }    
}

export default new CouponService();