package tht.closure.operator.model.entity;

import lombok.Getter;
import lombok.Setter;
import tht.closure.operator.util.UtilService;

import javax.persistence.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity(name = "t_product_detail")
@Getter
@Setter
public class ProductDetail extends AbstractEntity{

    @Column
    private String color;

    @Column
    private String weight;

    @Column
    private String size;

    @Enumerated(EnumType.STRING)
    @Column
    private Cpu cpu;

    public enum Cpu {
        CPU_CORE_I3("Core i3"),
        CPU_CORE_I5("Core i5"),
        CPU_CORE_I7("Core i7");

        public final String label;

        Cpu(String label) {
            this.label = label;
        }
    }

    @Enumerated(EnumType.STRING)
    @Column
    private GraphicsChip graphicsChip;

    public enum GraphicsChip {
        GRAPHICS_CHIP_KHT("KHT"),
        GRAPHICS_CHIP_AMD_RADEON_PRO_5300M("Amd Radeon Pro 5300M");

        public final String label;

        GraphicsChip(String label) {
            this.label = label;
        }
    }

    @Enumerated(EnumType.STRING)
    @Column
    private Ram ram;

    public enum Ram {
        RAM_3GB("3GB"),
        RAM_4GB("4GB"),
        RAM_8GB("8GB"),
        RAM_16GB("16GB");

        public final String label;

        Ram(String label) {
            this.label = label;
        }
    }

    @Enumerated(EnumType.STRING)
    @Column
    private Screen screen;

    public enum Screen {
        SCREEN_13_3("13.3"),
        SCREEN_15_6("15.6"),
        SCREEN_16("16");

        public final String label;

        Screen(String label) {
            this.label = label;
        }
    }

    @Enumerated(EnumType.STRING)
    @Column
    private Rom rom;

    public enum Rom {
        ROM_32GB("32GB"),
        ROM_64GB("64GB"),
        ROM_128GB("128GB"),
        ROM_256GB("256GB");

        public final String label;

        Rom(String label) {
            this.label = label;
        }
    }

    @Column
    private String storage;

    @Column
    private String keyboard;

    @Column
    private String operatingSystem;

    @Column
    private String battery;

    @Column
    private String resolution;

    @Column
    private String chips;

    @Column
    private String chargingPort;

    @Column
    private String simType;

    @Column
    private String behindCamera;

    @Column
    private String frontCamera;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn
    private Product product;

    public static List<String> getAllCpuName() {
        return Stream.of(Cpu.values()).map(Enum::name).collect(Collectors.toList());
    }

    public static List<String> getAllCpuLabel() {
        return Stream.of(Cpu.values()).map(e -> e.label).collect(Collectors.toList());
    }

    public static List<String> getAllGraphicsChipName() {
        return Stream.of(GraphicsChip.values()).map(Enum::name).collect(Collectors.toList());
    }

    public static List<String> getAllGraphicsChipLabel() {
        return Stream.of(GraphicsChip.values()).map(e -> e.label).collect(Collectors.toList());
    }

    public static List<String> getAllRamName() {
        return Stream.of(Ram.values()).map(Enum::name).collect(Collectors.toList());
    }

    public static List<String> getAllRamLabel() {
        return Stream.of(Ram.values()).map(e -> e.label).collect(Collectors.toList());
    }

    public static List<String> getAllScreenName() {
        return Stream.of(Screen.values()).map(Enum::name).collect(Collectors.toList());
    }

    public static List<String> getAllScreenLabel() {
        return Stream.of(Screen.values()).map(e -> e.label).collect(Collectors.toList());
    }

    public static List<String> getAllRomName() {
        return Stream.of(Rom.values()).map(Enum::name).collect(Collectors.toList());
    }

    public static List<String> getAllRomLabel() {
        return Stream.of(Rom.values()).map(e -> e.label).collect(Collectors.toList());
    }

    public static Map<String, String> getAllCpuLabelAndName() {
        return UtilService.zipToMap(getAllCpuLabel(), getAllCpuName());
    }

    public static Map<String, String> getAllGraphicsChipLabelAndName() {
        return UtilService.zipToMap(getAllGraphicsChipLabel(), getAllGraphicsChipName());
    }

    public static Map<String, String> getAllRamLabelAndName() {
        return UtilService.zipToMap(getAllRamLabel(), getAllRamName());
    }

    public static Map<String, String> getAllScreenLabelAndName () {
        return UtilService.zipToMap(getAllScreenLabel(), getAllScreenName());
    }

    public static Map<String, String> getAllRomLabelAndName () {
        return UtilService.zipToMap(getAllRomLabel(), getAllRomName());
    }
}
