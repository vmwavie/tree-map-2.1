import integrationsList from '@/interface/integrations';
import StockExchangeLogo from '@/assets/icons/stock-exchange.png';
import AnimeRankLogo from '@/assets/icons/anime.png';
import BookRankLogo from '@/assets/icons/book.png';

const integrationsList = [
  { id: 1, name: 'Stock Exchange', logo: StockExchangeLogo },
  { id: 2, name: 'Anime Rank', logo: AnimeRankLogo },
  { id: 3, name: 'Book Rank', logo: BookRankLogo },
] as integrationsList[];

export default integrationsList;
