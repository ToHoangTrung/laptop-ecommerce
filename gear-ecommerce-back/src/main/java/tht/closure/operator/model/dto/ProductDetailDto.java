package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.web.bind.annotation.GetMapping;
import tht.closure.operator.model.dto.main.AbstractDto;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class ProductDetailDto extends AbstractDto {

    private String cpu;

    private String ram;

    private String rom;

    private String screen;

    private String graphicsChip;

}
