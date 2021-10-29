package tht.closure.operator.service;

import tht.closure.operator.model.dto.UserDto;
import tht.closure.operator.model.entity.User;
import tht.closure.operator.security.dto.LoginRequest;
import tht.closure.operator.security.dto.SignUpRequest;
import tht.closure.operator.security.service.UserPrincipal;

import java.util.List;

public interface AuthService {

    User userRegister(SignUpRequest registerDto);

    String userLogin(LoginRequest loginRequest);

    UserDto getCurrentUser(UserPrincipal userPrincipal);

    void updateCurrentUserInfo(UserPrincipal userPrincipal, UserDto userDto);

    List<UserDto.GenderDto> getAllUserGender();
}
