const brapiSectors = [
  { id: 1, value: 'Retail Trade', friendly_text: 'Comércio Varejista' },
  { id: 2, value: 'Energy Minerals', friendly_text: 'Minerais Energéticos' },
  { id: 3, value: 'Health Services', friendly_text: 'Serviços de Saúde' },
  { id: 4, value: 'Utilities', friendly_text: 'Utilidades' },
  { id: 5, value: 'Finance', friendly_text: 'Finanças' },
  { id: 6, value: 'Consumer Services', friendly_text: 'Serviços ao Consumidor' },
  { id: 7, value: 'Consumer Non-Durables', friendly_text: 'Bens de Consumo Não Duráveis' },
  { id: 8, value: 'Non-Energy Minerals', friendly_text: 'Minerais não Energéticos' },
  { id: 9, value: 'Commercial Services', friendly_text: 'Serviços Comerciais' },
  { id: 10, value: 'Distribution Services', friendly_text: 'Serviços de Distribuição' },
  { id: 11, value: 'Transportation', friendly_text: 'Transporte' },
  { id: 12, value: 'Technology Services', friendly_text: 'Serviços de Tecnologia' },
  { id: 13, value: 'Process Industries', friendly_text: 'Indústrias de Processo' },
  { id: 14, value: 'Communications', friendly_text: 'Comunicações' },
  { id: 15, value: 'Producer Manufacturing', friendly_text: 'Manufatura de Produtores' },
  { id: 16, value: 'null', friendly_text: 'Outros' },
  { id: 17, value: 'Miscellaneous', friendly_text: 'Diversos' },
  { id: 18, value: 'Electronic Technology', friendly_text: 'Tecnologia Eletrônica' },
  { id: 19, value: 'Industrial Services', friendly_text: 'Serviços Industriais' },
  { id: 20, value: 'Health Technology', friendly_text: 'Tecnologia de Saúde' },
  { id: 21, value: 'Consumer Durables', friendly_text: 'Bens de Consumo Duráveis' },
];

const brapiTypes = [
  { id: 1, value: 'stock', friendly_text: 'Ações' },
  { id: 3, value: 'bdr', friendly_text: 'BDRs' },
];

const brapiSortby = [
  { id: 1, value: 'name', friendly_text: 'Nome do ticker' },
  { id: 2, value: 'close', friendly_text: 'Preço de fechamento' },
  { id: 3, value: 'change', friendly_text: 'Variação percentual' },
  { id: 4, value: 'change_abs', friendly_text: 'Variação no preço absoluto' },
  { id: 5, value: 'volume', friendly_text: 'Volume de negociação' },
  { id: 6, value: 'market_cap_basic', friendly_text: 'Capitalização de mercado' },
];

export { brapiTypes, brapiSectors, brapiSortby };
