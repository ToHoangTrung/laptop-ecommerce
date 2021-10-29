package tht.closure.operator.repository.custom;

import tht.closure.operator.model.entity.Payment;

import java.util.List;

public interface PaymentRepositoryCustom {

    Payment getPaymentDetail(Long id);

    List<Payment> getPaymentByUser_Id(Long id);

    List<Payment> getAllPayment();
}
