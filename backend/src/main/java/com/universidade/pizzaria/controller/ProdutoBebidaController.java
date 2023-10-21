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

import com.universidade.pizzaria.entity.ProdutoBebida;
import com.universidade.pizzaria.service.ProdutoBebidaService;

@RestController
@RequestMapping("/api/produtoBebida")
@CrossOrigin
public class ProdutoBebidaController {
    
    @Autowired
    private ProdutoBebidaService produtoBebidaService;

    @GetMapping("/")
    public List<ProdutoBebida> buscarTodos(){
        return produtoBebidaService.buscarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoBebida> buscarPorId(@PathVariable ("id") Long id){
        return ResponseEntity.ok(produtoBebidaService.buscarPorId(id));
    }

    @PostMapping("/")
    public ProdutoBebida inserir(@RequestBody ProdutoBebida produtoPizza){
        return produtoBebidaService.inserir(produtoPizza);
    }

    @PutMapping("/")
    public ProdutoBebida alterar(@RequestBody ProdutoBebida produto){
        return produtoBebidaService.alterar(produto);
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable ("id") Long id){
        produtoBebidaService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
