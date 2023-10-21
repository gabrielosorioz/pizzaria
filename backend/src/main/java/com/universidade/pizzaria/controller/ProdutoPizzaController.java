package com.universidade.pizzaria.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.universidade.pizzaria.entity.ProdutoPizza;
import com.universidade.pizzaria.service.ProdutoPizzaService;

@RestController
@RequestMapping("/api/produtoPizza")
@CrossOrigin
public class ProdutoPizzaController {
    
    @Autowired
    private ProdutoPizzaService produtoPizzaService;

    @GetMapping("/")
    public List<ProdutoPizza> buscarTodos(){
        return produtoPizzaService.buscarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoPizza> buscarPorId(@PathVariable ("id") Long id){
        return ResponseEntity.ok(produtoPizzaService.buscarPorId(id));
    }

    @PostMapping("/")
    public ProdutoPizza inserir(@RequestBody ProdutoPizza produtoPizza){
        return produtoPizzaService.inserir(produtoPizza);
    }

    @PutMapping("/")
    public ProdutoPizza alterar(@RequestBody ProdutoPizza produto){
        return produtoPizzaService.alterar(produto);
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable ("id") Long id){
        produtoPizzaService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
