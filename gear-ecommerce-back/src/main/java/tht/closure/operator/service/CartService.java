package tht.closure.operator.service;

import tht.closure.operator.model.dto.CartDto;
import tht.closure.operator.model.dto.CartProductDto;
import tht.closure.operator.security.service.UserPrincipal;

import java.util.List;

public interface CartService {
    CartDto getCurrentUserCart(UserPrincipal userPrincipal);

    void addOrUpdateCurrentUserCartProduct(UserPrincipal userPrincipal, CartProductDto cartProductDto);

    void deleteCurrentUserCartProduct(UserPrincipal userPrincipal, Long id);

    void applyDiscountToCurrentUserCart(UserPrincipal userPrincipal, String discountCode);

    void removeCurrentUserCartDiscount(UserPrincipal userPrincipal);
}
