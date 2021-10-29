package tht.closure.operator.model.exception.user;

import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;

public class UsernameNotFoundException extends ResourceNotFoundException {

    public UsernameNotFoundException(String message) {
        super(message, GearEcommerceExceptionErrorCode.USER_USERNAME_NOT_FOUND_EXCEPTION);
    }
}
