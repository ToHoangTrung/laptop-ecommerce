package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "t_group_type_product")
@Getter
@Setter
public class GroupTypeProduct extends AbstractEntity{

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private ProductType productType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Product product;

    public GroupTypeProduct(Product product, ProductType productType) {
        this.product = product;
        this.productType = productType;
    }

    public GroupTypeProduct() {

    }
}
