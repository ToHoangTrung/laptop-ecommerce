package tht.closure.operator.repository.custom.imp;

import com.querydsl.jpa.impl.JPAQuery;
import org.springframework.stereotype.Service;
import tht.closure.operator.model.entity.*;
import tht.closure.operator.repository.custom.CartRepositoryCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
public class CartRepositoryCustomImpl implements CartRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    QCart cart = QCart.cart;
    QCartProduct cartProduct = QCartProduct.cartProduct;
    QProduct product = QProduct.product;
    QDiscount discount = QDiscount.discount;

    @Override
    public Cart getCartByUser_Id(Long id) {
        return new JPAQuery<Cart>(em)
                .from(cart)
                .leftJoin(cart.cartProducts, cartProduct)
                .fetchJoin()
                .leftJoin(cartProduct.product, product)
                .fetchJoin()
                .leftJoin(product.discount, discount)
                .fetchJoin()
                .where(cart.user.id.eq(id))
                .fetchOne();
    }
}
