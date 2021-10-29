package tht.closure.operator.model.exception.main;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import tht.closure.operator.model.exception.config.GearEcommerceException;
import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;

@ResponseStatus(HttpStatus.CONFLICT)
public class ResourceHaveAlreadyExistException extends GearEcommerceException {

    public ResourceHaveAlreadyExistException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s have already exist with property %s : '%s'", resourceName, fieldName, fieldValue),
                GearEcommerceExceptionErrorCode.RESOURCE_HAVE_ALREADY_EXIST_EXCEPTION, HttpStatus.CONFLICT);
    }

    public ResourceHaveAlreadyExistException(String errorMessage) {
        super(errorMessage, GearEcommerceExceptionErrorCode.RESOURCE_HAVE_ALREADY_EXIST_EXCEPTION, HttpStatus.CONFLICT);
    }

    public ResourceHaveAlreadyExistException(String errorMessage, String exceptionErrorCode) {
        super(errorMessage, exceptionErrorCode, HttpStatus.NOT_FOUND);
    }
}
