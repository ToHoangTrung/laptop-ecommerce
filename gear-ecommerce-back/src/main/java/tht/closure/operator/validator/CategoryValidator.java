package tht.closure.operator.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tht.closure.operator.model.entity.ProductType;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;
import tht.closure.operator.repository.ProductTypeRepository;

@Component
public class CategoryValidator {

    @Autowired
    private ProductTypeRepository productTypeRepository;

    public ProductType getProductTypeIfExist(Long id) {
        return productTypeRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product Type", "id", id)
        );
    }
}
