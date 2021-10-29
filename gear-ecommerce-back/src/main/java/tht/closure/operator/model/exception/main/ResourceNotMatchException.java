package tht.closure.operator.model.exception.main;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import tht.closure.operator.model.exception.config.GearEcommerceException;
import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;

@ResponseStatus(HttpStatus.CONFLICT)
public class ResourceNotMatchException extends GearEcommerceException {

    public ResourceNotMatchException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not match with %s by property: '%s'", resourceName, fieldName, fieldValue),
                GearEcommerceExceptionErrorCode.RESOURCE_NOT_MATCH_EXCEPTION, HttpStatus.CONFLICT);
    }

    public ResourceNotMatchException(String errorMessage) {
        super(errorMessage, GearEcommerceExceptionErrorCode.RESOURCE_NOT_MATCH_EXCEPTION, HttpStatus.CONFLICT);
    }

    public ResourceNotMatchException(String errorMessage, String exceptionErrorCode) {
        super(errorMessage, exceptionErrorCode, HttpStatus.CONFLICT);
    }
}
