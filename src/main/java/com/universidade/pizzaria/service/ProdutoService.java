package com.universidade.pizzaria.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.universidade.pizzaria.entity.Produto;
import com.universidade.pizzaria.repository.ProdutoRepository;

@Service
public class ProdutoService {
    
    @Autowired
    private ProdutoRepository produtoRepository;

    public List<Produto> buscarTodos(){
        return produtoRepository.findAll();
    }

    public Produto buscarPorId(Long id){
        return produtoRepository.findById(id).get();
    }

    public Produto inserir(Produto Produto){
        Produto newProduto = produtoRepository.saveAndFlush(Produto);
        return newProduto;
    }

    public Produto alterar(Produto Produto){
        return produtoRepository.saveAndFlush(Produto);
    }

    public void excluir(Long id){
        Produto deletedProduto = produtoRepository.findById(id).get();
        produtoRepository.delete(deletedProduto);   

    }
}
