package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;
import tht.closure.operator.model.entity.Discount;
import tht.closure.operator.model.entity.Payment;
import tht.closure.operator.model.entity.Product;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.OneToMany;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class DiscountDto extends AbstractDto {

    private String name;

    private String code;

    private String description;

    private Integer discountPrice;

    private Integer discountPercent;

    private Integer discountMax;

    private Integer priceMinApply;

    private LocalDate applyDate;

    private LocalDate expireDate;
}
