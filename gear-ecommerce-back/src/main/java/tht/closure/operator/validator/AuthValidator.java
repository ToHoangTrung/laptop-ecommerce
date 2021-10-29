package tht.closure.operator.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tht.closure.operator.model.entity.User;
import tht.closure.operator.model.exception.main.ResourceNotSupportException;
import tht.closure.operator.model.exception.user.*;
import tht.closure.operator.repository.UserRepository;
import tht.closure.operator.security.dto.SignUpRequest;

import java.util.List;

@Component
public class AuthValidator {

    @Autowired
    private UserRepository userRepository;

    public void validateUserExistByUsername(String username) {
        boolean check = userRepository.existsByUsername(username);
        if (Boolean.TRUE.equals(check)) {
            throw new UsernameHaveAlreadyExistException(String.format("Username: '%s' have already exist", username));
        }
    }

    public void validateUserExistByEmail(String email) {
        boolean check = userRepository.existsByEmail(email);
        if (Boolean.TRUE.equals(check)) {
            throw new EmailHaveAlreadyExistException(String.format("Email: '%s' have already exist", email));
        }
    }

    public void validateRoleValid(String role) {
        List<String> roles = User.getAllUserRole();
        if (!roles.contains(role)) {
            throw new RoleNotSupportException(String.format("User does not support this role: %s", role));
        }
    }

    public void validateGenderValid(String gender) {
        List<String> genders = User.getAllUserGender();
        if (!genders.contains(gender)) {
            throw new ResourceNotSupportException("User", "Gender", gender);
        }
    }

    public void validateRegisterRequest(SignUpRequest dto) {
        validateUserExistByEmail(dto.getEmail());
//        validateUserExistByUsername(dto.getUsername());
        validateRoleValid(dto.getRole());
    }

    public User getUserIfExistByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new EmailNotFoundException(String.format("Email: %s does not found", email));
        }
        return user;
    }

    public User getUserIfExistById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            throw new UserNotFoundException("User", "id", id);
        }
        return user;
    }
}
