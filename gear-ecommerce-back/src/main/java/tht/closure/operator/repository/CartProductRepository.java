package tht.closure.operator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tht.closure.operator.model.entity.CartProduct;

@Repository
public interface CartProductRepository extends JpaRepository<CartProduct, Long> {

    boolean existsById(Long id);
}
