package tht.closure.operator.repository.custom.imp;

import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;
import tht.closure.operator.model.entity.*;
import tht.closure.operator.repository.custom.PaymentRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
public class PaymentRepositoryCustomImpl implements PaymentRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    QPayment payment = QPayment.payment;
    QPaymentProduct paymentProduct = QPaymentProduct.paymentProduct;
    QUser user = QUser.user;



    @Override
    public Payment getPaymentDetail(Long id) {
        return new JPAQuery<Payment>(em)
                .from(payment)
                .join(payment.paymentProducts, paymentProduct)
                .fetchJoin()
                .join(payment.user, user)
                .fetchJoin()
                .where(payment.id.eq(id))
                .fetchOne();
    }

    @Override
    public List<Payment> getPaymentByUser_Id(Long id) {
        return new JPAQuery<Payment>(em)
                .from(payment)
                .join(payment.paymentProducts, paymentProduct)
                .fetchJoin()
                .join(payment.user, user)
                .where(payment.user.id.eq(id))
                .orderBy(payment.createdDate.desc())
                .distinct()
                .fetch();
    }

    @Override
    public List<Payment> getAllPayment() {
        return new JPAQuery<Payment>(em)
                .from(payment)
                .join(payment.paymentProducts, paymentProduct)
                .fetchJoin()
                .join(payment.user, user)
                .fetchJoin()
                .orderBy(payment.createdDate.desc())
                .distinct()
                .fetch();
    }
}
