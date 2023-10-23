package com.universidade.pizzaria.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import com.universidade.pizzaria.entity.Produto;
import com.universidade.pizzaria.service.ProdutoService;

@Controller
public class PizzariaController {
    
    @Autowired
    private ProdutoService produtoService;

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
