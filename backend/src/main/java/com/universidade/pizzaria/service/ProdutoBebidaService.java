package com.universidade.pizzaria.service;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.universidade.pizzaria.entity.ProdutoBebida;
import com.universidade.pizzaria.repository.ProdutoBebidaRepository;

@Service
public class ProdutoBebidaService {
    
    @Autowired
    private ProdutoBebidaRepository ProdutoBebidaRepository;

    public List<ProdutoBebida> buscarTodos(){
        return ProdutoBebidaRepository.findAll();
    }

    public ProdutoBebida buscarPorId(Long id){
        return ProdutoBebidaRepository.findById(id).get();
    }

    public ProdutoBebida inserir(ProdutoBebida produtoPizza){
        ProdutoBebida newProdutoPizza =ProdutoBebidaRepository.saveAndFlush(produtoPizza);
        return newProdutoPizza;
    }

    public ProdutoBebida alterar(ProdutoBebida produtoPizza){
        return ProdutoBebidaRepository.saveAndFlush(produtoPizza);
    }

    public void excluir(Long id){
        ProdutoBebida deletedProdutoPizza =ProdutoBebidaRepository.findById(id).get();
        ProdutoBebidaRepository.delete(deletedProdutoPizza);   

    }
}
