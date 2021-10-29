package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "t_cart_product")
@Getter
@Setter
public class CartProduct extends AbstractEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Product product;

    private Integer amount;

    private Boolean checked = false;


    public CartProduct() {
    }

    public CartProduct(Cart cart, Product product, Integer amount, Boolean checked) {
        this.cart = cart;
        this.product = product;
        this.amount = amount;
        this.checked = checked;
    }
}
