package tht.closure.operator.model.exception.main;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
import tht.closure.operator.model.exception.config.GearEcommerceException;
import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BadRequestException extends GearEcommerceException {
    public BadRequestException(String message) {
        super(message, GearEcommerceExceptionErrorCode.BAD_REQUEST_EXCEPTION, HttpStatus.BAD_REQUEST);
    }
}
