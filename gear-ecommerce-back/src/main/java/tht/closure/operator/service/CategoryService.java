package tht.closure.operator.service;

import tht.closure.operator.model.dto.CatalogDto;
import tht.closure.operator.model.dto.FilterTemplateDto;
import tht.closure.operator.model.dto.ProductTypeDto;
import tht.closure.operator.model.dto.SubCatalogDto;

import java.util.List;
import java.util.Set;

public interface CategoryService {
    List<CatalogDto> getCatalogHierarchical();

    List<FilterTemplateDto> getSubCatalogFilterByCatalog(Long id);

    List<FilterTemplateDto> getProductDetailFiltersBySubCatalog(Long id);

    List<CatalogDto> getAllCatalog();

    List<SubCatalogDto> getAllSubCatalog();

    List<ProductTypeDto> getAllProductType();

    List<FilterTemplateDto> getAllFilterProductDetail();

    List<SubCatalogDto> getSubCatalogByCatalog(Long id);

    List<ProductTypeDto> getProductTypeBySubCatalog(Long id);
}
