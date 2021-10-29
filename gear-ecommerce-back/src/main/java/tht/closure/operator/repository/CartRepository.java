package tht.closure.operator.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;
import tht.closure.operator.model.entity.Cart;
import tht.closure.operator.repository.custom.CartRepositoryCustom;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long>, CartRepositoryCustom {

    Cart findByUser_Id(Long id);
}
