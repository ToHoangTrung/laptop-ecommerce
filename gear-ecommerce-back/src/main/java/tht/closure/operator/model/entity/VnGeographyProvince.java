package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "t_vn_geography_province")
@Getter
@Setter
public class VnGeographyProvince extends AbstractEntity{

    private String name;

    private String code;

    @OneToMany(mappedBy = "province")
    private List<VnGeographyDistrict> districts = new ArrayList<>();

    @OneToMany(mappedBy = "province")
    private List<VnGeographyWard> wards = new ArrayList<>();

}
