package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;
import tht.closure.operator.model.dto.main.EnumDto;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductDto extends AbstractDto {

    private String name;

    private Integer price;

    private Integer sku;

    private List<String> imageUrls = new ArrayList<>();

    private DiscountDto discount;

    private Integer guaranteeTime;

    private Float rating;

    private Integer numRating;

    private Integer numPurchased;

    private Long amount;

    private String descriptionContentUrl;

    private BrandDto brand;

    private ProductDetailDto detail;

    private StatusDto status;

    public static class StatusDto extends EnumDto {
        public StatusDto(String label, String value) {
            super(label, value);
        }
    }
}
