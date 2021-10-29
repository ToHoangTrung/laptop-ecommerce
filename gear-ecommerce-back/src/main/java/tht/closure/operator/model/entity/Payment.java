package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity(name = "t_payment")
@Getter
@Setter
public class Payment extends AbstractEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private User user;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL)
    @OrderBy("id")
    private Set<PaymentProduct> paymentProducts = new LinkedHashSet<>();

    @Column
    private Integer temporaryPrice;

    @Column
    private Integer shippingPrice;

    @Column
    private Integer discountPrice;

    @Column
    private Integer totalPrice;

    @Column
    private String shippingAddress;

    @Column
    private LocalDate createdDate = LocalDate.now();

    @Column
    private LocalDate paymentDate;

    @Column
    private LocalDate shippingDate;

    @Column
    private LocalDate refundDate;

    @Column
    private LocalDate cancelDate;

    @Enumerated(EnumType.STRING)
    @Column
    private PaymentStatus paymentStatus;

    public enum PaymentStatus {
        CREATE("Đang được xác nhận"),
        VERIFY("Đã được xác nhận"),
        DELIVERY("Đang trên đường vận chuyển"),
        SUCCESS("Giao hàng thành công"),
        CANCEL("Đã hủy"),
        REFUND("Đã được hoàn trả");

        public final String label;

        PaymentStatus(String label) {
            this.label = label;
        }
    }

    @Enumerated(EnumType.STRING)
    @Column
    private ShippingType shippingType;

    public enum ShippingType {
        HOME("Giao hàng tại nhà"),
        SHOWROOM("Nhận hàng tại showroom");

        public final String label;

        ShippingType(String label) {
            this.label = label;
        }
    }

    @Enumerated(EnumType.STRING)
    @Column
    private PaymentType paymentType;

    public enum PaymentType {
        CASH("Thanh toán tiền mặt khi nhận hàng"),
        DEBIT_CARD("Thanh toán qua thẻ ATM nội địa"),
        CREDIT_CARD("Thanh toán qua Credit Card"),
        MOMO("Thanh toán qua ví Momo");

        public final String label;

        PaymentType(String label) {
            this.label = label;
        }
    }

    public static List<String> getAllPaymentType() {
        return Stream.of(Payment.PaymentType.values()).map(PaymentType::name).collect(Collectors.toList());
    }

    public static List<String> getAllShippingType() {
        return Stream.of(Payment.ShippingType.values()).map(ShippingType::name).collect(Collectors.toList());
    }
}
