package tht.closure.operator.util;

import tht.closure.operator.model.dto.BrandDto;
import tht.closure.operator.model.entity.Brand;

public class BrandMapper {

    public static BrandDto brandToBrandDto(Brand entity) {
        BrandDto dto = new BrandDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setLogoUrl(entity.getLogoUrl());
        return dto;
    }
}
