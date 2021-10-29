package tht.closure.operator.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tht.closure.operator.model.dto.CartDto;
import tht.closure.operator.model.dto.CartProductDto;
import tht.closure.operator.model.entity.Cart;
import tht.closure.operator.model.entity.CartProduct;
import tht.closure.operator.model.entity.Discount;
import tht.closure.operator.model.exception.main.ResourceHaveAlreadyExistException;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;
import tht.closure.operator.model.exception.main.ResourceNotMatchException;
import tht.closure.operator.model.exception.main.ResourceNotSupportException;
import tht.closure.operator.repository.CartProductRepository;
import tht.closure.operator.repository.CartRepository;
import tht.closure.operator.security.service.UserPrincipal;
import tht.closure.operator.service.CartService;
import tht.closure.operator.util.CartMapper;
import tht.closure.operator.validator.CartValidator;
import tht.closure.operator.validator.DiscountValidator;
import tht.closure.operator.validator.ProductValidator;

@Service
@Transactional
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartProductRepository cartProductRepository;

    @Autowired
    private ProductValidator productValidator;

    @Autowired
    private CartValidator cartValidator;

    @Autowired
    private DiscountValidator discountValidator;

    @Override
    public CartDto getCurrentUserCart(UserPrincipal userPrincipal) {
        return getUserCart(userPrincipal.getId());
    }

    @Override
    public void addOrUpdateCurrentUserCartProduct(UserPrincipal userPrincipal, CartProductDto cartProductDto) {
        addOrUpdateUserCartProduct(userPrincipal.getId(), cartProductDto);
    }

    @Override
    public void deleteCurrentUserCartProduct(UserPrincipal userPrincipal, Long id) {
        CartProduct cartProduct = cartValidator.getCartProductIfExist(id);
        if (!cartProduct.getCart().getUser().getId().equals(userPrincipal.getId())) {
            throw new ResourceNotMatchException("User of cart", "Current user", "id");
        }
        cartProductRepository.deleteById(id);
    }

    @Override
    public void applyDiscountToCurrentUserCart(UserPrincipal userPrincipal, String discountCode) {
        Cart cart = cartRepository.findByUser_Id(userPrincipal.getId());
        Discount applyDiscount = discountValidator.getDiscountIfExistByCode(discountCode);
        if (applyDiscount.getType().equals(Discount.Type.DISCOUNT_PRODUCT)) {
            throw new ResourceNotSupportException("Cart", "Discount", discountCode);
        }
        cart.setDiscount(applyDiscount);
        cartRepository.save(cart);
    }

    @Override
    public void removeCurrentUserCartDiscount(UserPrincipal userPrincipal) {
        Cart cart = cartRepository.findByUser_Id(userPrincipal.getId());
        cart.setDiscount(null);
        cartRepository.save(cart);
    }

    private void addOrUpdateUserCartProduct(Long userid, CartProductDto cartProductDto) {
        Cart cart = cartRepository.getCartByUser_Id(userid);
        cartValidator.validateCartProductDtoValid(cartProductDto);
        if (cartProductDto.getId() == null) {
            if (cart.getCartProducts().stream()
                    .anyMatch(cartProduct -> cartProduct.getProduct().getId()
                            .equals(cartProductDto.getProduct().getId()))) {
                cart.getCartProducts().stream().filter(cartProduct -> cartProduct.getProduct().getId()
                        .equals(cartProductDto.getProduct().getId()))
                        .findFirst().ifPresent(cartProduct -> {
                    cartProduct.setAmount(cartProduct.getAmount() + 1);
                });
            } else {
                cart.getCartProducts().add(new CartProduct(
                        cart, productValidator.getProductIfExist(cartProductDto.getProduct().getId()),
                        cartProductDto.getAmount(), Boolean.FALSE));
            }
        } else {
            cart.getCartProducts().stream().filter(cartProduct -> cartProduct.getId().equals(cartProductDto.getId()))
                    .findFirst().ifPresent(cartProduct -> {
                cartProduct.setAmount(cartProductDto.getAmount());
                cartProduct.setChecked(cartProductDto.getChecked());
            });
        }
        cartRepository.save(cart);
    }

    private CartDto getUserCart(Long userId) {
        Cart cart = cartRepository.getCartByUser_Id(userId);
        return CartMapper.cartToCartDto(cart);
    }

}
