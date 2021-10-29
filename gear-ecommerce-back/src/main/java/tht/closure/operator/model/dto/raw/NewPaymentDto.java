package tht.closure.operator.model.dto.raw;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class NewPaymentDto {

    private Long userId;

    private String paymentType;

    private String shippingType;

    private String shippingAddress;

    private Integer temporaryPrice;

    private Integer discountPrice;

    private Integer totalPrice;

    private List<Long> discountIds = new ArrayList<>();
}
