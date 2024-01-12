import { useContext } from "react"
import { CarrinhoContext } from "../context/context"

export const useCarrinhoContext = () => {
    const { carrinho, setCarrinho, quantidade, setQuantidade, valorTotal, setValorTotal } = useContext(CarrinhoContext)

    function mudarQuantidade (id, quantidade) {
        return carrinho.map((itemDoCarrinho) => {
            if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
            return itemDoCarrinho
        })
    }

    function adicionarProduto(novoProduto) {
      const temOProduto = carrinho.some((itemDoCarrinho) => {
        return itemDoCarrinho.id === novoProduto.id;
      });
  
      if (!temOProduto) {
        novoProduto.quantidade = 1;
        return setCarrinho((carrinhoAnterior) => [
          ...carrinho,
          novoProduto,
        ])
      }
  
      const carrinhoAtualizado = mudarQuantidade(novoProduto.id, 1)

      setCarrinho([...carrinhoAtualizado])
    }

    function removerProduto(id) {
        const produto = carrinho.find((itemDoCarrinho) => itemDoCarrinho.id === id);
        const ehOUltimo = produto.quantidade === 1;
        
        if (ehOUltimo) {
            return setCarrinho((carrinhoAnterior) =>
                carrinhoAnterior.filter((itemDoCarrinho) => itemDoCarrinho.id !== id)
            );
        }
        
        const carrinhoAtualizado = mudarQuantidade(id, -1)

        setCarrinho([...carrinhoAtualizado]);
    }

    function removerProdutoCarrinho(id) {
        const produto = carrinho.filter((itemDoCarrinho) => itemDoCarrinho.id !== id);
        setCarrinho(produto);
    }

    

    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        removerProdutoCarrinho,
    }
}