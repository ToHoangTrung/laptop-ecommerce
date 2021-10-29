package tht.closure.operator.model.exception.user;

import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;

public class RoleNotSupportException extends ResourceNotFoundException {

    public RoleNotSupportException(String message) {
        super(message, GearEcommerceExceptionErrorCode.USER_ROLE_NOT_SUPPORT_EXCEPTION);
    }
}
