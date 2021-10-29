package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;

@Getter
@Setter
public class PaymentProductDto extends AbstractDto {

    private ProductDto product;

    private Integer paymentPrice;

    private Integer amount;

    private Integer paymentDiscount;
}
