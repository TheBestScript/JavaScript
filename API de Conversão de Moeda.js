// função assíncrona para converter moeda
async function converterMoeda(valor, moedaInicial, moedasDestino) {
    const chaveAPI = 'https://v6.exchangerate-api.com/v6/e2e1bc63ab31869dd1ca85b1/latest/USD';
    //codigo da API: e2e1bc63ab31869dd1ca85b1
    
    const url = `https://exchangerate-api.org`;
    
    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();
  
      if (dados.result !== "success") {
        throw new Error('Falha ao obter taxas de câmbio');
      }
  
      const taxasDeCambio = dados.conversion_rates;
  
      const valoresConvertidos = moedasDestino.map(moeda => {
        const taxa = taxasDeCambio[moeda];
        if (taxa) {
          return {
            moeda,
            valorConvertido: valor * taxa
          };
        } else {
          return {
            moeda,
            erro: 'Taxa de câmbio não disponível'
          };
        }
      });
  
      return valoresConvertidos;
    } catch (erro) {
      console.error('Erro ao realizar a conversão:', erro);
      return [];
    }
  }
  
  // teste de uso
  const valorEmReais = 100;
  const moedaInicial = 'BRL';
  const moedasDestino = ['USD', 'EUR', 'GBP']; 
  
  converterMoeda(valorEmReais, moedaInicial, moedasDestino)
    .then(resultados => {
      console.log(resultados);
    })
    .catch(error => {
      console.error('Erro ao converter:', error);
    });
  
