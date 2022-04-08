export interface IProjectTheme {
  id: Themes
  image: number
  folder: string
  name: string
  votes: number
}

export enum Themes {
  // artists
  VANGOUGH = 'van-gogh',
  CLAUDEMONET = 'claude-monet',
  REMBRANDT = 'rembrandt',
  WHISTLER = 'whistler',
  PICASSO = 'picasso',
  DAVINCI = 'da-vinci',
  CARAVAGGIO = 'caravaggio',
  // art styles
  POPART = 'pop-art',
  IMPRESSIONISM = 'impressionism',
  EXPRESSIONISM = 'expressionism',
  ARTNOUVEAU = 'art-nouveau',
  // individual
  AFREMOV_SLEEPING_CITY="afremov-sleeping-city",
ARM_OF_THE_SEINE="arm-of-the-seine",
BETZLER_RECLINING_COUPLE="betzler-reclining-couple",
CAFE_TERRACE_AT_NIGHT="cafe-terrace-at-night",
CARAVAGGIO_SELF_PORTRAIT="caravaggio-self-portrait",
CLAUDE_MONET="claude-monet",
DA_VINCI="da-vinci",
GARDEN_AT_GIVERNY="garden-at-giverny",
GIRL_IN_WHITE="girl-in-white",
HAMILTON_FASHION_PLATE="hamilton-fashion-plate",
KIRCHNER_SERTIGTAL_IN_AUTUMN="kirchner-sertigtal-in-autumn",
KLIMT_HYGIEIA="klimt-hygieia",
KLIMT_THE_KISS="klimt-the-kiss",
MONA_LISA="mona-lisa",
MUCHA_DAYDREAM="mucha-daydream",
MUCHA_LA_PLUME="mucha-la-plume",
MUNCH_THE_SCREAM="munch-the-scream",
PECHSTEIN_LEBA_HARBOUR="pechstein-leba-harbour",
PENITENT_MAGDELENE="penitent-magdelene",
PISSARRO_MIRIBEAU_GARDEN="pissarro-miribeau-garden",
RAUSCHENBERG_RETROACTIVE="rauschenberg-retroactive",
REMBRANDT_SELF_PORTRAIT="rembrandt-self-portrait",
RENOIR_GIRLS_AT_THE_PIANO="renoir-girls-at-the-piano",
ROESTENBURG_EIFEL_SUMMER="roestenburg-eifel-summer",
SARGENT_IN_A_LEVANTINE_PORT="sargent-in-a-levantine-port",
STARRY_NIGHT="starry-night",
SUNSET_RED_AND_GOLD="sunset-red-and-gold",
THE_BALCONY="the-balcony",
THE_CROWNING_WITH_THORNS="the-crowning-with-thorns",
THE_ENTOMBMENT_OF_CHRIST="the-entombment-of-christ",
THE_GENTLE_ART_OF_MAKING_ENEMIES="the-gentle-art-of-making-enemies",
THE_NIGHT_WATCH="the-night-watch",
THE_STORM="the-storm",
TOBIAS_AND_THE_ANGEL="tobias-and-the-angel",
VAN_GOGH_SELF_PORTRAIT="van-gogh-self-portrait",
VAN_GOGH="van-gogh",
VIRGIN_OF_THE_ROCKS="virgin-of-the-rocks",
VITRUVIAN_MAN="vitruvian-man",
WAIN_KALEIDOSCOPE_CAT="wain-kaleidoscope-cat",
WARHOL_MARILYN="warhol-marilyn",
WATER_LILLIES="water-lillies",
WHEAT_FIELD="wheat-field",
WINTER_LANDSCAPE="winter-landscape",
WOMAN_WITH_A_PARASOL="woman-with-a-parasol",
GIRL_BEFORE_A_MIRROR="girl-before-a-mirror",
GIRL_WITH_A_MANDOLIN="girl-with-a-mandolin",
LES_FEMMES_DALGIERS="les-femmes-dalgiers",
THE_WEEPING_WOMAN="the-weeping-woman"

}

const ProjectTheme: IProjectTheme[] = [
  {
    id: Themes.VANGOUGH,
    image: require('assets/images/themes/van-gogh/self-portrait.jpg'),
    folder: 'assets/images/themes/van-gogh/',
    name: 'Van Gogh',
    votes: 0,
  },
  {
    id: Themes.CLAUDEMONET,
    image: require('assets/images/themes/claude-monet/water-lillies.jpg'),
    folder: 'assets/images/themes/claude-monet/',
    name: 'Claude Monet',
    votes: 0,
  },
  {
    id: Themes.REMBRANDT,
    image: require('assets/images/themes/rembrandt/the-storm.jpg'),
    folder: 'assets/images/themes/rembrandt/',
    name: 'Rembrandt',
    votes: 0,
  },
  {
    id: Themes.WHISTLER,
    image: require('assets/images/themes/whistler/the-gentle-art-of-making-enemies.jpg'),
    folder: '',
    name: 'Whistler',
    votes: 0,
  },
  {
    id: Themes.PICASSO,
    image: require('assets/images/themes/picasso/les-femmes-dalgiers.jpg'),
    folder: 'assets/images/themes/whistler/',
    name: 'Picasso',
    votes: 0,
  },
  {
    id: Themes.DAVINCI,
    image: require('assets/images/themes/da-vinci/mona-lisa.jpg'),
    folder: 'assets/images/themes/da-vinci/',
    name: 'Da Vinci',
    votes: 0,
  },
  {
    id: Themes.CARAVAGGIO,
    image: require('assets/images/themes/caravaggio/self-portrait.jpg'),
    folder: 'assets/images/themes/caravaggio/',
    name: 'Caravaggio',
    votes: 0,
  },
  {
    id: Themes.POPART,
    image: require('assets/images/themes/pop-art/warhol_marilyn.jpg'),
    folder: 'assets/images/themes/pop-art/',
    name: 'Pop Art',
    votes: 0,
  },
  {
    id: Themes.IMPRESSIONISM,
    image: require('assets/images/themes/impressionism/afremov_sleeping-city.jpeg'),
    folder: 'assets/images/themes/impressionism/',
    name: 'Impressionism',
    votes: 0,
  },
  {
    id: Themes.EXPRESSIONISM,
    image: require('assets/images/themes/expressionism/munch_the-scream.jpg'),
    folder: 'assets/images/themes/expressionism/',
    name: 'Expressionism',
    votes: 0,
  },
  {
    id: Themes.ARTNOUVEAU,
    image: require('assets/images/themes/art-nouveau/mucha_daydream.jpg'),
    folder: 'assets/images/themes/art-nouveau/',
    name: 'Art Nouveau',
    votes: 0,
  },
]

export default ProjectTheme
