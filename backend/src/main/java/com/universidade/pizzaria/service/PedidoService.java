package com.universidade.pizzaria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.universidade.pizzaria.entity.Pedido;
import com.universidade.pizzaria.repository.PedidoRepository;

public class PedidoService {
    
    @Autowired
    private PedidoRepository pedidoRepository;

    public List<Pedido> buscarTodos(){
        return pedidoRepository.findAll();
    }

    public Pedido buscarPorId(Long id){
        return pedidoRepository.findById(id).get();
    }

    public Pedido inserir(Pedido pedido){
        Pedido newPedido = pedidoRepository.saveAndFlush(pedido);
        return newPedido;
    }

    public Pedido alterar(Pedido pedido){
        return pedidoRepository.saveAndFlush(pedido);
    }

    public void excluir(Long id){
        Pedido deletedPedido = pedidoRepository.findById(id).get();
        pedidoRepository.delete(deletedPedido);
    }
}
