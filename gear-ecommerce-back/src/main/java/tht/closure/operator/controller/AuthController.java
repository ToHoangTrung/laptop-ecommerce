package tht.closure.operator.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tht.closure.operator.model.dto.UserDto;
import tht.closure.operator.model.entity.User;
import tht.closure.operator.security.dto.LoginRequest;
import tht.closure.operator.security.dto.SignUpRequest;
import tht.closure.operator.security.service.CurrentUser;
import tht.closure.operator.security.service.UserPrincipal;
import tht.closure.operator.service.AuthService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController extends AbstractController{

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<Object> userRegister(@RequestBody SignUpRequest signUpRequest)  {
        User user = authService.userRegister(signUpRequest);
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/user/me")
                .buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(location).body("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<Object> userLogin(@RequestBody LoginRequest loginRequest) {
        String token = authService.userLogin(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(token);
    }

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<UserDto> getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        UserDto user = authService.getCurrentUser(userPrincipal);
        return ResponseEntity.status(HttpStatus.OK).body(user);
    }

    @PutMapping("/current-user/update")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> updateCurrentUserInfo(@CurrentUser UserPrincipal userPrincipal, @RequestBody UserDto userDto) {
        authService.updateCurrentUserInfo(userPrincipal, userDto);
        return ResponseEntity.ok().body("Cập nhật thông tin User thành công");
    }

    @GetMapping("/get-all/user-gender")
    public ResponseEntity<List<UserDto.GenderDto>> getAllUserGender() {
        List<UserDto.GenderDto> genders = authService.getAllUserGender();
        return ResponseEntity.ok().body(genders);
    }

}
