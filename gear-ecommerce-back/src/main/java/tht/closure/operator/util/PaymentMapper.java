package tht.closure.operator.util;

import org.hibernate.Hibernate;
import tht.closure.operator.model.dto.PaymentProductDto;
import tht.closure.operator.model.dto.PaymentDto;
import tht.closure.operator.model.entity.Payment;
import tht.closure.operator.model.entity.PaymentProduct;

import java.util.stream.Collectors;

public class PaymentMapper {

    public static PaymentDto paymentToPaymentDto(Payment entity) {
        PaymentDto dto = new PaymentDto();
        dto.setId(entity.getId());
        dto.setCreatedDate(entity.getCreatedDate());
        dto.setCancelDate(entity.getCancelDate());
        dto.setPaymentDate(entity.getPaymentDate());
        dto.setRefundDate(entity.getRefundDate());
        dto.setShippingDate(entity.getShippingDate());
        dto.setTotalPrice(entity.getTotalPrice());
        dto.setPaymentStatus(new PaymentDto.PaymentStatusDto(entity.getPaymentStatus().label, entity.getPaymentStatus().name()));
        if (Hibernate.isInitialized(entity.getPaymentProducts())) {
            dto.setPaymentProducts(entity.getPaymentProducts().stream().map(PaymentMapper::paymentProductToPaymentProductDto).collect(Collectors.toList()));
        }
        if (Hibernate.isInitialized(entity.getUser())) {
            dto.setUser(UserMapper.userToUserDto(entity.getUser()));
        }
        return dto;
    }

    public static PaymentProductDto paymentProductToPaymentProductDto(PaymentProduct entity) {
        PaymentProductDto dto = new PaymentProductDto();
        dto.setId(entity.getId());
        dto.setAmount(entity.getAmount());
        dto.setPaymentPrice(entity.getPaymentPrice());
        dto.setPaymentDiscount(entity.getPaymentDiscount());
        dto.setProduct(ProductMapper.productToProductDto(entity.getProduct()));
        return dto;
    }

    public static PaymentDto buildPaymentDetail(Payment entity) {
        PaymentDto dto = paymentToPaymentDto(entity);
        dto.setDiscountPrice(entity.getDiscountPrice());
        dto.setTemporaryPrice(entity.getTemporaryPrice());
        dto.setUser(UserMapper.userToUserDto(entity.getUser()));
        dto.setPaymentType(new PaymentDto.PaymentTypeDto(entity.getPaymentType().label, entity.getPaymentType().name()));
        dto.setShippingAddress(entity.getShippingAddress());
        dto.setShippingPrice(entity.getShippingPrice());
        dto.setShippingType(new PaymentDto.ShippingTypeDto(entity.getShippingType().label, entity.getShippingType().name()));
        return dto;
    }
}
