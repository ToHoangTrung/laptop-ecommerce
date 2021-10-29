package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "t_product_review")
@Getter
@Setter
public class ProductReview extends AbstractEntity{

    @ManyToOne
    @JoinColumn
    private User user;

    @ManyToOne
    @JoinColumn
    private Product product;

    @Column
    private Double rating;

    @Column
    private String content;
}
