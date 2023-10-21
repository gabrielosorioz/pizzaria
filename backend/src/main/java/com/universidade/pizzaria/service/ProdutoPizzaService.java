package com.universidade.pizzaria.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.universidade.pizzaria.entity.ProdutoPizza;
import com.universidade.pizzaria.repository.ProdutoPizzaRepository;

@Service
public class ProdutoPizzaService {
    
    @Autowired
    private ProdutoPizzaRepository produtoPizzaRepository;

    public List<ProdutoPizza> buscarTodos(){
        return produtoPizzaRepository.findAll();
    }

    public ProdutoPizza buscarPorId(Long id){
        return produtoPizzaRepository.findById(id).get();
    }

    public ProdutoPizza inserir(ProdutoPizza produtoPizza){
        ProdutoPizza newProdutoPizza =produtoPizzaRepository.saveAndFlush(produtoPizza);
        return newProdutoPizza;
    }

    public ProdutoPizza alterar(ProdutoPizza produtoPizza){
        return produtoPizzaRepository.saveAndFlush(produtoPizza);
    }

    public void excluir(Long id){
        ProdutoPizza deletedProdutoPizza =produtoPizzaRepository.findById(id).get();
        produtoPizzaRepository.delete(deletedProdutoPizza);   

    }
}
