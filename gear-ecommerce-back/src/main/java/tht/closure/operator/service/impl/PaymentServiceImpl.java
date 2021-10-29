package tht.closure.operator.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tht.closure.operator.model.dto.PaymentDto;
import tht.closure.operator.model.dto.raw.NewPaymentDto;
import tht.closure.operator.model.entity.Cart;
import tht.closure.operator.model.entity.Payment;
import tht.closure.operator.model.entity.PaymentProduct;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;
import tht.closure.operator.model.exception.main.ResourceNotMatchException;
import tht.closure.operator.model.exception.main.ResourceNotSupportException;
import tht.closure.operator.repository.CartRepository;
import tht.closure.operator.repository.PaymentRepository;
import tht.closure.operator.security.service.UserPrincipal;
import tht.closure.operator.service.PaymentService;
import tht.closure.operator.util.PaymentMapper;
import tht.closure.operator.validator.PaymentValidator;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private PaymentValidator paymentValidator;

    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<PaymentDto> getAllCurrentUserPayment(UserPrincipal userPrincipal) {
        return getAllUserPayment(userPrincipal.getId());
    }

    private List<PaymentDto> getAllUserPayment(Long id) {
        List<Payment> payments = paymentRepository.getPaymentByUser_Id(id);
        return payments.stream().map(PaymentMapper::paymentToPaymentDto).collect(Collectors.toList());
    }

    @Override
    public List<PaymentDto.PaymentTypeDto> getAllPaymentType() {
        List<PaymentDto.PaymentTypeDto> paymentTypes = new ArrayList<>();
        Payment.getAllPaymentType().forEach(e -> {
            paymentTypes.add(new PaymentDto.PaymentTypeDto(Payment.PaymentType.valueOf(e).label, Payment.PaymentType.valueOf(e).name()));
        });
        return paymentTypes;
    }

    @Override
    public PaymentDto getCurrentUserPaymentDetail(UserPrincipal userPrincipal, Long paymentId) {
        Payment payment = paymentRepository.getPaymentDetail(paymentId);
        if (payment == null) {
            throw new ResourceNotFoundException("Payment", "id", paymentId);
        } else if (!payment.getUser().getId().equals(userPrincipal.getId())) {
            throw new ResourceNotMatchException("Current User", "Payment User", paymentId);
        }
        else {
            return PaymentMapper.buildPaymentDetail(payment);
        }
    }

    @Override
    public List<PaymentDto.ShippingTypeDto> getAllShippingType() {
        List<PaymentDto.ShippingTypeDto> shippingTypes = new ArrayList<>();
        Payment.getAllShippingType().forEach(e -> {
            shippingTypes.add(new PaymentDto.ShippingTypeDto(Payment.ShippingType.valueOf(e).label, Payment.ShippingType.valueOf(e).name()));
        });
        return shippingTypes;
    }

    @Override
    public void createNewCurrentUserPayment(UserPrincipal userPrincipal, NewPaymentDto newPaymentDto) {
        Cart newPaymentCart = paymentValidator.validateNewPaymentDtoValidThenReturnCart(newPaymentDto);
        if (!newPaymentCart.getUser().getId().equals(userPrincipal.getId())) {
            throw new ResourceNotMatchException("User of cart", "Current user", "id");
        }
        Payment newPayment = new Payment();
        newPayment.setUser(newPaymentCart.getUser());
        newPayment.setCreatedDate(LocalDate.now());
        newPayment.setPaymentType(Payment.PaymentType.valueOf(newPaymentDto.getPaymentType()));
        newPayment.setShippingType(Payment.ShippingType.valueOf(newPaymentDto.getShippingType()));
        newPayment.setPaymentStatus(Payment.PaymentStatus.CREATE);
        newPayment.setTemporaryPrice(newPaymentDto.getTemporaryPrice());
        newPayment.setDiscountPrice(newPaymentDto.getDiscountPrice());
        newPayment.setTotalPrice(newPaymentDto.getTotalPrice());
        newPayment.setShippingAddress(newPaymentDto.getShippingAddress());
        newPaymentCart.getCartProducts().forEach(cartProduct -> {
            PaymentProduct paymentProduct = new PaymentProduct(cartProduct.getProduct(), cartProduct.getProduct().getPrice(), 0, newPayment, cartProduct.getAmount());
            newPayment.getPaymentProducts().add(paymentProduct);
        });
        paymentRepository.save(newPayment);
        removeCartProductAfterPaymentSuccess(newPaymentCart);
    }

    @Override
    public List<PaymentDto> getAllPayment() {
        List<Payment> payments = paymentRepository.getAllPayment();
        return payments.stream().map(PaymentMapper::paymentToPaymentDto).collect(Collectors.toList());
    }

    private void removeCartProductAfterPaymentSuccess(Cart paymentCart) {
        paymentCart.getCartProducts().removeIf(x -> x.getChecked().equals(Boolean.TRUE));
        cartRepository.save(paymentCart);
    }

}
