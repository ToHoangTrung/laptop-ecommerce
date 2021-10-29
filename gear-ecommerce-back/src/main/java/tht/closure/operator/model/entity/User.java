package tht.closure.operator.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Entity(name = "t_user")
@Getter
@Setter
public class User extends AbstractEntity {

    @Column
    private String username;

    @Column
    private String name;

    @Column
    @JsonIgnore
    private String password;

    @Column
    private String email;

    @Column
    private String imageUrl;

    @Column
    private String phone;

    @CreationTimestamp
    @Column
    private LocalDate createdDate = LocalDate.now();

    @UpdateTimestamp
    @Column
    private LocalDate updatedDate;

    @Column
    private LocalDate birthday;

    @OneToMany(mappedBy = "user")
    private List<ProductReview> productReviews = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    @Column
    private Role role = Role.ROLE_USER;

    public enum Role {
        ROLE_USER("User"),
        ROLE_ADMIN("Admin");

        public final String label;

        Role(String label) {
            this.label = label;
        }
    }

    @Enumerated(EnumType.STRING)
    @Column
    private Gender gender;

    public enum Gender {
        GENDER_MALE("Nam"),
        GENDER_FEMALE("Nữ"),
        GENDER_OTHER("Khác");

        public final String label;

        Gender(String label) {
            this.label = label;
        }
    }


    @Enumerated(EnumType.STRING)
    @Column
    private AuthProvider provider;

    public enum AuthProvider {
        local,
        facebook,
        google,
        github
    }

    @Column
    private String providerId;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private UserAddress address;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    @PrimaryKeyJoinColumn
    private Cart cart;

    public User(String username, String email, String password, String role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = User.Role.valueOf(role);
    }

    public User(Long id, String username, String name, String password, String email, Role role) {
        this.setId(id);
        this.username = username;
        this.name = name;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public User() {

    }

    public static List<String> getAllUserRole() {
        return Stream.of(User.Role.values()).map(User.Role::name).collect(Collectors.toList());
    }

    public static List<String> getAllUserGender() {
        return Stream.of(User.Gender.values()).map(User.Gender::name).collect(Collectors.toList());
    }

}
