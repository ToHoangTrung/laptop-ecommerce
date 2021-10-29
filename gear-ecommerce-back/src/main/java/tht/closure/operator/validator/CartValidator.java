package tht.closure.operator.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tht.closure.operator.model.dto.CartProductDto;
import tht.closure.operator.model.entity.Cart;
import tht.closure.operator.model.entity.CartProduct;
import tht.closure.operator.model.entity.Product;
import tht.closure.operator.model.entity.ProductType;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;
import tht.closure.operator.model.exception.main.ResourceNotMatchException;
import tht.closure.operator.model.exception.main.ResourceNotSupportException;
import tht.closure.operator.model.exception.main.ResourceNotValidException;
import tht.closure.operator.repository.CartProductRepository;

@Component
public class CartValidator {

    @Autowired
    private CartProductRepository cartProductRepository;

    @Autowired
    private ProductValidator productValidator;

    public CartProduct getCartProductIfExist(Long id) {
        return cartProductRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Cart Product", "id", id)
        );
    }

    public void validateCartProductExist(Long id) {
        if (!cartProductRepository.existsById(id)) {
            throw new ResourceNotFoundException("Cart Product", "id", id);
        }
    }

    public void validateCartProductDtoValid(CartProductDto cartProductDto) {
        Product product = productValidator.getProductIfExist(cartProductDto.getProduct().getId());
        if (cartProductDto.getId() != null) {
            CartProduct cartProduct = getCartProductIfExist(cartProductDto.getId());
            if (!cartProduct.getProduct().getId().equals(product.getId())) {
                throw new ResourceNotMatchException("Cart Product", "Cart Product Dto", "Product Id");
            }
        }
        if (cartProductDto.getAmount() < 0) {
            throw new ResourceNotSupportException("Cart Product", "amount", "< 0");
        }
        if (cartProductDto.getAmount() > product.getAmount() - 5) {
            throw new ResourceNotValidException("Chỉ còn 5 sản phẩm, không thể cập nhật giỏ hàng");
        }
    }

}
