package tht.closure.operator.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tht.closure.operator.model.dto.CartDto;
import tht.closure.operator.model.dto.CartProductDto;
import tht.closure.operator.security.service.CurrentUser;
import tht.closure.operator.security.service.UserPrincipal;
import tht.closure.operator.service.CartService;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/get-cart/current-user")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<CartDto> getCurrentUserCart(@CurrentUser UserPrincipal userPrincipal) {
        CartDto cart = cartService.getCurrentUserCart(userPrincipal);
        return ResponseEntity.ok().body(cart);
    }

    @PostMapping("/current-user/add-or-update-cart-product/")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> addOrUpdateCurrentUserCartProduct(@CurrentUser UserPrincipal userPrincipal, @RequestBody CartProductDto cartProduct) {
        cartService.addOrUpdateCurrentUserCartProduct(userPrincipal, cartProduct);
        return ResponseEntity.ok().body("Thêm vào giỏ hàng thành công");
    }

    @DeleteMapping("/current-user/delete-cart-product")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> deleteCurrentUserCartProduct(@CurrentUser UserPrincipal userPrincipal, @RequestBody Long id) {
        cartService.deleteCurrentUserCartProduct(userPrincipal, id);
        return ResponseEntity.ok().body("Xóa sản phẩm khỏi giỏ hàng thành công");
    }

    @PostMapping("/current-user/apply-discount-to-cart-by-code")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> applyDiscountToCurrentUserCart(@CurrentUser UserPrincipal userPrincipal, @RequestBody String discountCode) {
        cartService.applyDiscountToCurrentUserCart(userPrincipal, discountCode.replaceAll("\"",""));
        return ResponseEntity.ok().body("Áp dụng mã thành công");
    }

    @DeleteMapping("/current-user/remove-cart-discount")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> removeCurrentUserCartDiscount(@CurrentUser UserPrincipal userPrincipal) {
        cartService.removeCurrentUserCartDiscount(userPrincipal);
        return ResponseEntity.ok().body("Hủy mã thành công");
    }

}
