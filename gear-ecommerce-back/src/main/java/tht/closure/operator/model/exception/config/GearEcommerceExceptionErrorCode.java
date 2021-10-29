package tht.closure.operator.model.exception.config;

public class GearEcommerceExceptionErrorCode {

    //main base error code
    public static final String RESOURCE_NOT_FOUND_EXCEPTION = "EX-MAIN-RESOURCE-NOT-FOUND";
    public static final String RESOURCE_NOT_VALID_EXCEPTION = "EX-MAIN-RESOURCE-NOT-VALID";
    public static final String RESOURCE_NOT_MATCH_EXCEPTION = "EX-MAIN-RESOURCE-NOT-FOUND";
    public static final String RESOURCE_HAVE_ALREADY_EXIST_EXCEPTION = "EX-MAIN-RESOURCE-HAVE-ALREADY-EXIST";
    public static final String CONCURRENT_UPDATE_EXCEPTION = "EX-MAIN-CONCURRENT-UPDATE";
    public static final String RESOURCE_NOT_SUPPORT_EXCEPTION = "EX-MAIN-RESOURCE-NOT-SUPPORT";
    public static final String UN_HANDLE_EXCEPTION = "EX-UN-HANDLER";
    public static final String BAD_REQUEST_EXCEPTION = "EX-BAD-REQUEST";

    //user error code
    public static final String USER_NOT_FOUND_EXCEPTION = "EX-USER-NOT-FOUND";
    public static final String USER_USERNAME_HAVE_ALREADY_EXIST_EXCEPTION = "EX-USER-USERNAME-HAVE-ALREADY-EXIST";
    public static final String USER_EMAIL_HAVE_ALREADY_EXIST_EXCEPTION = "EX-USER-EMAIL-HAVE-ALREADY-EXIST";
    public static final String USER_EMAIL_NOT_FOUND_EXCEPTION = "EX-USER-USERNAME-NOT-FOUND";
    public static final String USER_USERNAME_NOT_FOUND_EXCEPTION = "EX-USER-EMAIL-NOT-FOUND";
    public static final String USER_PASSWORD_NOT_CORRECT_EXCEPTION = "EX-USER-PASSWORD-NOT-CORRECT";
    public static final String USER_ROLE_NOT_SUPPORT_EXCEPTION = "EX-USER-ROLE-NOT-SUPPORT";

    //product error code
    public static final String PRODUCT_NOT_FOUND_EXCEPTION = "EX-PRODUCT-NOT-FOUND";

    //cart error code
    public static final String CART_NOT_FOUND_EXCEPTION = "EX-CART-NOT-FOUND";
}
