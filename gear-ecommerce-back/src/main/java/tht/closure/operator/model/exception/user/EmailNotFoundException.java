package tht.closure.operator.model.exception.user;

import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;

public class EmailNotFoundException extends ResourceNotFoundException {

    public EmailNotFoundException(String message) {
        super(message, GearEcommerceExceptionErrorCode.USER_EMAIL_NOT_FOUND_EXCEPTION);
    }
}
