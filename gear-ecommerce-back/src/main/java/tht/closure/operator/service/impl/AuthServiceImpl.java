package tht.closure.operator.service.impl;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import tht.closure.operator.model.dto.UserAddressDto;
import tht.closure.operator.model.dto.UserDto;
import tht.closure.operator.model.entity.User;
import tht.closure.operator.model.exception.main.ResourceNotMatchException;
import tht.closure.operator.model.exception.user.UserNotFoundException;
import tht.closure.operator.repository.UserRepository;
import tht.closure.operator.security.dto.LoginRequest;
import tht.closure.operator.security.dto.SignUpRequest;
import tht.closure.operator.security.jwt.TokenProvider;
import tht.closure.operator.security.service.UserPrincipal;
import tht.closure.operator.service.AuthService;
import tht.closure.operator.util.UserMapper;
import tht.closure.operator.validator.AuthValidator;
import tht.closure.operator.validator.GeographyValidator;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthValidator authValidator;

    @Autowired
    private GeographyValidator geographyValidator;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenProvider tokenProvider;

    @Override
    public User userRegister(SignUpRequest signUpRequest) {
//        authValidator.validateRegisterRequest(registerDto);
//        User user = new User(registerDto.getUsername(), registerDto.getEmail(), encoder.encode(registerDto.getPassword()), registerDto.getRole());
//        userRepository.save(user);
        User user = new User();
        user.setName(signUpRequest.getName());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(signUpRequest.getPassword());
        user.setProvider(User.AuthProvider.local);

        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
//
    @Override
    public String userLogin(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        return tokenProvider.createToken(authentication);
    }

    @Override
    public UserDto getCurrentUser(UserPrincipal userPrincipal) {
        User user = userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new UserNotFoundException("User", "id", userPrincipal.getId()));
        return UserMapper.userToUserDto(user);
    }

    @Override
    public void updateCurrentUserInfo(UserPrincipal userPrincipal, UserDto userDto) {
        if (!userPrincipal.getId().equals(userDto.getId())) {
            throw new ResourceNotMatchException(String.format(
                    "Current user with id %s does not match with request user with id %s", userPrincipal.getId(), userDto.getId()
            ));
        } else {
            updateUserAccountInfo(userDto);
            updateUserAddressInfo(userDto);
        }
    }

    @Override
    public List<UserDto.GenderDto> getAllUserGender() {
        List<UserDto.GenderDto> genders = new ArrayList<>();
        User.getAllUserGender().forEach(e -> {
            genders.add(new UserDto.GenderDto(User.Gender.valueOf(e).label, User.Gender.valueOf(e).name()));
        });
        return genders;
    }

    private void updateUserAccountInfo(UserDto userDto) {
        User user = authValidator.getUserIfExistById(userDto.getId());
        if (userDto.getGender() != null) {
            user.setGender(User.Gender.valueOf(userDto.getGender().getValue()));
        }
        if (userDto.getBirthday() != null) {
            user.setBirthday(userDto.getBirthday());
        }
        if (StringUtils.isNotBlank(userDto.getName())) {
            user.setName(userDto.getName());
        }
        if (StringUtils.isNotBlank(userDto.getEmail())) {
            user.setPhone(userDto.getPhone());
        }
        userRepository.save(user);
    }

    private void updateUserAddressInfo(UserDto userDto) {
        User user = authValidator.getUserIfExistById(userDto.getId());
        if (userDto.getAddress() != null) {
            if (StringUtils.isNotBlank(userDto.getAddress().getName())) {
                user.getAddress().setName(userDto.getAddress().getName());
            }
            if (StringUtils.isNotBlank(userDto.getAddress().getPhone())) {
                user.getAddress().setPhone(userDto.getAddress().getPhone());
            }
            if (StringUtils.isNotBlank(userDto.getAddress().getEmail())) {
                user.getAddress().setEmail(userDto.getAddress().getEmail());
            }
            if (StringUtils.isNotBlank(userDto.getAddress().getStreet())) {
                user.getAddress().setStreet(userDto.getAddress().getStreet());
            }
            if (user.getAddress().getProvince() != null && !user.getAddress().getProvince().getId().equals(userDto.getAddress().getProvince().getId())) {
                user.getAddress().setProvince(geographyValidator.getProvinceIfExist(userDto.getAddress().getProvince().getId()));
            }
            if (user.getAddress().getDistrict() != null && !user.getAddress().getDistrict().getId().equals(userDto.getAddress().getDistrict().getId())) {
                user.getAddress().setDistrict(geographyValidator.getDistrictIfExist(userDto.getAddress().getDistrict().getId()));
            }
            if (user.getAddress().getWard() != null && !user.getAddress().getWard().getId().equals(userDto.getAddress().getWard().getId())) {
                user.getAddress().setWard(geographyValidator.getWardIfExist(userDto.getAddress().getWard().getId()));
            }
            userRepository.save(user);
        }
    }
}
