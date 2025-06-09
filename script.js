
// Dados dos produtos
const produtos = [
  {
    id: 1,
    nome: "Camiseta branca Personalizada",
    preco: 30.90,
    img: "https://i.pinimg.com/736x/84/de/7a/84de7a939d7c5d08bb79efe8a7672046.jpg",
    descricao: "Camiseta 100% algodão, confortável e ideal para o dia a dia. Disponível nos tamanhos P e M. Personalize com a estampa que quiser e crie a sua peça única!"
  },
  {
    id: 2,
    nome: "Camiseta preta Personalizada ",
    preco: 35.99,
    img: "https://i.pinimg.com/736x/d3/96/41/d396418b7af159578d3f752b647eea1b.jpg",
    descricao: "Confeccionada em algodão 100%, macia e resistente. Tamanhos do P ao M. Escolha a estampa que preferir e transforme sua camiseta numa peça exclusiva!"
  },
  {
    id: 3,
    nome: "Guardanapos Brancos Personalizáveis",
    preco: 8.50,
    img: "https://i.pinimg.com/736x/1c/95/5d/1c955d11abfdcf6e7f8491dff5c460fa.jpg",
    descricao: "Guardanapos de mesa brancos em tecido 100% poliéster, ideais para personalizar com a estampa que você quiser. Perfeitos para eventos, presentes ou deixar sua mesa com a sua cara!"
  },
  {
    id: 4,
    nome: "Avental Branco Personalizáve",
    preco: 39.99,
    img: "https://i.pinimg.com/736x/7c/65/d1/7c65d1c4bcf8a2fbeac54ef0aa4a286f.jpg",
    descricao: "Avental branco em tecido resistente (100% poliéster), pronto para você personalizar com a estampa que quiser. Ideal para cozinha, churrasco, eventos ou presentes criativos. Tamanho único ajustável, confortável e durável."
  },
  {
    id: 5,
    nome: "Body de Bebê Branco Personalizável",
    preco: 25.70,
    img: "https://i.pinimg.com/736x/d4/c8/cd/d4c8cddb19cba1900994ab7dbdd21af3.jpg",
    descricao: "Body branco 100% algodão, macio e confortável para o dia a dia do bebê. Tamanhos de RN ao G. Personalize com a estampa que quiser e torne cada momento ainda mais especial!"
  },
  {
    id: 6,
    nome: "Ecobag Branca Personalizável ",
    preco: 25.00,
    img: "https://i.pinimg.com/736x/8f/ce/63/8fce63bc27dfed1c4b3ab071a5d93b88.jpg",
    descricao: "Ecobag branca em tecido resistente (100% algodão ou poliéster), perfeita para personalizar com a arte que você quiser. Ideal para o dia a dia, brindes ou presentes criativos. Tamanho padrão 35x40cm com alças reforçadas."
  },
  {
    id: 7,
    nome: "Caixinha de Papel Kraft 10x10 Personalizável",
    preco: 6.00,
    img: "https://i.pinimg.com/736x/16/2a/ac/162aacf240c59d883d66e7bb5484db9d.jpg",
    descricao: "Caixinha de papel kraft 10x10cm, perfeita para lembrancinhas, brindes ou embalar seus produtos com charme. Personalize com a arte ou logo que quiser! Resistente, sustentável e cheia de estilo."
  },
  {
    id: 8,
    nome: "Cartinha Personalizada com 10 Fotos",
    preco: 6.50,
    img: "https://i.pinimg.com/736x/ad/e6/ca/ade6ca808b59ee58252195249ce26a56.jpg",
    descricao: "Cartinha especial com espaço para mensagem personalizada e 10 fotos pequenas (5x5cm ou 6x6cm), perfeita para surpreender alguém com carinho e criatividade. Ideal para datas especiais, lembrancinhas ou kits afetivos. Personalize tudo com seu toque!"
  },
  {
    id: 9,
    nome: "Tags/Etiquetas de Papel Personalizadas",
    preco: 1.50,
    img: "https://i.pinimg.com/736x/f0/fb/dd/f0fbdd4e9993442524bb109a59440b07.jpg",
    descricao: "Tags ou etiquetas em papel especial, personalizadas com sua arte, logo ou mensagem. Perfeitas para dar um acabamento profissional e exclusivo aos seus produtos, presentes ou embalagens. Disponíveis em vários formatos e tamanhos, com corte especial opcional."
  }
];

// Seletores
const produtosContainer = document.getElementById('produtos');
const searchInput = document.getElementById('searchInput');
const carrinhoLista = document.getElementById('carrinho-lista');
const finalizarCompraBtn = document.getElementById('finalizar-compra');
const menu = document.getElementById('menu');
const hamburger = document.getElementById('hamburger');

let carrinho = [];

// Renderizar produtos filtrados
function renderizarProdutos(filtro = "") {
  produtosContainer.innerHTML = '';
  const filtroMinusculo = filtro.toLowerCase();
  const produtosFiltrados = produtos.filter(p => p.nome.toLowerCase().includes(filtroMinusculo));
  if (produtosFiltrados.length === 0) {
    produtosContainer.innerHTML = '<p style="text-align:center; color:#999;">Nenhum produto encontrado.</p>';
    return;
  }
  produtosFiltrados.forEach(produto => {
    const divProduto = document.createElement('div');
    divProduto.classList.add('produto');
    divProduto.innerHTML = `
        <img src="${produto.img}" alt="${produto.nome}" />
        <h3>${produto.nome}</h3>
        <p class="descricao">${produto.descricao}</p>
        <p class="preco">R$ ${produto.preco.toFixed(2)}</p>
        <div class="btn-group">
          <button class="btn-comprar" data-id="${produto.id}">Comprar</button>
          <button class="btn-adicionar" data-id="${produto.id}" style="position: relative;">
            Adicionar ao carrinho
            <span class="contador-btn" id="contador-${produto.id}" style="display:none;">0</span>
          </button>
        </div>
      `;
    produtosContainer.appendChild(divProduto);
  });
  ativarBotoes();
}
// Atualizar carrinho visual
function atualizarCarrinho() {
  carrinhoLista.innerHTML = '';
  if (carrinho.length === 0) {
    carrinhoLista.innerHTML = '<li>Seu carrinho está vazio.</li>';
    finalizarCompraBtn.disabled = true;
    return;
  }
  carrinho.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.nome} - R$ ${item.preco.toFixed(2)} (Quantidade: ${item.qtd})`;
    carrinhoLista.appendChild(li);
  });
  finalizarCompraBtn.disabled = false;
}

// Enviar mensagem WhatsApp com texto formatado
function enviarWhatsApp(texto) {
  // Coloque aqui seu número no formato internacional, ex: 5511999999999
  const numeroWhats = "5544997200148";
  const url = `https://api.whatsapp.com/send?phone=${numeroWhats}&text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}

// Comprar produto direto
function comprarProduto(id) {
  const produto = produtos.find(p => p.id == id);
  if (produto) {
    const mensagem = `Oi, estou interessado em comprar uma ${produto.nome.toLowerCase()}.`;
    enviarWhatsApp(mensagem);
  }
}

// Adicionar produto ao carrinho
function adicionarAoCarrinho(id) {
  const idNum = Number(id);
  const produto = produtos.find(p => p.id === idNum);
  if (!produto) return;

  const itemNoCarrinho = carrinho.find(item => item.id === idNum);

  if (itemNoCarrinho) {
    itemNoCarrinho.qtd++;
  } else {
    carrinho.push({ ...produto, qtd: 1 });
  }

  atualizarCarrinho();
  atualizarContadorBotao(idNum);
}


/* ----------------------------------------------? */

function atualizarContadorBotao(id) {
  const contador = document.getElementById(`contador-${id}`);
  const itemNoCarrinho = carrinho.find(item => item.id === id);

  if (itemNoCarrinho && contador) {
    contador.textContent = itemNoCarrinho.qtd;
    contador.style.display = 'inline-block';
  } else if (contador) {
    contador.style.display = 'none';
  }
}

// Finalizar compra enviando lista via WhatsApp
function finalizarCompra() {
  if (carrinho.length === 0) return;

  let mensagem = "Olá, gostaria de comprar os seguintes produtos:\n";

  carrinho.forEach((item, i) => {
    const subtotal = item.preco * item.qtd;
    mensagem += `${i + 1}. ${item.nome} - Quantidade: ${item.qtd} - R$ ${subtotal.toFixed(2)}\n`;
  });

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.qtd, 0);
  mensagem += `Total: R$ ${total.toFixed(2)}`;

  enviarWhatsApp(mensagem);
}

// Ativar eventos dos botões
function ativarBotoes() {
  document.querySelectorAll('.btn-comprar').forEach(btn => {
    btn.onclick = () => comprarProduto(btn.dataset.id);
  });
  document.querySelectorAll('.btn-adicionar').forEach(btn => {
    btn.onclick = () => adicionarAoCarrinho(btn.dataset.id);
  });
}

// Pesquisa ao digitar
searchInput.addEventListener('input', () => {
  renderizarProdutos(searchInput.value);
});

//LIMPA CARRINHO
document.getElementById("limpar-carrinho").addEventListener("click", () => {
  carrinho = []; // Zera o array de itens
  atualizarCarrinho(); // Atualiza a exibição do carrinho
});

// Finalizar compra
finalizarCompraBtn.addEventListener('click', finalizarCompra);

// Renderizar inicial
renderizarProdutos();

// Menu responsivo
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menu.classList.toggle('open');
});
// Fechar menu ao clicar em link
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    menu.classList.remove('open');
  });
});

// Carrossel
const carouselInner = document.getElementById('carousel-inner');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
let index = 0;

function mostrarSlide(i) {
  const total = carouselInner.children.length;
  if (i < 0) index = total - 1;
  else if (i >= total) index = 0;
  else index = i;
  const width = carouselInner.children[0].offsetWidth;
  carouselInner.style.transform = `translateX(${-index * width}px)`;
}

prevBtn.addEventListener('click', () => mostrarSlide(index - 1));
nextBtn.addEventListener('click', () => mostrarSlide(index + 1));

window.addEventListener('resize', () => mostrarSlide(index));

// Auto slide a cada 5s
setInterval(() => mostrarSlide(index + 1), 5000);


/* CURSOR */

const cursor = document.createElement("div");
cursor.classList.add("cursor-bolinha");
document.body.appendChild(cursor);

// Atualiza a posição do cursor
document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Aumenta a bolinha ao passar por links e botões
const elementosInterativos = document.querySelectorAll("a, button, .btn-contato");

elementosInterativos.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "30px";
    cursor.style.height = "30px";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "15px";
    cursor.style.height = "15px";
  });
});

//BOTÃO VOLTAR TOPO
const btnTopo = document.getElementById("btnTopo");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTopo.classList.add("mostrar");
  } else {
    btnTopo.classList.remove("mostrar");
  }
});

btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

//ENVIAR MENSAGEM
function enviarMensagem() {
  const texto = document.getElementById('mensagem').value.trim();
  if (!texto) return alert("Por favor, escreva uma mensagem.");
  const numero = '5544997200148';
  const link = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
  window.open(link, '_blank');
}


//carroseel avaliação
let avaliacaoAtual = 0;
const avaliacoes = document.querySelectorAll(".avaliacao-item");
const tempoTroca = 5000; // 5 segundos

function mostrarAvaliacao(index) {
  avaliacoes.forEach((item, i) => {
    item.classList.remove("ativo");
    if (i === index) {
      item.classList.add("ativo");
    }
  });
}

function mudarAvaliacao(direcao) {
  avaliacaoAtual += direcao;
  if (avaliacaoAtual < 0) avaliacaoAtual = avaliacoes.length - 1;
  if (avaliacaoAtual >= avaliacoes.length) avaliacaoAtual = 0;
  mostrarAvaliacao(avaliacaoAtual);
}

function iniciarCarrossel() {
  setInterval(() => {
    mudarAvaliacao(1);
  }, tempoTroca);
}

mostrarAvaliacao(avaliacaoAtual);
iniciarCarrossel();

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;

    // Fecha outros FAQs abertos (opcional)
    document.querySelectorAll('.faq-item').forEach(i => {
      if (i !== item) i.classList.remove('active');
    });

    item.classList.toggle('active');
  });
});