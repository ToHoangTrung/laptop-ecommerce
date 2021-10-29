package tht.closure.operator.validator;

import com.nimbusds.oauth2.sdk.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tht.closure.operator.model.dto.raw.NewProductDto;
import tht.closure.operator.model.entity.Product;
import tht.closure.operator.model.entity.ProductDetail;
import tht.closure.operator.model.entity.ProductType;
import tht.closure.operator.model.entity.User;
import tht.closure.operator.model.exception.main.ResourceHaveAlreadyExistException;
import tht.closure.operator.model.exception.main.ResourceNotSupportException;
import tht.closure.operator.model.exception.product.ProductNotFoundException;
import tht.closure.operator.model.exception.user.RoleNotSupportException;
import tht.closure.operator.repository.ProductRepository;

import java.util.List;

@Component
public class ProductValidator {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryValidator categoryValidator;

    public Product getProductIfExist(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if (product == null) {
            throw new ProductNotFoundException("Product", "id", id);
        }
        return product;
    }

    public void validateProductExist(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ProductNotFoundException("Product", "id", id);
        }
    }

    public void validateNewProduct(NewProductDto newProductDto) {
        Product existProduct = productRepository.getBySku(newProductDto.getSku());
        if (existProduct != null) {
            throw new ResourceHaveAlreadyExistException("Product", "sku", newProductDto.getSku());
        }
        categoryValidator.getProductTypeIfExist(newProductDto.getType());
        if (StringUtils.isNotBlank(newProductDto.getCpu()) && !ProductDetail.getAllCpuName().contains(newProductDto.getCpu())) {
            throw new ResourceNotSupportException("Product", "Cpu", newProductDto.getCpu());
        }
        if (StringUtils.isNotBlank(newProductDto.getRam()) && !ProductDetail.getAllRamName().contains(newProductDto.getRam())) {
            throw new ResourceNotSupportException("Product", "Ram", newProductDto.getRam());
        }
        if (StringUtils.isNotBlank(newProductDto.getRom()) && !ProductDetail.getAllRomName().contains(newProductDto.getRom())) {
            throw new ResourceNotSupportException("Product", "Rom", newProductDto.getRom());
        }
        if (StringUtils.isNotBlank(newProductDto.getScreen()) && !ProductDetail.getAllScreenName().contains(newProductDto.getScreen())) {
            throw new ResourceNotSupportException("Product", "Screen", newProductDto.getScreen());
        }
        if (StringUtils.isNotBlank(newProductDto.getGraphicsChip()) && !ProductDetail.getAllGraphicsChipName().contains(newProductDto.getGraphicsChip())) {
            throw new ResourceNotSupportException("Product", "GraphicsChip", newProductDto.getGraphicsChip());
        }
    }

}
