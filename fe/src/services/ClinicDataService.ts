import http from "../http-common";
import CreateClinicRequest from "../types/CreateClinicRequest"
import LogInRequest from "../types/LogInRequest"

// Source:  https://www.bezkoder.com/react-typescript-axios/
class ClinicDataService {

  create(data: CreateClinicRequest) {
    return http.post(`/clinic`, data);
  }

  login(data: LogInRequest) {
    return http.post(`/clinic/login`, data);
  }
}

export default new ClinicDataService();