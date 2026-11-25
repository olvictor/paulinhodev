---
title: "SAP S/4HANA Cloud Public Edition: premissa e tipos de desenvolvimento"
date: 2026-11-24
description: Por que o Public Cloud funciona do jeito que funciona e quais são as formas de estendê-lo: key user, developer extensibility e side-by-side.
tags: [sap, s4hana, abap-cloud, btp, extensibilidade]
draft: false
---

## Sumário

1. [A premissa do Public Cloud](#1-a-premissa-do-public-cloud)
2. [Clean core](#2-clean-core)
3. [Objetos liberados (released)](#3-objetos-liberados-released)
4. [Os 3 tipos de desenvolvimento](#4-os-3-tipos-de-desenvolvimento)
   - [4.1 Key user extensibility](#41-key-user-extensibility)
   - [4.2 Developer extensibility (ABAP Cloud on-stack)](#42-developer-extensibility-abap-cloud-on-stack)
   - [4.3 Side-by-side extensibility (SAP BTP)](#43-side-by-side-extensibility-sap-btp)
5. [Comparativo](#5-comparativo)
6. [Como decidir](#6-como-decidir)
7. [Onde consultar](#7-onde-consultar)

---

## 1. A premissa do Public Cloud

O S/4HANA Cloud Public Edition é um **SaaS (Software as a Service) multi-tenant operado pela SAP**.

Isso significa:

| Característica | Consequência |
|---|---|
| A SAP opera a infraestrutura, o banco e o basis | O cliente não tem acesso ao servidor nem à camada técnica |
| Vários clientes compartilham o mesmo código-base | Ninguém pode alterar o código standard |
| Upgrades são **obrigatórios e automáticos**, em cadência fixa | Toda extensão precisa sobreviver ao upgrade sem intervenção |
| Os processos seguem **best practices** (scope items) | A implementação parte do padrão (**fit-to-standard**) e só trata gaps |
| A configuração é feita por apps (Central Business Configuration) | Não existe SPRO, SE38, SE11 ou SM30 como no on-premise |

> **Em uma frase:** o cliente adota o processo padrão da SAP e só estende o sistema por caminhos que a SAP garante que **não quebram no upgrade**.

### Comparação com o mundo on-premise / ECC

| On-premise / ECC | Public Cloud |
|---|---|
| Cliente decide quando atualizar | SAP atualiza todos os clientes |
| Modificação de standard é possível (com chave de acesso) | Modificação é impossível |
| Qualquer tabela, FM ou classe pode ser usada | Só objetos **liberados** |
| Customização via SPRO | Configuração via apps (CBC, Manage Your Solution) |
| Blueprint "do zero" | Fit-to-standard a partir de scope items |

---

## 2. Clean core

**Clean core** é o princípio de manter o núcleo do ERP **sem modificações**, com toda customização feita **fora do código standard**, por meio de interfaces estáveis.

Benefícios:

- **Upgrades sem retrabalho**: as extensões não dependem de detalhes internos da SAP.
- **Menor custo de manutenção**: menos regressões e menos "remendos" a cada versão.
- **Inovação contínua**: o cliente recebe as novidades de cada release sem um projeto de upgrade.

No Public Cloud, o clean core **não é uma recomendação, é uma regra técnica**: o sistema simplesmente não permite outro caminho.

---

## 3. Objetos liberados (released)

Todos os tipos de desenvolvimento se apoiam em **objetos liberados**: CDS views, classes, interfaces, BAdIs, APIs remotas e eventos que a SAP **se compromete a manter estáveis** entre releases.

| Contrato | Significado (resumo) |
|---|---|
| **C0** | Estável para **extensão** (ex.: um CDS ou BO que pode receber campos e lógica) |
| **C1** | Estável para **uso** em ABAP Cloud dentro do sistema (classes, CDS, BAdIs) |
| **C2** | Estável para uso como **API remota** |

Regra prática: **se não é liberado, não pode ser usado**. Quando falta uma API:

1. Procurar um objeto sucessor (Cloudification Repository).
2. Avaliar outro tipo de extensão (key user, side-by-side).
3. Solicitar à SAP pelo **Customer Influence**.

---

## 4. Os 3 tipos de desenvolvimento

O que diferencia os três modelos é **quem faz**, **com qual ferramenta** e, principalmente, **onde a solução roda**.

<div class="ext-diagram" role="img" aria-label="Key user e developer extensibility rodam dentro do S/4HANA Cloud; side-by-side roda fora, na SAP BTP, e se comunica por API, OData, SOAP e eventos.">
<div class="ext-zone">
<div class="ext-zone-title">SAP S/4HANA Cloud Public Edition</div>
<div class="ext-cards">
<div class="ext-card"><span class="ext-kind">Key user</span><strong>Apps Fiori</strong><small>Custom Fields, Custom Logic, CBO…</small></div>
<div class="ext-card"><span class="ext-kind">Developer</span><strong>ABAP Cloud / ADT</strong><small>RAP, CDS, BAdIs, ABAP Unit…</small></div>
</div>
<div class="ext-where">▲ roda <b>dentro</b> do S/4</div>
<div class="ext-core">Código standard SAP · intocável</div>
</div>
<div class="ext-link" aria-hidden="true">
<span class="ext-line"></span>
<div class="ext-protocols"><span>API</span><span>OData</span><span>SOAP</span><span>Events</span></div>
</div>
<div class="ext-zone ext-zone-btp">
<div class="ext-zone-title">SAP BTP</div>
<div class="ext-cards">
<div class="ext-card ext-card-accent"><span class="ext-kind">Side-by-side</span><strong>Apps e serviços na BTP</strong><small>CAP, ABAP Environment, Build Apps, SBPA, Integration Suite…</small></div>
</div>
<div class="ext-where">▲ roda <b>fora</b> do S/4</div>
</div>
</div>

### 4.1 Key user extensibility

**O que é:** extensões feitas **por meio de apps Fiori**, sem Eclipse e com pouco ou nenhum código.

**Quem faz:** consultor funcional, key user do cliente ou desenvolvedor.

**Principais ferramentas:**

| App / recurso | Para que serve | Exemplo |
|---|---|---|
| **Custom Fields** | Criar campos novos e disponibilizá-los em telas, APIs, formulários e relatórios | Campo "Código do projeto interno" no pedido de venda |
| **Custom Logic** | Implementar BAdIs liberadas num editor web, com ABAP restrito | Preencher ou validar um campo ao salvar |
| **Custom Business Objects (CBO)** | Criar um objeto simples com persistência, UI e API OData gerados | Cadastro auxiliar de "tipos de garantia" |
| **Custom CDS Views** | Visões de dados sobre CDS liberadas, sem código | Base para um relatório customizado |
| **Custom Analytical Queries** | Relatórios analíticos | KPI de vendas por região |
| **Adapt UI** | Esconder, mover ou renomear campos na tela | Simplificar uma tela para um perfil |
| **Custom Communication Scenarios** | Expor CBOs ou CDS como API | Disponibilizar o CBO para integração |

**Vantagens**

- Rápido e barato.
- Não exige desenvolvedor, e o próprio cliente pode manter.
- Já vem integrado a telas, APIs e formulários.

**Limitações**

- Lógica limitada: sem classes reutilizáveis, sem testes unitários robustos e com acesso restrito a APIs.
- CBO é adequado para dados simples, não para regras complexas.
- Pouco controle sobre arquitetura e performance.

**Use quando:** a necessidade é um campo, uma validação ou derivação simples, um relatório ou um cadastro simples.

---

### 4.2 Developer extensibility (ABAP Cloud on-stack)

**O que é:** desenvolvimento ABAP no **Eclipse (ABAP Development Tools)**, **dentro do próprio S/4HANA Public Cloud**, seguindo o modelo **ABAP Cloud**.

**Quem faz:** desenvolvedor ABAP Cloud.

**O que permite:**

- Aplicações **RAP** completas (managed/unmanaged, draft, validações, determinations, actions, autorização).
- **CDS views** próprias e extensão de CDS standard liberadas.
- **Tabelas, classes e interfaces** próprias, com reuso.
- Extensão de **RAP BOs standard** liberados para extensão.
- Implementação de **BAdIs** com ABAP completo (dentro das regras do ABAP Cloud).
- **ABAP Unit**, test doubles e **ATC**.
- Application jobs, application logs e business events.

**Vantagens**

- Muito mais poder que o key user.
- Lógica **perto dos dados**: boa performance e sem latência de rede.
- **Consistência transacional**: a extensão grava na mesma LUW do documento standard.
- **Sem custo adicional** (incluído na assinatura do S/4).

**Limitações**

- Exige desenvolvedor com conhecimento de ABAP Cloud.
- Restrito a objetos liberados (contrato C1/C0).
- Ciclo de transporte formal (software components, gCTS).
- A extensão compartilha o ciclo de vida, os usuários e a capacidade do S/4.

**Use quando:** a lógica é complexa, precisa de reuso e testes, ou está **fortemente acoplada** ao processo do S/4 (tem que gravar e falhar junto com o documento).

> ⚠️ **Atenção:** um app RAP criado no Eclipse **dentro do S/4** é **developer extensibility**, não side-by-side.

---

### 4.3 Side-by-side extensibility (SAP BTP)

**O que é:** a solução roda **fora do S/4**, na **SAP Business Technology Platform (BTP)**, e se comunica com o S/4 de forma **remota** por **APIs (OData, SOAP)** e **eventos**.

**O que define o side-by-side é ONDE a solução roda (na BTP), não a tecnologia usada.**

**Tecnologias comuns:**

| Tecnologia | Uso típico |
|---|---|
| **CAP (Node.js / Java)** | Aplicações e serviços na BTP |
| **SAP BTP ABAP Environment** ("Steampunk") | RAP / ABAP Cloud rodando **num sistema ABAP separado** do S/4 |
| **SAP Build Apps** | Apps low-code |
| **SAP Build Process Automation (SBPA)** | Workflows, aprovações, automações |
| **SAP Integration Suite** | Orquestração, transformação e integração com vários sistemas (**opcional**) |
| **SAP Event Mesh / Advanced Event Mesh** | Arquitetura orientada a eventos |
| **SAP Build Work Zone** | Portal e ponto de entrada para os apps |
| **SAP AI Core / Generative AI Hub** | Cenários de IA |

> O Integration Suite **não é obrigatório** no side-by-side. Muitos apps chamam a API do S/4 diretamente por meio de uma *destination* na BTP. Ele entra quando é preciso orquestrar, transformar ou conectar vários sistemas.

**Vantagens**

- **Usuários externos** (fornecedores, clientes, técnicos de campo) sem licença de S/4.
- Integra **vários sistemas** (S/4, CRM, legados, SaaS de terceiros).
- **Ciclo de vida independente** do S/4 e possibilidade de reuso entre empresas ou clientes.
- **Escala própria** para alto volume ou processamento pesado.
- Acesso a recursos que **não existem no S/4** (workflow avançado, IA, mobile).

**Limitações**

- **Custo adicional** (serviços BTP).
- **Latência de rede**.
- **Sem consistência transacional** com o S/4: é preciso tratar falhas, retry, idempotência e compensação.
- Arquitetura mais complexa: mais componentes, segurança e monitoramento.

**Use quando:** a solução é **desacoplada** do S/4, envolve usuários externos ou outros sistemas, precisa de ciclo de vida ou escala próprios, ou usa tecnologias que o S/4 não oferece.

---

## 5. Comparativo

| Critério | Key user | Developer (on-stack) | Side-by-side (BTP) |
|---|---|---|---|
| **Quem faz** | Funcional / key user | Dev ABAP Cloud | Dev BTP (CAP, ABAP Env., Build) |
| **Ferramenta** | Apps Fiori | Eclipse (ADT) | BTP (BAS, Build, ADT) |
| **Onde roda** | Dentro do S/4 | Dentro do S/4 | **Fora do S/4** |
| **Complexidade possível** | Baixa | Alta | Alta |
| **Acesso aos dados do S/4** | Local, restrito | Local, mesma LUW | Remoto (API / evento) |
| **Consistência transacional** | ✅ | ✅ | ❌ |
| **Custo adicional** | ❌ | ❌ | ✅ |
| **Usuários externos** | ❌ | Limitado | ✅ |
| **Integra vários sistemas** | ❌ | Limitado | ✅ |
| **Testes automatizados** | Limitado | ✅ ABAP Unit | ✅ |
| **Manutenção pelo cliente** | Fácil | Requer dev | Requer dev |

### Regra rápida para identificar

| Pergunta | Resposta |
|---|---|
| Fiz pelo app Fiori, sem Eclipse? | **Key user** |
| Fiz no Eclipse, **dentro do S/4**? | **Developer extensibility** |
| Roda **na BTP**, fora do S/4, e fala com ele por API ou evento? | **Side-by-side** |

---

## 6. Como decidir

Siga as perguntas em ordem:

```
1. O standard (scope item / configuração) já resolve?
   └─ SIM → Não desenvolva. Configure.
   └─ NÃO ↓

2. É um campo, uma validação/derivação simples, um relatório ou um cadastro simples?
   └─ SIM → KEY USER
   └─ NÃO ↓

3. A lógica é complexa, precisa de reuso/testes ou está fortemente acoplada
   à transação do S/4 (grava e falha junto com o documento)?
   └─ SIM → DEVELOPER EXTENSIBILITY (ABAP Cloud on-stack)
   └─ NÃO ↓

4. Envolve usuários externos, outros sistemas, ciclo de vida independente,
   escala própria ou tecnologia que o S/4 não tem?
   └─ SIM → SIDE-BY-SIDE (BTP)
```

**Princípio geral:**

> Quanto **mais acoplado** ao processo e aos dados do S/4, mais a solução fica **dentro** dele.
> Quanto **mais desacoplado**, independente ou externo, mais ela vai para a **BTP**.
> Dentro do S/4, escolha **o modelo mais simples que resolve**.

### Argumentos para justificar ao cliente

| Escolha | Argumento |
|---|---|
| Key user | "É mais rápido, não tem custo extra e o seu time consegue manter sozinho." |
| Developer | "A regra precisa gravar junto com o documento e ser testada. Dentro do S/4 garantimos consistência e performance, sem custo de BTP." |
| Side-by-side | "O usuário é externo / envolve outros sistemas / evolui em ritmo próprio. Rodar na BTP evita licenças de S/4 e desacopla a solução do upgrade do ERP." |

---


## 7. Onde consultar

| Recurso | Para quê |
|---|---|
| **SAP Business Accelerator Hub** (api.sap.com) | APIs remotas, eventos e communication scenarios |
| **Released Objects** (view no ADT) | Objetos liberados para ABAP Cloud |
| **SAP Learning** | Trilhas de ABAP Cloud, RAP, BTP e extensibilidade |
