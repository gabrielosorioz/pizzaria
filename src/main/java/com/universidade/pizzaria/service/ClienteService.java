package com.universidade.pizzaria.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.universidade.pizzaria.entity.Cliente;
import com.universidade.pizzaria.repository.ClienteRepository;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> buscarTodos(){
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(Long id){
        return clienteRepository.findById(id).get();
    }

    public Cliente inserir(Cliente cliente){
        Cliente newCliente = clienteRepository.saveAndFlush(cliente);
        return newCliente;
    }

    public Cliente alterar(Cliente cliente){
        return clienteRepository.saveAndFlush(cliente);
    }

    public void excluir(Long id){
        Cliente deletedCliente = clienteRepository.findById(id).get();
        clienteRepository.delete(deletedCliente);   

    }
}
