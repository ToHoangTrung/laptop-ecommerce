package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;
import tht.closure.operator.model.entity.Discount;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class CartDto extends AbstractDto {

    private UserDto user;

    private DiscountDto discount;

    private List<CartProductDto> cartProducts = new ArrayList<>();
}
