package tht.closure.operator.service;

import tht.closure.operator.model.dto.ProductDto;
import tht.closure.operator.model.dto.criterion.ProductCriterion;
import tht.closure.operator.model.dto.raw.NewProductDto;
import tht.closure.operator.service.main.PageResult;

public interface ProductService {

    ProductDto getProductDetail(Long id);

    PageResult<ProductDto> getProductByCriterion(ProductCriterion criterion);

    void createNewProduct(NewProductDto newProductDto);

    Integer countProductByCriterionNoLimitOffset(ProductCriterion criterion);
}
