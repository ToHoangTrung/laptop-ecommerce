package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity(name = "t_product")
@Getter
@Setter
public class Product extends AbstractEntity{

    @Column
    private String name;

    @Column
    private Integer sku;

    @Column
    private Integer price;

    @Column
    private Long amount;

    @Column
    private Float rating;

    @Column
    private Integer numRating;

    @Column
    private Integer numPurchased;

    @Column
    private Integer guaranteeTime;

    @Column
    private String descriptionContentUrl;

    @Enumerated(EnumType.STRING)
    @Column
    private Status status;

    public enum Status {
        ACTIVE("Active"),
        DISABLED("Disabled");

        public final String label;

        Status(String label) {
            this.label = label;
        }
    }

    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER)
    @OrderBy("id")
    private Set<ProductImage> productImages = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @OrderBy("id")
    private Set<CartProduct> cartProducts = new LinkedHashSet<>();

    @OneToMany(mappedBy = "product")
    private List<ProductReview> productReviews = new ArrayList<>();

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<GroupTypeProduct> groupTypeProducts = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Discount discount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn
    private Brand brand;

    @OneToOne(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @PrimaryKeyJoinColumn
    private ProductDetail productDetail;

}
