package tht.closure.operator.repository;

import com.querydsl.core.types.dsl.StringExpression;
import com.querydsl.core.types.dsl.StringPath;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.querydsl.binding.QuerydslBinderCustomizer;
import org.springframework.data.querydsl.binding.QuerydslBindings;
import org.springframework.data.querydsl.binding.SingleValueBinding;
import org.springframework.stereotype.Repository;
import tht.closure.operator.model.entity.Product;
import tht.closure.operator.model.entity.QProduct;
import tht.closure.operator.repository.custom.ProductRepositoryCustom;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> ,
        ProductRepositoryCustom {

    Product getBySku(Integer sku);
}
