package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity(name = "t_discount")
@Getter
@Setter
public class Discount extends AbstractEntity{

    @Column
    private String name;

    @Column
    private String code;

    @Column
    private String description;

    @Column
    private Integer discountPrice;

    @Column
    private Integer discountPercent;

    @Column
    private Integer discountMax;

    @Column
    private Integer priceMinApply;

    @Column
    private LocalDate applyDate;

    @Column
    private LocalDate expireDate;

    @Enumerated(EnumType.STRING)
    @Column
    private Type type;

    public enum Type {
        DISCOUNT_PRODUCT(""),
        DISCOUNT_PAYMENT(""),
        DISCOUNT_SHIPPING("");

        public final String label;

        Type(String label) {
            this.label = label;
        }
    }

    @OneToMany(mappedBy = "discount")
    @OrderBy("id")
    private Set<Cart> carts = new LinkedHashSet<>();

    @OneToMany(mappedBy = "discount")
    @OrderBy("id")
    private Set<Product> products = new LinkedHashSet<>();

}
