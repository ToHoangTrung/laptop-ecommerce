package tht.closure.operator.model.exception.main;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import tht.closure.operator.model.exception.config.GearEcommerceException;
import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends GearEcommerceException {

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue),
                GearEcommerceExceptionErrorCode.RESOURCE_NOT_FOUND_EXCEPTION, HttpStatus.NOT_FOUND);
    }

    public ResourceNotFoundException(String errorMessage) {
        super(errorMessage, GearEcommerceExceptionErrorCode.RESOURCE_NOT_FOUND_EXCEPTION, HttpStatus.NOT_FOUND);
    }

    public ResourceNotFoundException(String errorMessage, String exceptionErrorCode) {
        super(errorMessage, exceptionErrorCode, HttpStatus.NOT_FOUND);
    }
}
