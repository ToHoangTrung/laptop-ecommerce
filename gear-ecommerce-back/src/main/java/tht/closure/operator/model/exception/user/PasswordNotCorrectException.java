package tht.closure.operator.model.exception.user;

import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;

public class PasswordNotCorrectException extends ResourceNotFoundException {

    public PasswordNotCorrectException(String message) {
        super(message, GearEcommerceExceptionErrorCode.USER_PASSWORD_NOT_CORRECT_EXCEPTION);
    }
}
