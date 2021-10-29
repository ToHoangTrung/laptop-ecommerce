package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;

@Getter
@Setter
public class BrandDto extends AbstractDto {

    private String name;

    private String logoUrl;
}
