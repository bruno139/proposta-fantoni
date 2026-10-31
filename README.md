# Proposta Fantoni PDV

Página de proposta comercial (demonstrativo geral) do sistema Fantoni PDV. Os itens são ligados e desligados na tela, e os totais (mensal, pagamento único e valor total) são calculados na hora.

## Como abrir

Precisa do [Node.js](https://nodejs.org) instalado. Dê dois cliques em `iniciar.bat`, ou rode:

```
node server.js
```

e abra http://localhost:3002.

## Onde mudar preços e textos

Tudo fica em `public/dados.js`: plano base, módulos, taxas de implantação, serviços extras e a frase do acerto mensal (dia 10).
