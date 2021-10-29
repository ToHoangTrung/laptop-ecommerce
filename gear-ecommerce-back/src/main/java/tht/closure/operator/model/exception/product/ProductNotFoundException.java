package tht.closure.operator.model.exception.product;

import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;

public class ProductNotFoundException extends ResourceNotFoundException {

    public ProductNotFoundException(String message) {
        super(message, GearEcommerceExceptionErrorCode.PRODUCT_NOT_FOUND_EXCEPTION);
    }

    public ProductNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue), GearEcommerceExceptionErrorCode.PRODUCT_NOT_FOUND_EXCEPTION);
    }
}
