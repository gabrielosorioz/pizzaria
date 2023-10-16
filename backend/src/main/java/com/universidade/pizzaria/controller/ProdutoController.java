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

import com.universidade.pizzaria.entity.Produto;
import com.universidade.pizzaria.service.ProdutoService;

@RestController
@RequestMapping("/api/produto")
@CrossOrigin
public class ProdutoController {
    
    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/")
    public List<Produto> buscarTodos(){
        return produtoService.buscarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(@PathVariable ("id") Long id){
        return ResponseEntity.ok(produtoService.buscarPorId(id));
    }

    @PostMapping("/")
    public Produto inserir(@RequestBody Produto protuto){
        return produtoService.inserir(protuto);
    }

    @PutMapping("/")
    public Produto alterar(@RequestBody Produto produto){
        return produtoService.alterar(produto);
        
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable ("id") Long id){
        produtoService.excluir(id);
        return ResponseEntity.ok().build();
    }
}
