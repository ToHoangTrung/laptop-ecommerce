package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "t_payment_product")
@Getter
@Setter
public class PaymentProduct extends AbstractEntity{

    @ManyToOne
    @JoinColumn
    private Product product;

    private Integer paymentPrice;

    private Integer paymentDiscount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Payment payment;

    @Column
    private Integer amount;

    public PaymentProduct() {
    }

    public PaymentProduct(Product product, Integer paymentPrice, Integer paymentDiscount, Payment payment, Integer amount) {
        this.product = product;
        this.paymentPrice = paymentPrice;
        this.paymentDiscount = paymentDiscount;
        this.payment = payment;
        this.amount = amount;
    }
}
