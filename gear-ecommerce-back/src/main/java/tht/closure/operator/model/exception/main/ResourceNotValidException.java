package tht.closure.operator.model.exception.main;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import tht.closure.operator.model.exception.config.GearEcommerceException;
import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;

@ResponseStatus(HttpStatus.CONFLICT)
public class ResourceNotValidException extends GearEcommerceException {

    public ResourceNotValidException(String errorMessage) {
        super(errorMessage, GearEcommerceExceptionErrorCode.RESOURCE_NOT_SUPPORT_EXCEPTION, HttpStatus.CONFLICT);
    }

    public ResourceNotValidException(String errorMessage, String exceptionErrorCode) {
        super(errorMessage, exceptionErrorCode, HttpStatus.CONFLICT);
    }
}
