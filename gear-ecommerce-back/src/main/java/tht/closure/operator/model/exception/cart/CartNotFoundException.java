package tht.closure.operator.model.exception.cart;

import tht.closure.operator.model.exception.config.GearEcommerceExceptionErrorCode;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;

public class CartNotFoundException extends ResourceNotFoundException {

    public CartNotFoundException(String message) {
        super(message, GearEcommerceExceptionErrorCode.PRODUCT_NOT_FOUND_EXCEPTION);
    }

    public CartNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue), GearEcommerceExceptionErrorCode.CART_NOT_FOUND_EXCEPTION);
    }
}
