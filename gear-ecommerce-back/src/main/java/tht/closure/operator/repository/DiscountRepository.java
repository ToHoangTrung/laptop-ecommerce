package tht.closure.operator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tht.closure.operator.model.entity.Discount;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {

    Discount findByCode(String code);
}
