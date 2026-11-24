# Portfólio · Seu Nome

Portfólio pessoal em **React + TypeScript + Vite**, com um blog em Markdown que só o autor publica (sem comentários nem login).

Paleta: fundo `#F4F1EA` · texto `#16161A` · apoio `#6B6860` · linhas `#DCD6C8` · acento `#2F4BFF`

## Rodando

```bash
npm install
npm run dev        # http://localhost:5173 (blog desligado)
npm run dev:blog   # mesmo site, com o blog ligado e rascunhos visíveis
npm run build      # gera a versão final em /dist
npm run preview    # testa o /dist localmente
```

## Onde editar

| O quê | Arquivo |
|---|---|
| Nome, cargo, e-mail, links, "ouvindo / jogando / assistindo" | `src/config/site.ts` |
| Texto do Sobre, números e foto | `src/data/about.ts` (foto: coloque em `public/` e use `'/foto.jpg'`) |
| Linha do tempo | `src/data/timeline.ts` |
| Projetos (`featured: true` aparece na home) | `src/data/projects.ts` |
| Cores e fontes | topo de `src/styles/global.css` |
| Título e descrição para buscadores | `index.html` |

## Blog

O blog está **desligado**. Enquanto isso, `/blog` mostra uma página "Em breve" e o menu exibe a etiqueta "em breve".

**Para ligar:** em `src/config/site.ts`, troque para `blogEnabled: true`.

**Para escrever um post:** crie um arquivo `.md` em `src/content/posts/`. O nome do arquivo vira o endereço (`meu-post.md` → `/blog/meu-post`).

```md
---
title: Título do post
date: 2026-11-10
description: Uma frase de resumo.
tags: [react, musica]
draft: false
---

Texto em **Markdown**.
```

Com `draft: true`, o post aparece só no `npm run dev:blog` e não vai para o site publicado. Os posts entram no build: para publicar um novo, é só fazer commit e deploy.

## Estrutura

```
src/
  config/site.ts        configurações gerais + chave do blog
  data/                 sobre, timeline, projetos
  content/posts/        posts do blog (.md)
  lib/posts.ts          leitura dos posts, frontmatter e Markdown
  components/           Nav, Footer, Wave (onda animada), Timeline, CountUp, Reveal...
  pages/                Home, Projetos, Sobre, Contato, Blog, Post, Em breve, 404
  styles/global.css     estilos e paleta
```

## Deploy

Funciona em **Vercel**, **Netlify** ou **Cloudflare Pages**:

- Build command: `npm run build`
- Output directory: `dist`

Os arquivos `vercel.json` e `public/_redirects` já fazem as rotas (`/sobre`, `/blog/...`) funcionarem ao recarregar a página.
