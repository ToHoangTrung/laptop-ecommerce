package tht.closure.operator.model.dto.raw;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.BrandDto;
import tht.closure.operator.model.dto.ProductDetailDto;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class NewProductDto {

    @NotNull
    private String name;

    @NotNull
    private Integer price;

    @NotNull
    private Integer sku;

    private List<String> imageUrls = new ArrayList<>();

    @NotNull
    private Integer guaranteeTime;

    @NotNull
    private Long amount;

    @NotNull
    private String descriptionContentUrl;

    @NotNull
    private Long type;

    private String cpu;

    private String ram;

    private String rom;

    private String screen;

    private String graphicsChip;

}
