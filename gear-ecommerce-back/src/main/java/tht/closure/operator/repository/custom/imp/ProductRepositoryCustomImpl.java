package tht.closure.operator.repository.custom.imp;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.CollectionExpression;
import com.querydsl.core.types.EntityPath;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;
import tht.closure.operator.model.dto.criterion.ProductCriterion;
import tht.closure.operator.model.entity.*;
import tht.closure.operator.repository.custom.ProductRepositoryCustom;
import tht.closure.operator.service.main.PagePaging;
import tht.closure.operator.service.main.PageResult;
import tht.closure.operator.service.main.impl.PageResultImpl;
import tht.closure.operator.util.UtilService;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ProductRepositoryCustomImpl implements ProductRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    QProduct product = QProduct.product;
    QProductType productType = QProductType.productType;
    QSubCatalog subCatalog = QSubCatalog.subCatalog;
    QCatalog catalog = QCatalog.catalog;
    QGroupTypeProduct groupTypeProduct = QGroupTypeProduct.groupTypeProduct;
    QProductDetail productDetail = QProductDetail.productDetail;
    QDiscount discount = QDiscount.discount;

    private BooleanBuilder buildProductCriteriaFromCriterion(ProductCriterion criterion) {
        BooleanBuilder criteria = new BooleanBuilder(product.id.isNotNull());

        if (criterion.getId() != null && UtilService.isNumeric(criterion.getId().toString())) {
            criteria.and(product.id.eq(criterion.getId()));
        }

        if (StringUtils.isNotBlank(criterion.getName())) {
            criteria.and(product.name.containsIgnoreCase(criterion.getName()));
        }

        if (!criterion.getProductTypeIds().isEmpty()) {
            criteria.and(product.groupTypeProducts.any().id.in(
                    JPAExpressions.select(groupTypeProduct.id)
                            .from(groupTypeProduct)
                            .where(groupTypeProduct.productType.id.in(criterion.getProductTypeIds()))));
        }

        if (!criterion.getSubCatalogIds().isEmpty()) {
            criteria.and(product.groupTypeProducts.any().id.in(
                    JPAExpressions.select(groupTypeProduct.id)
                            .from(groupTypeProduct)
                            .where(groupTypeProduct.productType.subCatalog.id.in(criterion.getSubCatalogIds()))));
        }

        if (!criterion.getCatalogIds().isEmpty()) {
            criteria.and(product.groupTypeProducts.any().id.in(
                    JPAExpressions.select(groupTypeProduct.id)
                            .from(groupTypeProduct)
                            .join(groupTypeProduct.productType, productType)
                            .where(productType.subCatalog.catalog.id.in(criterion.getCatalogIds()))));
        }

        if(!criterion.getCpuList().isEmpty()) {
            criteria.and(product.productDetail.cpu.in(criterion.getCpuList()));
        }

        if(!criterion.getRamList().isEmpty()) {
            criteria.and(product.productDetail.ram.in(criterion.getRamList()));
        }

        if(!criterion.getRomList().isEmpty()) {
            criteria.and(product.productDetail.rom.in(criterion.getRomList()));
        }

        if(!criterion.getScreenList().isEmpty()) {
            criteria.and(product.productDetail.screen.in(criterion.getScreenList()));
        }

        if(!criterion.getGraphicsChipList().isEmpty()) {
            criteria.and(product.productDetail.graphicsChip.in(criterion.getGraphicsChipList()));
        }
        return criteria;
    }

    @Override
    public PageResult<Product> getProductByCriterion(ProductCriterion criterion, PagePaging paging) {

        BooleanBuilder criteria = buildProductCriteriaFromCriterion(criterion);

        JPAQuery<Product> query = new JPAQuery<Product>(em)
                .from(product)
                .leftJoin(product.discount, discount)
                .fetchJoin()
                .distinct();
        query = query.where(criteria).limit(paging.getLimit()).offset(paging.getOffset()).orderBy(product.id.asc());
        List<Product> products = query.fetch();
        return new PageResultImpl<>(products, (long) products.size(), paging);
    }

    @Override
    public Integer countProductByCriterionNoLimitOffset(ProductCriterion criterion) {
        BooleanBuilder criteria = buildProductCriteriaFromCriterion(criterion);
        JPAQuery<Long> query = new JPAQuery<Product>(em).select(product.id)
                .from(product)
                .distinct();
        query = query.where(criteria);
        List<Long> amount = query.fetch();
        return amount.size();
    }

    @Override
    public Product getProductDetail(Long id) {
        return new JPAQuery<Product>(em)
            .from(QProduct.product)
                .where(product.id.eq(id))
                .leftJoin(product.discount, discount)
                .fetchJoin()
                .leftJoin(product.productDetail, productDetail)
                .fetchJoin()
                .fetchOne();
    }
}
