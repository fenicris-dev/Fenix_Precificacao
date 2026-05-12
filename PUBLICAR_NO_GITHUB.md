# 🔥 Fênix PWA — Guia de Publicação no GitHub Pages

## O que você vai ter no final
Um link público `https://seu-usuario.github.io/fenix/` que abre o Fênix  
como um **app instalável** no celular — ícone na tela inicial, funciona offline.

---

## ✅ PRÉ-REQUISITO
Criar uma conta gratuita em **https://github.com** (se ainda não tiver).

---

## PASSO 1 — Criar o repositório

1. Acesse **https://github.com/new**
2. Preencha:
   - **Repository name:** `fenix`
   - **Visibility:** ✅ Public
   - **NÃO** marque nenhuma opção extra
3. Clique em **Create repository**

---

## PASSO 2 — Fazer upload dos arquivos

Na página do repositório recém-criado:

1. Clique em **"uploading an existing file"** (link no centro da tela)
2. Arraste os **5 arquivos** da pasta `fenix-pwa` para a área de upload:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
3. Em **Commit changes**, deixe a mensagem padrão ou escreva `primeira versão`
4. Clique em **Commit changes**

---

## PASSO 3 — Ativar o GitHub Pages

1. No repositório, clique em **Settings** (aba superior)
2. No menu lateral esquerdo, clique em **Pages**
3. Em **Source**, selecione:
   - Branch: **main**
   - Pasta: **/ (root)**
4. Clique em **Save**
5. Aguarde ~1 minuto

O GitHub vai exibir o link:
```
✅ Your site is live at https://seu-usuario.github.io/fenix/
```

---

## PASSO 4 — Instalar no celular (Android)

1. Abra o Chrome no celular
2. Acesse `https://seu-usuario.github.io/fenix/`
3. O Chrome exibirá um banner na parte inferior:
   **"Adicionar Fênix à tela inicial"**
4. Toque em **Adicionar**
5. Pronto — ícone do Fênix 🔥 aparece na área de trabalho!

> Se o banner não aparecer automaticamente:
> - Toque nos **3 pontos** (menu do Chrome)
> - Selecione **"Adicionar à tela inicial"**

---

## PASSO 4b — Instalar no celular (iPhone/Safari)

1. Abra o **Safari** no iPhone
2. Acesse `https://seu-usuario.github.io/fenix/`
3. Toque no ícone de **compartilhar** (quadrado com seta para cima)
4. Role para baixo e toque em **"Adicionar à Tela de Início"**
5. Confirme com **Adicionar**

---

## PASSO 5 — Atualizar o app no futuro

Quando houver uma nova versão do `index.html`:

1. Acesse seu repositório no GitHub
2. Clique no arquivo `index.html`
3. Clique no ícone de **lápis** (editar) ou arraste o novo arquivo
4. Commit → o app atualiza automaticamente em ~1 min

---

## 🔒 Funcionamento offline

Após a primeira visita com internet, o Fênix fica **100% disponível offline**.  
Todos os cálculos, PDF e WhatsApp funcionam sem conexão.  
_(O WhatsApp precisará de internet para enviar a mensagem)_

---

## ❓ Dúvidas frequentes

**O link é público? Qualquer um pode acessar?**  
Sim, o GitHub Pages é público. Se quiser privacidade, use o Netlify com senha  
ou hospede em servidor próprio.

**Posso usar um domínio próprio? Ex: fenix.minhaempresa.com.br**  
Sim! No GitHub Pages > Custom domain, adicione seu domínio.  
Precisará configurar um registro CNAME no seu provedor de DNS.

**O banco de OS fica salvo no celular?**  
Sim. Os dados ficam no `localStorage` do navegador do celular.  
Para migrar entre dispositivos, use **Exportar Banco** → **Importar JSON**.

---

*© Cristiano Fênix — 2026 | Fênix Soluções Tecnológicas*
