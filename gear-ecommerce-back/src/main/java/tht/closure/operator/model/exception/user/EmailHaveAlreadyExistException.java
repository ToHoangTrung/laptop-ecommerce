package tht.closure.operator.model.exception.user;

import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;
import tht.closure.operator.model.exception.main.ResourceHaveAlreadyExistException;

public class EmailHaveAlreadyExistException extends ResourceHaveAlreadyExistException {

    public EmailHaveAlreadyExistException(String message) {
        super(message, GearEcommerceExceptionErrorCode.USER_EMAIL_HAVE_ALREADY_EXIST_EXCEPTION);
    }
}
