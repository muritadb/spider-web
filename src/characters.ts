import assets from '../public/assets/manifest.json';

export type Character = {
  id: Exclude<keyof typeof assets, 'hero'>;
  name: string;
  surname: string;
  alias: string;
  earth: string;
  location: string;
  headline: string;
  description: string;
  style: string;
  palette: string[];
  note: string;
  imageAlt: string;
};

export { assets };

export const characters: Character[] = [
  {
    id: 'miles', name: 'Miles', surname: 'Morales', alias: 'Homem-Aranha', earth: '1610', location: 'Brooklyn, Nova York',
    headline: 'O seu mundo. As suas regras.',
    description: 'Entre os cadernos de desenho e os prédios do Brooklyn, Miles encontra seu próprio jeito de ser herói. Seu universo tem a energia das ruas e a liberdade de quem ainda está descobrindo o próprio traço.',
    style: 'Grafite & quadrinhos', palette: ['#ed2843', '#101014', '#59d9ef'], note: 'Retículas, linhas de movimento e cores fora de registro. Uma cidade que parece ter saído das páginas de uma HQ.',
    imageAlt: 'Pôster oficial de Miles Morales em seu uniforme preto e vermelho de Homem-Aranha.',
  },
  {
    id: 'gwen', name: 'Gwen', surname: 'Stacy', alias: 'Mulher-Aranha', earth: '65', location: 'Nova York',
    headline: 'Há cores que dizem tudo.',
    description: 'Baterista, heroína e dona de um ritmo só seu. No mundo de Gwen, as emoções atravessam a paisagem: o que ela sente ganha cor, escorre pelas paredes e transforma a cidade em uma pintura viva.',
    style: 'Aquarela & emoção', palette: ['#ef9bc9', '#ddd0f4', '#72cbd5'], note: 'Contornos que se dissolvem, pinceladas aparentes e encontros de rosa e azul. Aqui, o cenário também sente.',
    imageAlt: 'Pôster oficial de Gwen Stacy com seu uniforme branco, preto e rosa de Mulher-Aranha.',
  },
  {
    id: 'miguel', name: 'Miguel', surname: 'O’Hara', alias: 'Homem-Aranha 2099', earth: '928', location: 'Nueva York, 2099',
    headline: 'O futuro tem suas próprias teias.',
    description: 'Em uma metrópole que cresce em direção ao amanhã, Miguel carrega o peso de proteger o multiverso. Preciso e intenso, ele se move entre estruturas imensas e tecnologias que redesenham o horizonte.',
    style: 'Futurismo & geometria', palette: ['#fc4149', '#141e50', '#5b8bf9'], note: 'Escala monumental, luzes cortantes e formas geométricas. Um futuro de alta tecnologia com textura de pintura.',
    imageAlt: 'Pôster oficial de Miguel O’Hara com seu uniforme azul e vermelho de Homem-Aranha 2099.',
  },
  {
    id: 'hobie', name: 'Hobie', surname: 'Brown', alias: 'Spider-Punk', earth: '138', location: 'Nova Londres',
    headline: 'Nenhuma regra. Muito ruído.',
    description: 'Guitarra nas costas, atitude na medida e nenhuma vontade de seguir o roteiro. Hobie é uma colagem em movimento: muda de cor, de textura e de ritmo sem pedir licença.',
    style: 'Punk & colagem', palette: ['#eaff35', '#e34792', '#232222'], note: 'Papel rasgado, xerox, recortes de jornal e cartazes de shows. A imperfeição é parte da linguagem.',
    imageAlt: 'Pôster oficial de Hobie Brown, o Spider-Punk, com guitarra e uniforme de estética punk.',
  },
  {
    id: 'pavitr', name: 'Pavitr', surname: 'Prabhakar', alias: 'Homem-Aranha Índia', earth: '50101', location: 'Mumbattan',
    headline: 'Uma cidade. Mil possibilidades.',
    description: 'Em Mumbattan, a energia de Mumbai encontra a verticalidade de Manhattan. Entre pontes, torres e ruas cheias de vida, Pavitr traz leveza e confiança para cada novo salto.',
    style: 'Quadrinhos indianos & cor', palette: ['#e96d28', '#e7b83a', '#167e82'], note: 'Cores quentes, linhas de tinta e camadas de arquitetura. Uma homenagem à riqueza visual dos quadrinhos indianos.',
    imageAlt: 'Pôster oficial de Pavitr Prabhakar em seu uniforme de Homem-Aranha Índia.',
  },
  {
    id: 'peter', name: 'Peter B.', surname: 'Parker', alias: 'Homem-Aranha', earth: '616', location: 'Nova York',
    headline: 'Todo herói continua aprendendo.',
    description: 'Experiência não significa ter todas as respostas. Entre grandes responsabilidades e pequenos momentos em família, Peter B. prova que sempre existe espaço para recomeçar — e para ajudar alguém a dar o primeiro salto.',
    style: 'HQ clássica & afeto', palette: ['#bf3b39', '#e5d5b3', '#3d688c'], note: 'Papel, retículas e cores acolhedoras: uma interpretação editorial para o mentor que traz humanidade ao multiverso.',
    imageAlt: 'Pôster oficial de Peter B. Parker junto de sua filha Mayday.',
  },
];
