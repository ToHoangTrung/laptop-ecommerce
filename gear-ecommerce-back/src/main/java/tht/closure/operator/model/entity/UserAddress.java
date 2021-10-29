package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity(name = "t_user_address")
@Getter
@Setter
public class UserAddress extends AbstractEntity {

    private String name;

    private String email;

    private String phone;

    private String street;

    @ManyToOne
    @JoinColumn
    private VnGeographyProvince province;

    @ManyToOne
    @JoinColumn
    private VnGeographyDistrict district;

    @ManyToOne
    @JoinColumn
    private VnGeographyWard ward;

    @OneToOne
    @MapsId
    @JoinColumn
    private User user;
}
