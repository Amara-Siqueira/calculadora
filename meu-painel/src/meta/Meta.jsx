
import { useState } from "react";

const Meta = () => {
  const [encomendador, setEncomendador] = useState("nao");

  const [unidade, setUnidade] = useState({
    ak: 0,
    muni: 0,
    lock: 0,
    cartao: 0,
  });

  const valoresPadrao = {
    ak: 2500,
    muni: 200,
    lock: 2000,
    cartao: 3000,
  };

  const valoresEncomenda = {
    ak: 3000,
    muni: 250,
    lock: 2500,
    cartao: 3500,
  };

  const valores =
    encomendador === "nao"
      ? valoresPadrao
      : valoresEncomenda;

  const produtos = [
    { id: "ak", nome: "AK-47" },
    { id: "muni", nome: "Munição" },
    { id: "lock", nome: "Lock Pick" },
    { id: "cartao", nome: "Cartão" },
  ];

  const atualizarUnidade = (produto, quantidade) => {
    setUnidade((anterior) => ({
      ...anterior,
      [produto]: Math.max(0, Number(quantidade)),
    }));
  };

  const total = produtos.reduce((soma, produto) => {
    return soma + unidade[produto.id] * valores[produto.id];
  }, 0);

  return (
    <div>
      <p>É encomendador?</p>

      <label>
        <input
          type="radio"
          name="encomendador"
          value="nao"
          checked={encomendador === "nao"}
          onChange={(e) => setEncomendador(e.target.value)}
        />
        Não
      </label>

      <label>
        <input
          type="radio"
          name="encomendador"
          value="sim"
          checked={encomendador === "sim"}
          onChange={(e) => setEncomendador(e.target.value)}
        />
        Sim
      </label>
    {
        encomendador === "nao"? (
            <form onSubmit={(e) => e.preventDefault()} >
        <h2>Produtos</h2>

        {produtos.map((produto) => (
          <div key={produto.id}>
            <label htmlFor={produto.id}>
              {produto.nome} - R$   {" "}
              {valores[produto.id].toLocaleString("pt-BR")}
            </label>

            <input
              id={produto.id}
              type="number"
              min="0"
              value={unidade[produto.id]}
              onChange={(e) =>
                atualizarUnidade(produto.id, e.target.value)
              }
            />

            <p>
              Subtotal: R$
              {(unidade[produto.id] * valores[produto.id])
                .toLocaleString("pt-BR")}
            </p>
          </div>
        ))}

        <h2>
          Valor a pagar: {" "}
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h2>
      </form>
        ):(
            <form onSubmit={(e) => e.preventDefault()}>
        <h2>Produtos</h2>

        {produtos.map((produto) => (
          <div key={produto.id}>
            <label htmlFor={produto.id}>
              {produto.nome} - R$  {" "}
              {valores[produto.id].toLocaleString("pt-BR")}
            </label>

            <input
              id={produto.id}
              type="number"
              min="0"
              value={unidade[produto.id]}
              onChange={(e) =>
                atualizarUnidade(produto.id, e.target.value)
              }
            />

            <p>
              Subtotal: R$
              {(unidade[produto.id] * valores[produto.id])
                .toLocaleString("pt-BR")}
            </p>
          </div>
        ))}

        <h2>
          Valor a pagar: {" "}
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </h2>
      </form>
        )
    }
    </div>
  );
};

export default Meta;