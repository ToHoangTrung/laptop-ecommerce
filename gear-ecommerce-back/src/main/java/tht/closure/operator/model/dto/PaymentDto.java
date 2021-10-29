package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;
import tht.closure.operator.model.dto.main.EnumDto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class PaymentDto extends AbstractDto {

    private UserDto user;

    private Integer temporaryPrice;

    private Integer totalPrice;

    private Integer discountPrice;

    private Integer shippingPrice;

    private LocalDate createdDate;

    private LocalDate paymentDate;

    private LocalDate shippingDate;

    private LocalDate refundDate;

    private LocalDate cancelDate;

    private String shippingAddress;

    private List<PaymentProductDto> paymentProducts = new ArrayList<>();

    private PaymentStatusDto paymentStatus;

    public static class PaymentStatusDto extends EnumDto {
        public PaymentStatusDto(String label, String name) {
            super(label, name);
        }
    }

    private PaymentTypeDto paymentType;

    public static class PaymentTypeDto extends EnumDto {
        public PaymentTypeDto(String label, String name) {
            super(label, name);
        }
    }

    private ShippingTypeDto shippingType;

    public static class ShippingTypeDto extends EnumDto {
        public ShippingTypeDto(String label, String name) {
            super(label, name);
        }
    }

}
