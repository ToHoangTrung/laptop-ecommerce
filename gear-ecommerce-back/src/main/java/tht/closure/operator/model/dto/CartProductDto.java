package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;

import javax.validation.constraints.NotNull;

@Getter
@Setter
public class CartProductDto extends AbstractDto {

    @NotNull
    private ProductDto product;

    @NotNull
    private Integer amount;

    @NotNull
    private Boolean checked;
}
