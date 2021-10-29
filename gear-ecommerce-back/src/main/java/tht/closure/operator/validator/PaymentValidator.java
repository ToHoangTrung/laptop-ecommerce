package tht.closure.operator.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tht.closure.operator.model.dto.raw.NewPaymentDto;
import tht.closure.operator.model.entity.Cart;
import tht.closure.operator.model.entity.Payment;
import tht.closure.operator.model.entity.User;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;
import tht.closure.operator.model.exception.main.ResourceNotSupportException;
import tht.closure.operator.model.exception.main.ResourceNotValidException;
import tht.closure.operator.repository.CartRepository;
import tht.closure.operator.repository.PaymentRepository;
import tht.closure.operator.repository.ProductRepository;
import tht.closure.operator.repository.UserRepository;

import java.util.List;

@Component
public class PaymentValidator {

    @Autowired
    private CartRepository cartRepository;

    public Cart validateNewPaymentDtoValidThenReturnCart(NewPaymentDto newPaymentDto) {
        Cart newPaymentCart = cartRepository.getCartByUser_Id(newPaymentDto.getUserId());
        if (newPaymentCart == null) {
            throw new ResourceNotFoundException("Cart", "id", newPaymentDto.getUserId());
        }
        if (newPaymentCart.getCartProducts().isEmpty()) {
            throw new ResourceNotValidException("Cart empty, can not create new payment");
        }
        if (newPaymentCart.getCartProducts().stream().noneMatch(cartProduct -> cartProduct.getChecked().equals(Boolean.TRUE))) {
            throw new ResourceNotValidException("No checked product in cart, can not create new payment");
        }
        validatePaymentTypeValid(newPaymentDto.getPaymentType());
        validateShippingTypeValid(newPaymentDto.getShippingType());
        return newPaymentCart;
    }

    public void validateShippingTypeValid(String shippingType) {
        List<String> shippingTypes = Payment.getAllShippingType();
        if (!shippingTypes.contains(shippingType)) {
            throw new ResourceNotSupportException("Payment", "Shipping Type", shippingType);
        }
    }

    public void validatePaymentTypeValid(String paymentType) {
        List<String> paymentTypes = Payment.getAllPaymentType();
        if (!paymentTypes.contains(paymentType)) {
            throw new ResourceNotSupportException("Payment", "Payment Type", paymentType);
        }
    }
}
