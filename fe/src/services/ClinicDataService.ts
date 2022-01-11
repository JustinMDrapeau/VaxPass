import http from "../http-common";
import LogInRequest from "../types/LogInRequest"

// Source:  https://www.bezkoder.com/react-typescript-axios/
class ClinicDataService {

  login(data: LogInRequest) {
    return http.post(`/clinic/login`, data);
  }
}

export default new ClinicDataService();