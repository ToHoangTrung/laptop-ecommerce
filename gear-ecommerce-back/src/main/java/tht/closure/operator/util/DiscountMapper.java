package tht.closure.operator.util;

import tht.closure.operator.model.dto.DiscountDto;
import tht.closure.operator.model.entity.Discount;

public class DiscountMapper {

    public static DiscountDto discountToDiscountDto (Discount entity) {
        DiscountDto dto = new DiscountDto();
        dto.setId(entity.getId());
        dto.setApplyDate(entity.getApplyDate());
        dto.setCode(entity.getCode());
        dto.setDescription(entity.getDescription());
        dto.setDiscountMax(entity.getDiscountMax());
        dto.setDiscountPercent(entity.getDiscountPercent());
        dto.setDiscountPrice(entity.getDiscountPrice());
        dto.setExpireDate(entity.getExpireDate());
        dto.setName(entity.getName());
        dto.setPriceMinApply(entity.getPriceMinApply());
        dto.setVersion(entity.getVersion());
        return dto;
    }
}
