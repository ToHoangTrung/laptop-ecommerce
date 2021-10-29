package tht.closure.operator.model.dto.criterion;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.model.dto.main.PaginationCriterion;
import tht.closure.operator.model.entity.ProductDetail;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ProductCriterion extends PaginationCriterion {

    private Long id;

    private String name;

    private List<Long> catalogIds = new ArrayList<>();

    private List<Long> subCatalogIds = new ArrayList<>();

    private List<Long> productTypeIds = new ArrayList<>();

    private List<ProductDetail.Cpu> cpuList = new ArrayList<>();

    private List<ProductDetail.Ram> ramList = new ArrayList<>();

    private List<ProductDetail.Rom> romList = new ArrayList<>();

    private List<ProductDetail.Screen> screenList = new ArrayList<>();

    private List<ProductDetail.GraphicsChip> graphicsChipList = new ArrayList<>();

    public void setCpuList(List<String> cpuList) {
        cpuList.forEach(cpu -> this.cpuList.add(ProductDetail.Cpu.valueOf(cpu)));
    }

    public void setRamList(List<String> ramList) {
        ramList.forEach(ram -> this.ramList.add(ProductDetail.Ram.valueOf(ram)));
    }

    public void setRomList(List<String> romList) {
        romList.forEach(rom -> this.romList.add(ProductDetail.Rom.valueOf(rom)));
    }

    public void setScreenList(List<String> screenList) {
        screenList.forEach(screen -> this.screenList.add(ProductDetail.Screen.valueOf(screen)));
    }

    public void setGraphicsChipList(List<String> graphicsChipList) {
        graphicsChipList.forEach(graphicsChip -> this.graphicsChipList.add(ProductDetail.GraphicsChip.valueOf(graphicsChip)));

    }
}
