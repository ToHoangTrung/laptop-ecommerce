package tht.closure.operator.model.exception.user;

import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;

public class UserNotFoundException extends ResourceNotFoundException {

    public UserNotFoundException(String message) {
        super(message, GearEcommerceExceptionErrorCode.USER_NOT_FOUND_EXCEPTION);
    }


    public UserNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue), GearEcommerceExceptionErrorCode.USER_NOT_FOUND_EXCEPTION);
    }
}
