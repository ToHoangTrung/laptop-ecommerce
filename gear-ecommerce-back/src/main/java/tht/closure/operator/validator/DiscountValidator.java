package tht.closure.operator.validator;

import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import tht.closure.operator.model.entity.Discount;
import tht.closure.operator.model.exception.main.ResourceNotFoundException;
import tht.closure.operator.repository.DiscountRepository;

@Component
public class DiscountValidator {

    @Autowired
    private DiscountRepository discountRepository;

    public Discount getDiscountIfExistByCode(String code) {
        Discount discount = discountRepository.findByCode(code);
        if (discount == null) {
            throw new ResourceNotFoundException("Discount", "code", code);
        }
        return discount;
    }
}
