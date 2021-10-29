package tht.closure.operator.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tht.closure.operator.model.dto.ProductDto;
import tht.closure.operator.model.dto.criterion.ProductCriterion;
import tht.closure.operator.model.dto.raw.NewProductDto;
import tht.closure.operator.model.entity.GroupTypeProduct;
import tht.closure.operator.model.entity.Product;
import tht.closure.operator.model.exception.product.ProductNotFoundException;
import tht.closure.operator.repository.ProductRepository;
import tht.closure.operator.repository.ProductTypeRepository;
import tht.closure.operator.service.ProductService;
import tht.closure.operator.service.main.PageResult;
import tht.closure.operator.service.main.impl.PagePagingImp;
import tht.closure.operator.service.main.impl.PageResultImpl;
import tht.closure.operator.util.ConstantItem;
import tht.closure.operator.util.ProductMapper;
import tht.closure.operator.validator.CategoryValidator;
import tht.closure.operator.validator.ProductValidator;

import java.util.stream.Collectors;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductValidator productValidator;

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Autowired
    private CategoryValidator categoryValidator;

    @Override
    public ProductDto getProductDetail(Long id) {
        Product product = productRepository.getProductDetail(id);
        if (product == null) {
            throw new ProductNotFoundException("Product", "id", id);
        }
        return ProductMapper.productToProductDto(product);
    }

    @Override
    public PageResult<ProductDto> getProductByCriterion(ProductCriterion criterion) {
        long offset = ConstantItem.DEFAULT_SEARCH_OFFSET;
        long limit = ConstantItem.DEFAULT_SEARCH_LIMIT;
        if (criterion.getOffset() != null && criterion.getOffset() > 0) {
            offset = criterion.getOffset();
        }
        if (criterion.getLimit() != null && criterion.getLimit() > 0) {
            limit = criterion.getLimit();
        }
        PageResult<Product> pageResult = productRepository.getProductByCriterion(criterion, new PagePagingImp(offset,limit));
        return new PageResultImpl<>(
                pageResult.getContent().stream().map(ProductMapper::productToProductDto).collect(Collectors.toList()),
                pageResult.getTotalElements(),
                new PagePagingImp(offset,limit));
    }

    @Override
    public void createNewProduct(NewProductDto newProductDto) {
        productValidator.validateNewProduct(newProductDto);
        Product newProduct = ProductMapper.newProductDtoToProduct(newProductDto);
        GroupTypeProduct groupTypeProduct = new GroupTypeProduct(newProduct, categoryValidator.getProductTypeIfExist(newProductDto.getType()));
        newProduct.getGroupTypeProducts().add(groupTypeProduct);
        productRepository.save(newProduct);
    }

    @Override
    public Integer countProductByCriterionNoLimitOffset(ProductCriterion criterion) {
        return productRepository.countProductByCriterionNoLimitOffset(criterion);
    }

}
