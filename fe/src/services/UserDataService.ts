import http from "../http-common";
import LogInRequest from "../types/LogInRequest"
import CreateUserRequest from "../types/CreateUserRequest"
import CreateUserResponse from "../types/CreateUserResponse"

// Source:  https://www.bezkoder.com/react-typescript-axios/
class UserDataService {

  create(data: CreateUserRequest) {
    return http.post<CreateUserResponse>(`/user`, data);
  }

  login(data: LogInRequest) {
    return http.post(`/user/login`, data);
  }

}

export default new UserDataService();