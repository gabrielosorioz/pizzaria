package com.universidade.pizzaria.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
@Controller
public class PizzariaController {
    
    
    @GetMapping("/home")
    public String pizzaPage() {
        return "index";
    }

    @GetMapping("/checkout")
    public String checkoutPage() {
        return "checkout";
    }

    @GetMapping("/payment")
    public String paymentPage() {
        return "payment";
    }

}
