package tht.closure.operator.model.exception.main;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import tht.closure.operator.model.exception.config.GearEcommerceException;
import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;

@ResponseStatus(HttpStatus.CONFLICT)
public class ResourceNotSupportException extends GearEcommerceException {


    public ResourceNotSupportException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not support this %s : '%s'", resourceName, fieldName, fieldValue),
                GearEcommerceExceptionErrorCode.RESOURCE_NOT_SUPPORT_EXCEPTION, HttpStatus.CONFLICT);
    }

    public ResourceNotSupportException(String errorMessage) {
        super(errorMessage, GearEcommerceExceptionErrorCode.RESOURCE_NOT_SUPPORT_EXCEPTION, HttpStatus.CONFLICT);
    }

    public ResourceNotSupportException(String errorMessage, String exceptionErrorCode) {
        super(errorMessage, exceptionErrorCode, HttpStatus.CONFLICT);
    }
}
