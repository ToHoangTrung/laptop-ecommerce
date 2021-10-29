package tht.closure.operator.util;

import org.hibernate.Hibernate;
import tht.closure.operator.model.dto.CatalogDto;
import tht.closure.operator.model.dto.ProductTypeDto;
import tht.closure.operator.model.dto.SubCatalogDto;
import tht.closure.operator.model.entity.Catalog;
import tht.closure.operator.model.entity.ProductType;
import tht.closure.operator.model.entity.SubCatalog;

import java.util.stream.Collectors;

public class CategoryMapper {

    public static ProductTypeDto productTypeToProductTypeDto(ProductType entity) {
        ProductTypeDto dto = new ProductTypeDto();
        dto.setId(entity.getId());
        dto.setVersion(entity.getVersion());
        dto.setName(entity.getName());
        return dto;
    }

    public static SubCatalogDto subCatalogToSubCatalogDto(SubCatalog entity) {
        SubCatalogDto dto = new SubCatalogDto();
        dto.setId(entity.getId());
        dto.setVersion(entity.getVersion());
        dto.setName(entity.getName());
        if (Hibernate.isInitialized(entity.getProductTypes())) {
            dto.setProductTypes(entity.getProductTypes().stream().map(CategoryMapper::productTypeToProductTypeDto).collect(Collectors.toList()));
        }
        return dto;
    }

    public static CatalogDto

    catalogToCatalogDto(Catalog entity) {
        CatalogDto dto = new CatalogDto();
        dto.setId(entity.getId());
        dto.setVersion(entity.getVersion());
        dto.setName(entity.getName());
        dto.setLogo(entity.getLogo());
        if (Hibernate.isInitialized(entity.getSubCatalogs())) {
            dto.setSubCatalogs(entity.getSubCatalogs().stream().map(CategoryMapper::subCatalogToSubCatalogDto).collect(Collectors.toList()));
        }
        return dto;
    }

}
