const produtosArray = [
  { id: 1, titulo: 'Ferreiro Roche', precoText: 'R$ 39,90', preco: 39.90, imagem: 'img/Produto1.avif', alt: '' },
  { id: 2, titulo: 'KitKat', precoText: 'R$ 45,90', preco: 45.90, imagem: 'img/Produto2.png', alt: '' },
  { id: 3, titulo: 'Sonho de Valsa', precoText: 'R$ 49,90', preco: 49.90, imagem: 'img/Produto3.png', alt: '' },
  { id: 4, titulo: 'Kinder ovo', precoText: 'R$ 44,90', preco: 44.90, imagem: 'img/Produto4.png', alt: '' },
  { id: 5, titulo: 'Chocolate meio a meio', precoText: 'R$ 52,90', preco: 52.90, imagem: 'img/Produto5.png', alt: '' },
  { id: 6, titulo: 'Diamante negro', precoText: 'R$ 46,90', preco: 46.90, imagem: 'img/Produto6.png', alt: '' },
  { id: 7, titulo: 'Cookie', precoText: 'R$ 42,90', preco: 42.90, imagem: 'img/Produto7.png', alt: '' },
  { id: 8, titulo: 'Ovo do Naruto', precoText: 'R$ 55,90', preco: 55.90, imagem: 'img/Produto8.png', alt: '' },
  { id: 9, titulo: 'Ferreiro Roche2', precoText: 'R$ 79,90', preco: 79.90, imagem: 'img/Produto1.avif', alt: '' },
  { id: 10, titulo: 'KitKat2', precoText: 'R$ 99,90', preco: 99.90, imagem: 'img/Produto2.png', alt: '' },
  { id: 11, titulo: 'Sonho de Valsa2', precoText: 'R$ 119,90', preco: 119.90, imagem: 'img/Produto3.png', alt: '' },
  { id: 12, titulo: 'Kinder ovo2', precoText: 'R$ 139,90', preco: 139.90, imagem: 'img/Produto4.png', alt: '' },
  { id: 13, titulo: 'Chocolate meio a meio2', precoText: 'R$ 59,90', preco: 59.90, imagem: 'img/Produto5.png', alt: '' },
  { id: 14, titulo: 'Diamante negro2', precoText: 'R$ 69,90', preco: 69.90, imagem: 'img/Produto6.png', alt: '' },
  { id: 15, titulo: 'Cookie2', precoText: 'R$ 64,90', preco: 64.90, imagem: 'img/Produto7.png', alt: '' },
  { id: 16, titulo: 'Ovo do Naruto2', precoText: 'R$ 74,90', preco: 74.90, imagem: 'img/Produto8.png', alt: '' },
  { id: 17, titulo: 'Ferreiro Roche3', precoText: 'R$ 48,90', preco: 48.90, imagem: 'img/Produto1.avif', alt: '' },
  { id: 18, titulo: 'KitKat3', precoText: 'R$ 47,90', preco: 47.90, imagem: 'img/Produto2.png', alt: '' },
  { id: 19, titulo: 'Sonho de Valsa3', precoText: 'R$ 49,90', preco: 49.90, imagem: 'img/Produto3.png', alt: '' },
  { id: 20, titulo: 'Kinder ovo3', precoText: 'R$ 54,90', preco: 54.90, imagem: 'img/Produto4.png', alt: '' }
];  

function renderProdutos(array) {
  const grid = document.querySelector('.grelha-produtos');
  if (!grid) return;
  grid.innerHTML = '';

  array.forEach(prod => {
    const article = document.createElement('article');
    article.className = 'produto';

    const img = document.createElement('img');
    img.className = 'img-produto';
    img.src = prod.imagem;
    img.alt = prod.alt;

    const h3 = document.createElement('h3');
    h3.textContent = prod.titulo;

    const p = document.createElement('p');
    p.className = 'preco';
    p.textContent = prod.precoText;

    const btn = document.createElement('button');
    btn.className = 'adicionar-carrinho';
    btn.textContent = 'Adicionar';

    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);
    article.appendChild(btn);

    grid.appendChild(article);
  });
}

// carrinho - estrutura simples usando localStorage
const CART_KEY = 'strikingegg_cart_v1';

function loadCart(){
  try{
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  }catch(e){
    return [];
  }
}

function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function getCartCount(cart){
  return cart.reduce((sum, item) => sum + item.qtd, 0);
}

function updateCartBadge(){
  const badge = document.querySelector('.badge-carrinho');
  if(!badge) return;
  const cart = loadCart();
  badge.textContent = getCartCount(cart);
}

function openCartDrawer(){
  const drawer = document.getElementById('cart-drawer');
  if(!drawer) return;
  drawer.setAttribute('aria-hidden','false');
  renderCartItems();
}

function closeCartDrawer(){
  const drawer = document.getElementById('cart-drawer');
  if(!drawer) return;
  drawer.setAttribute('aria-hidden','true');
}

function renderCartItems(){
  const list = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  if(!list) return;
  const cart = loadCart();
  list.innerHTML = '';
  let total = 0;

  cart.forEach(it =>{
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.src = it.imagem;
    img.alt = it.alt || '';
    const info = document.createElement('div');
    info.style.flex = '1';
    info.innerHTML = `<strong>${it.titulo}</strong><div>R$ ${it.preco.toFixed(2)}</div>`;

    const qty = document.createElement('div');
    qty.textContent = `x${it.qtd}`;

    const remove = document.createElement('button');
    remove.textContent = 'Remover';
    remove.className = 'botao botao-secundario';
    remove.style.padding = '6px 8px';
    remove.onclick = ()=>{
      removeFromCart(it.id);
    };

    li.appendChild(img);
    li.appendChild(info);
    li.appendChild(qty);
    li.appendChild(remove);

    list.appendChild(li);

    total += it.preco * it.qtd;
  });

  totalEl.textContent = total.toFixed(2);
}

function addToCart(prodId){
  const prod = produtosArray.find(p=>p.id === prodId);
  if(!prod) return;
  const cart = loadCart();
  const existing = cart.find(i=>i.id === prodId);
  if(existing){
    existing.qtd += 1;
  }else{
    cart.push({ id: prod.id, titulo: prod.titulo, preco: prod.preco, precoText: prod.precoText, imagem: prod.imagem, alt: prod.alt, qtd: 1 });
  }
  saveCart(cart);
  updateCartBadge();
}

function removeFromCart(prodId){
  let cart = loadCart();
  cart = cart.filter(i=>i.id !== prodId);
  saveCart(cart);
  updateCartBadge();
  renderCartItems();
}

// evento dos botões adicionar - delegação
function wireAddButtons(){
  document.addEventListener('click', (e)=>{
    const btn = e.target.closest('.adicionar-carrinho');
    if(!btn) return;
    const article = btn.closest('.produto');
    if(!article) return;
    // identificar produto pelo título
    const titulo = article.querySelector('h3')?.textContent.trim();
    const prod = produtosArray.find(p=>p.titulo === titulo);
    if(!prod) return;
    addToCart(prod.id);
  });
}

// busca
function setupSearch(){
  const input = document.querySelector('.search-input');
  if(!input) return;
  input.addEventListener('input', ()=>{
    const q = input.value.trim().toLowerCase();
    const filtered = produtosArray.filter(p=> p.titulo.toLowerCase().includes(q));
    renderProdutos(filtered);
  });
}

// eventos do drawer
function setupCartToggle(){
  const toggle = document.getElementById('cart-toggle');
  const closeBtn = document.getElementById('cart-close');
  if(toggle) toggle.addEventListener('click', (e)=>{ e.preventDefault(); openCartDrawer(); });
  if(closeBtn) closeBtn.addEventListener('click', ()=> closeCartDrawer());
}

// inicialização
document.addEventListener('DOMContentLoaded', ()=>{
  renderProdutos(produtosArray);
  updateCartBadge();
  wireAddButtons();
  setupSearch();
  setupCartToggle();
});