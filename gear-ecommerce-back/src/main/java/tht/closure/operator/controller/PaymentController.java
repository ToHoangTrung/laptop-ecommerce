package tht.closure.operator.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import tht.closure.operator.model.dto.PaymentDto;
import tht.closure.operator.model.dto.raw.NewPaymentDto;
import tht.closure.operator.security.service.CurrentUser;
import tht.closure.operator.security.service.UserPrincipal;
import tht.closure.operator.service.PaymentService;

import java.util.List;

@RestController
@RequestMapping("/api/payment")
public class PaymentController extends AbstractController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping("/get-all/current-user/payment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<PaymentDto>> getAllCurrentUserPayment(@CurrentUser UserPrincipal userPrincipal) {
        List<PaymentDto> payments = paymentService.getAllCurrentUserPayment(userPrincipal);
        return ResponseEntity.ok().body(payments);
    }

    @PostMapping("/current-user/create-new-payment")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> createNewCurrentUserPayment(@CurrentUser UserPrincipal userPrincipal, @RequestBody NewPaymentDto newPaymentDto) {
        paymentService.createNewCurrentUserPayment(userPrincipal, newPaymentDto);
        return ResponseEntity.ok().body("Create New Payment Successfully");
    }

    @GetMapping("/get-all/payment-type")
    public ResponseEntity<List<PaymentDto.PaymentTypeDto>> getAllPaymentType() {
        List<PaymentDto.PaymentTypeDto> paymentTypes = paymentService.getAllPaymentType();
        return ResponseEntity.ok().body(paymentTypes);
    }

    @GetMapping("/get-all/shipping-type")
    public ResponseEntity<List<PaymentDto.ShippingTypeDto>> getAllShippingType() {
        List<PaymentDto.ShippingTypeDto> shippingTypes = paymentService.getAllShippingType();
        return ResponseEntity.ok().body(shippingTypes);
    }

    @GetMapping("/current-user/get-payment-detail/{id}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PaymentDto> getCurrentUserPaymentDetail(@CurrentUser UserPrincipal userPrincipal, @PathVariable Long id) {
        PaymentDto payment = paymentService.getCurrentUserPaymentDetail(userPrincipal, id);
        return ResponseEntity.ok().body(payment);
    }

    @GetMapping("/get-all-payment")
    public ResponseEntity<List<PaymentDto>> getAllPayment() {
        List<PaymentDto> payments = paymentService.getAllPayment();
        return ResponseEntity.ok().body(payments);
    }
}
