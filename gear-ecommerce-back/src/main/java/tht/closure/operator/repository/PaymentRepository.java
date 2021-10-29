package tht.closure.operator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.stereotype.Repository;
import tht.closure.operator.model.entity.Payment;
import tht.closure.operator.model.entity.Product;
import tht.closure.operator.model.entity.QPayment;
import tht.closure.operator.model.entity.QProduct;
import tht.closure.operator.repository.custom.PaymentRepositoryCustom;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long>,
        PaymentRepositoryCustom {

    List<Payment> findByUser_Id(Long id);

}
