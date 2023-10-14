package com.universidade.pizzaria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.universidade.pizzaria.entity.ItemPedido;
import com.universidade.pizzaria.repository.ItemPedidoRepository;

public class ItemPedidoService {

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    public List<ItemPedido> buscarTodos(){
        return itemPedidoRepository.findAll();
    }

    public ItemPedido buscarPorId(Long id){
        return itemPedidoRepository.findById(id).get();
    }

    public ItemPedido inserir(ItemPedido itemPedido){
        ItemPedido newItemPedido = itemPedidoRepository.saveAndFlush(itemPedido);
        return newItemPedido;
    }

    public ItemPedido alterar(ItemPedido itemPedido){
        return itemPedidoRepository.saveAndFlush(itemPedido);
    }

    public void excluir(Long id){
        ItemPedido deletedItemPedido = itemPedidoRepository.findById(id).get();
        itemPedidoRepository.delete(deletedItemPedido);   
    }
}
