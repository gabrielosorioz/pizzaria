// aula 05
// criar a variável modalKey sera global
let modalKey = 0

let quantPizzas = 1

let cart = [] // carrinho
// /aula 05

let pizza = null

// funcoes auxiliares ou uteis
const seleciona = (elemento) => document.querySelector(elemento)
const selecionaTodos = (elemento) => document.querySelectorAll(elemento)

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const formatoMonetario = (valor) => {
    if(valor) {
        return valor.toFixed(2)
    }
}

const abrirModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0 // transparente
    seleciona('.pizzaWindowArea').style.display = 'flex'
    setTimeout(() => seleciona('.pizzaWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0 // transparente
    setTimeout(() => seleciona('.pizzaWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    
    selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach( (item) => item.addEventListener('click', fecharModal) )
}

const pizzaJson = {}
fetch('http://localhost:8080/api/produto/')
  .then(response => response.json())
  .then(data => {

    data.forEach(item => {
        pizzaJson[item.id] = item;
    });

    data.forEach((item) => {
        const pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true);
        seleciona('.pizza-area').append(pizzaItem);

        pizzaItem.querySelector('.pizza-item--img img').src = item.img;
        pizzaItem.querySelector('.pizza-item--price').innerHTML = formatoReal(item.valor);
        pizzaItem.querySelector('.pizza-item--name').innerHTML = item.nome;
        pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.descricao;
        pizzaItem.setAttribute('data-key', item.id);

        // Evento de clique para os botões que abrem o modal
        pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Clicou na pizza');

            // Obtenha a chave da pizza clicada
            let chave = pegarKey(e);

            // Abra o modal
            abrirModal();

            // Faça uma solicitação para a API do backend para obter os detalhes da pizza
            fetch(`http://localhost:8080/api/produto/${chave}`)
                .then(response => response.json())
                .then(pizzaData => {

                   
                    // Preencha os elementos do modal com os dados da pizzaData
                    preencheDadosModal(pizzaData);

                    // Preencha os tamanhos disponíveis
                    preencherTamanhos(pizzaData);

                    // Defina a quantidade inicial como 1
                    seleciona('.pizzaInfo--qt').innerHTML = quantPizzas;

                    // Selecione o tamanho e o preço com o clique no botão
                    escolherTamanhoPreco(pizzaData);
                 
                   
                })
                .catch(error => {
                    console.error('Ocorreu um erro ao buscar os dados da API do backend:', error);
                });
        });
    });
    botoesFechar()
  })
  .catch(error => {
    console.error('Ocorreu um erro ao buscar os dados da API REST:', error);
});



const preencheDadosModal = (item) => {
    seleciona('.pizzaBig img').src = item.img
    seleciona('.pizzaInfo h1').innerHTML = item.nome
    seleciona('.pizzaInfo--desc').innerHTML = item.descricao
    seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(item.valor)
}

// // aula 05
// const pegarKey = (e) => {
//     // .closest retorna o elemento mais proximo que tem a class que passamos
//     // do .pizza-item ele vai pegar o valor do atributo data-key
//     let key = e.target.closest('.pizza-item').getAttribute('data-key')
//     console.log('Pizza clicada ' + key)
//     console.log(pizzaJson[key])

//     // garantir que a quantidade inicial de pizzas é 1
//     quantPizzas = 1

//     // Para manter a informação de qual pizza foi clicada
//     modalKey = key

//     return key
// }

const pegarKey = (e) => {
    // Obtenha a chave da pizza clicada do atributo data-key do elemento clicado
    let key = e.target.closest('.pizza-item').getAttribute('data-key');
    console.log('Pizza clicada ' + key);

    // Garanta que a quantidade inicial de pizzas seja 1
    quantPizzas = 1;

    // Atualize a variável modalKey com a chave
    modalKey = key;

    return key;
}



const preencherTamanhos = (pizzaData) => {
    // Tirar a seleção de tamanho atual e selecionar o tamanho grande
    seleciona('.pizzaInfo--size.selected').classList.remove('selected');

    // Selecionar todos os tamanhos
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        // Verifique se o tamanho está disponível no objeto da pizza
        if (pizzaData.tamanho && pizzaData.tamanho[sizeIndex]) {
            // Selecionar o tamanho grande
            if (sizeIndex === 2) {
                size.classList.add('selected');
            }
            // Definir o texto do tamanho
            size.querySelector('span').innerHTML = pizzaData.tamanho[sizeIndex];
        } else {
            // Se o tamanho não estiver disponível, esconda o elemento
            size.style.display = 'none';
        }
    });
};

const escolherTamanhoPreco = (pizzaData) => {
    // Ações nos botões de tamanho
    // Selecionar todos os elementos com a classe 'pizzaInfo--size'
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            // Clicou em um tamanho, deseleciona os outros e marca o que você clicou
            // Primeiro, remova a seleção do tamanho atualmente selecionado
            seleciona('.pizzaInfo--size.selected').classList.remove('selected');
            // Em seguida, marque o tamanho que você clicou (size) como selecionado
            size.classList.add('selected');

            // Mudar o preço de acordo com o tamanho
            // Atualize o elemento 'pizzaInfo--actualPrice' com o preço correspondente
            const tamanhoSelecionado = pizzaData.tamanho[sizeIndex];
            const preco = calcularPrecoPizza(pizzaData.valor, tamanhoSelecionado);
            seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(preco);
        });
    });
}

// Função auxiliar para calcular o preço com base no valor base e no tamanho
const calcularPrecoPizza = (valorBase, tamanho) => {
    // Implemente a lógica para calcular o preço com base no valor base e no tamanho
    // Você pode usar uma lógica condicional para mapear os tamanhos para preços específicos
    // Exemplo simples:
    if (tamanho === "4 fatias") {
        return valorBase;
    } else if (tamanho === "8 fatias") {
        return valorBase * 1.5; // Aumento de 50%
    } else if (tamanho === "10 fatias") {
        return valorBase * 2; // Aumento de 100%
    } else {
        // Lógica para outros tamanhos, se necessário
        return valorBase;
    }
}


const mudarQuantidade = () => {
    // Ações nos botões + e - da janela modal
    seleciona('.pizzaInfo--qtmais').addEventListener('click', () => {
        quantPizzas++
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas
    })

    seleciona('.pizzaInfo--qtmenos').addEventListener('click', () => {
        if(quantPizzas > 1) {
            quantPizzas--
            seleciona('.pizzaInfo--qt').innerHTML = quantPizzas	
        }
    })
}
// /aula 05

// aula 06
// const adicionarNoCarrinho = () => {
//     seleciona('.pizzaInfo--addButton').addEventListener('click', () => {
//         console.log('Adicionar no carrinho')

//         // pegar dados da janela modal atual
//     	// qual pizza? pegue o modalKey para usar pizzaJson[modalKey]
//     	console.log("Pizza " + modalKey)
//     	// tamanho
// 	    let size = seleciona('.pizzaInfo--size.selected').getAttribute('data-key')
// 	    console.log("Tamanho " + size)
// 	    // quantidade
//     	console.log("Quant. " + quantPizzas)
//         // preco
//         let price = seleciona('.pizzaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')
    
//         // crie um identificador que junte id e tamanho
// 	    // concatene as duas informacoes separadas por um símbolo, vc escolhe
// 	    let identificador = pizzaJson[modalKey].id+'t'+size

//         // antes de adicionar verifique se ja tem aquele codigo e tamanho
//         // para adicionarmos a quantidade
//         let key = cart.findIndex( (item) => item.identificador == identificador )
//         console.log(key)

//         if(key > -1) {
//             // se encontrar aumente a quantidade
//             cart[key].qt += quantPizzas
//         } else {
//             // adicionar objeto pizza no carrinho
//             let pizza = {
//                 identificador,
//                 id: pizzaJson[modalKey].id,
//                 size, // size: size
//                 qt: quantPizzas,
//                 price: parseFloat(price) // price: price
//             }
//             cart.push(pizza)
//             console.log(pizza)
//             console.log('Sub total R$ ' + (pizza.qt * pizza.price).toFixed(2))
//         }

//         fecharModal()
//         abrirCarrinho()
//         atualizarCarrinho()
//     })
// }
const adicionarNoCarrinho1 = () => {
    seleciona('.pizzaInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho');

        // Obtenha a chave da pizza do modalKey
        const chave = modalKey;

        // Obtenha o tamanho selecionado do elemento HTML
        const sizeElement = seleciona('.pizzaInfo--size.selected');
        if (!sizeElement) {
            console.error('Tamanho não selecionado');
            return;
        }
        // Obtenha o tamanho a partir do atributo data-key
        const size = sizeElement.getAttribute('data-key');

        // Faça uma solicitação para a API do backend para obter os detalhes da pizza
        fetch(`http://localhost:8080/api/produto/${chave}`)
            .then(response => response.json())
            .then(pizzaData => {
                console.log("Pizza " + pizzaData.nome);

                // Certifique-se de que o tamanho selecionado esteja disponível em pizzaData.tamanho
                if (!pizzaData.tamanho || !pizzaData.tamanho[size]) {
                    console.error('Tamanho indisponível:', size);
                    return;
                }

                let tamanhoSelecionado = pizzaData.tamanho[size];
                console.log("Tamanho " + tamanhoSelecionado);

                // Resto do código...

                // Adicione o tamanho selecionado ao objeto cart
                cart.push({
                    identificador,
                    id: pizzaData.id,
                    size: tamanhoSelecionado, // Use o tamanho selecionado do pizzaData
                    qt: quantPizzas,
                    price: parseFloat(price)
                });

                // Resto do código...
            })
            .catch(error => {
                console.error('Ocorreu um erro ao buscar os dados da API do backend:', error);
            });
    });
}

const adicionarNoCarrinho = () => {
    seleciona('.pizzaInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no carrinho');

        // Obtenha a chave da pizza do modalKey
        const chave = modalKey;
        
        
        // Faça uma solicitação para a API do backend para obter os detalhes da pizza
        fetch(`http://localhost:8080/api/produto/${chave}`)
            .then(response => response.json())
            .then(pizzaData => {
              
                console.log("Pizza " + pizzaData.nome);
                //tamanho
                let size = seleciona('.pizzaInfo--size.selected').getAttribute('data-key');
                let tamanhoSelecionado = pizzaData.tamanho[parseInt(size)]; // Converta 'size' para um número inteiro para acessar o tamanho correto
                console.log("Tamanho " + tamanhoSelecionado);
                // Quantidade
                console.log("Quant. " + quantPizzas);
                // Preço
                let price = seleciona('.pizzaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '');

                // Crie um identificador que combine o ID e o tamanho
                let identificador = `${pizzaData.id}t${size}`;

                // Antes de adicionar, verifique se já existe aquele código e tamanho no carrinho
                let index = cart.findIndex((item) => item.identificador === identificador);
                console.log(index);

                if (index > -1) {
                    // Se encontrar, aumente a quantidade
                    cart[index].qt += quantPizzas;
                } else {
                    // Adicione a pizza ao carrinho
                    let pizza = {
                        identificador,
                        id: pizzaData.id,
                        size: pizzaData.tamanho[size], // Obtenha o tamanho correspondente da API
                        qt: quantPizzas,
                        price: parseFloat(price)
                    };
                    cart.push(pizza);
                    console.log(pizza);
                    console.log('Subtotal R$ ' + (pizza.qt * pizza.price).toFixed(2));
                }

                fecharModal();
                abrirCarrinho();
                atualizarCarrinho();
            })
            .catch(error => {
                console.error('Ocorreu um erro ao buscar os dados da API do backend:', error);
            });
    });
}

const abrirCarrinho = () => {
    console.log('Qtd de itens no carrinho ' + cart.length)
    if(cart.length > 0) {
        // mostrar o carrinho
	    seleciona('aside').classList.add('show')
        seleciona('header').style.display = 'flex' // mostrar barra superior
    }

    // exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if(cart.length > 0) {
            seleciona('aside').classList.add('show')
            seleciona('aside').style.left = '0'
        }
    })
}

const fecharCarrinho = () => {
    // fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw' // usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex'
    })
}
const atualizarCarrinho = () => {
    // Exibir o número de itens no carrinho
    seleciona('.menu-openner span').innerHTML = cart.length

    // Mostrar ou não o carrinho
    if (cart.length > 0) {
        // Mostrar o carrinho
        seleciona('aside').classList.add('show')

        // Zerar o carrinho para não fazer inserções duplicadas
        seleciona('.cart').innerHTML = ''

        // Variáveis para calcular subtotal, desconto e total
        let subtotal = 0
        let desconto = 0
        let total = 0

        // Para preencher os itens do carrinho e calcular subtotal
        for (let i in cart) {
            // Use o cart[i].id para acessar a pizza correta no objeto pizzaJson
            let pizzaItem = pizzaJson[cart[i].id];
            console.log(pizzaItem);

            // Em cada item, pegar o subtotal
            subtotal += cart[i].price * cart[i].qt;

            // Fazer o clone, exibir na tela e depois preencher as informações
            let cartItem = seleciona('.models .cart--item').cloneNode(true);
            seleciona('.cart').append(cartItem);

            let pizzaSizeName = cart[i].size;

            let pizzaName = `${pizzaItem.nome} (${pizzaSizeName})`;

            // Preencher as informações
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;

            // Selecionar botões + e -
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                console.log('Clicou no botão mais');
                // Adicionar apenas a quantidade que está neste contexto
                cart[i].qt++;
                // Atualizar a quantidade
                atualizarCarrinho();
            });

            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                console.log('Clicou no botão menos');
                if (cart[i].qt > 1) {
                    // Subtrair apenas a quantidade que está neste contexto
                    cart[i].qt--;
                } else {
                    // Remover se for zero
                    cart.splice(i, 1);
                }

                if (cart.length < 1) {
                    seleciona('header').style.display = 'flex';
                }

                // Atualizar a quantidade
                atualizarCarrinho();
            });

            seleciona('.cart').append(cartItem);
        } // Fim do for

        // Fora do for, calcule desconto (se houver) e total
        desconto = 0; // Você pode ajustar o valor do desconto conforme necessário
        total = subtotal - desconto;

        // Exibir os resultados na tela
        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal);
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto);
        seleciona('.total span:last-child').innerHTML = formatoReal(total);
    } else {
        // Ocultar o carrinho
        seleciona('aside').classList.remove('show');
        seleciona('aside').style.left = '100vw';
    }
}

// const atualizarCarrinho = () => {
//     // exibir número de itens no carrinho
// 	seleciona('.menu-openner span').innerHTML = cart.length
	
// 	// mostrar ou nao o carrinho
// 	if(cart.length > 0) {

// 		// mostrar o carrinho
// 		seleciona('aside').classList.add('show')

// 		// zerar meu .cart para nao fazer insercoes duplicadas
// 		seleciona('.cart').innerHTML = ''

//         // crie as variaveis antes do for
// 		let subtotal = 0
// 		let desconto = 0
// 		let total    = 0

//         // para preencher os itens do carrinho, calcular subtotal
// 		for(let i in cart) {
// 			// use o find para pegar o item por id
// 			let pizzaItem = pizzaJson.find( (item) => item.id == cart[i].id )
// 			console.log(pizzaItem)

//             // em cada item pegar o subtotal
//         	subtotal += cart[i].price * cart[i].qt
//             //console.log(cart[i].price)

// 			// fazer o clone, exibir na telas e depois preencher as informacoes
// 			let cartItem = seleciona('.models .cart--item').cloneNode(true)
// 			seleciona('.cart').append(cartItem)

// 			let pizzaSizeName = cart[i].size

// 			let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`

// 			// preencher as informacoes
// 			cartItem.querySelector('img').src = pizzaItem.img
// 			cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName
// 			cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt

// 			// selecionar botoes + e -
// 			cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
// 				console.log('Clicou no botão mais')
// 				// adicionar apenas a quantidade que esta neste contexto
// 				cart[i].qt++
// 				// atualizar a quantidade
// 				atualizarCarrinho()
// 			})

// 			cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
// 				console.log('Clicou no botão menos')
// 				if(cart[i].qt > 1) {
// 					// subtrair apenas a quantidade que esta neste contexto
// 					cart[i].qt--
// 				} else {
// 					// remover se for zero
// 					cart.splice(i, 1)
// 				}

//                 (cart.length < 1) ? seleciona('header').style.display = 'flex' : ''

// 				// atualizar a quantidade
// 				atualizarCarrinho()
// 			})

// 			seleciona('.cart').append(cartItem)

// 		} // fim do for

// 		// fora do for
// 		// calcule desconto 10% e total
// 		//desconto = subtotal * 0.1
// 		desconto = subtotal * 0
// 		total = subtotal - desconto

// 		// exibir na tela os resultados
// 		// selecionar o ultimo span do elemento
// 		seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal)
// 		seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto)
// 		seleciona('.total span:last-child').innerHTML    = formatoReal(total)

// 	} else {
// 		// ocultar o carrinho
// 		seleciona('aside').classList.remove('show')
// 		seleciona('aside').style.left = '100vw'
// 	}
// }

const abrirCheckout = () => {
    window.location.href = 'checkout';
}

const abrirPayment = () => {
    window.location.href = 'payment';
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        abrirCheckout();
        // Ocultar o carrinho
        seleciona('aside').classList.remove('show')
        seleciona('aside').style.left = '100vw'
        seleciona('header').style.display = 'flex'

        // Exibir a tela de checkout
        const checkoutForm = seleciona('#checkout-form');
        checkoutForm.style.display = 'block';

        // Atualizar o resumo do pedido na tela de checkout
        atualizarResumoDoPedido();
    })
}

// /aula 06

// MAPEAR pizzaJson para gerar lista de pizzas
// pizzaJson.map((item, index ) => {
//     //console.log(item)
//     let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
//     //console.log(pizzaItem)
//     //document.querySelector('.pizza-area').append(pizzaItem)
//     seleciona('.pizza-area').append(pizzaItem)

//     // preencher os dados de cada pizza
//     preencheDadosDasPizzas(pizzaItem, item, index)
    
//     // pizza clicada
//     pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
//         e.preventDefault()
//         console.log('Clicou na pizza')

//         // aula 05
//         let chave = pegarKey(e)
//         // /aula 05

//         // abrir janela modal
//         abrirModal()

//         // preenchimento dos dados
//         preencheDadosModal(item)

//         // aula 05
//         // pegar tamanho selecionado
//         preencherTamanhos(chave)

// 		// definir quantidade inicial como 1
// 		seleciona('.pizzaInfo--qt').innerHTML = quantPizzas

//         // selecionar o tamanho e preco com o clique no botao
//         escolherTamanhoPreco(chave)
//         // /aula 05

//     })

//     botoesFechar()

// }) // fim do MAPEAR pizzaJson para gerar lista de pizzas

// aula 05
// mudar quantidade com os botoes + e -
mudarQuantidade()
// /aula 05

// aula 06
adicionarNoCarrinho()
atualizarCarrinho()
fecharCarrinho()
finalizarCompra()
// /aula 06
