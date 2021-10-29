package tht.closure.operator.model.dto;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.AbstractDto;
import tht.closure.operator.model.dto.main.CustomFilter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class FilterTemplateDto extends AbstractDto {

    private String label;

    private String type;

    private List<CustomFilter> valueList = new ArrayList<>();


    @Override
    public boolean equals(Object obj) {
        if(obj instanceof FilterTemplateDto)
        {
            FilterTemplateDto temp = (FilterTemplateDto) obj;
            return this.type.equals(temp.type);
        }
        return false;
    }

    @Override
    public int hashCode() {
        return (this.type.hashCode());
    }
}
