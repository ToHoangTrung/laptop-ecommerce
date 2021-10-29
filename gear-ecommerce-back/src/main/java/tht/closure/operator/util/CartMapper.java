package tht.closure.operator.util;

import org.hibernate.Hibernate;
import tht.closure.operator.model.dto.CartDto;
import tht.closure.operator.model.dto.CartProductDto;
import tht.closure.operator.model.entity.Cart;
import tht.closure.operator.model.entity.CartProduct;

import java.util.stream.Collectors;

public class CartMapper{

    public static CartDto cartToCartDto(Cart entity) {
        CartDto dto = new CartDto();
        if (entity.getDiscount() != null && Hibernate.isInitialized(entity.getDiscount())) {
            dto.setDiscount(DiscountMapper.discountToDiscountDto(entity.getDiscount()));
        }
        if (Hibernate.isInitialized(entity.getCartProducts())) {
            dto.setCartProducts(entity.getCartProducts().stream().map(CartMapper::cartProductToCartProductDto).collect(Collectors.toList()));
        }
        return dto;
    }

    public static CartProductDto cartProductToCartProductDto(CartProduct entity) {
        CartProductDto dto = new CartProductDto();
        dto.setId(entity.getId());
        dto.setAmount(entity.getAmount());
        dto.setChecked(entity.getChecked());
        if(Hibernate.isInitialized(entity.getProduct())) {
            dto.setProduct(ProductMapper.productToProductDto(entity.getProduct()));
        }
        return dto;
    }
}
