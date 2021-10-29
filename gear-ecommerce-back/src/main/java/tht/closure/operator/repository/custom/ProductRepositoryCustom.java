package tht.closure.operator.repository.custom;

import com.querydsl.core.types.dsl.BooleanExpression;
import tht.closure.operator.model.dto.criterion.ProductCriterion;
import tht.closure.operator.model.entity.Product;
import tht.closure.operator.service.main.PagePaging;
import tht.closure.operator.service.main.PageResult;

public interface ProductRepositoryCustom {

    PageResult<Product> getProductByCriterion(ProductCriterion criterion, PagePaging pagePaging);

    Integer countProductByCriterionNoLimitOffset(ProductCriterion criterion);

    Product getProductDetail(Long id);
}
