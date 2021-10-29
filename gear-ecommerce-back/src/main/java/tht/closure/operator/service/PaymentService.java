package tht.closure.operator.service;

import tht.closure.operator.model.dto.PaymentDto;
import tht.closure.operator.model.dto.raw.NewPaymentDto;
import tht.closure.operator.security.service.UserPrincipal;

import java.util.List;

public interface PaymentService {
    List<PaymentDto> getAllCurrentUserPayment(UserPrincipal userPrincipal);

    PaymentDto getCurrentUserPaymentDetail(UserPrincipal userPrincipal, Long paymentId);

    List<PaymentDto.PaymentTypeDto> getAllPaymentType();

    List<PaymentDto.ShippingTypeDto> getAllShippingType();

    void createNewCurrentUserPayment(UserPrincipal userPrincipal, NewPaymentDto newPaymentDto);

    List<PaymentDto> getAllPayment();
}
