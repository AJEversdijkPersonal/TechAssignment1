// {
//     "categories": [],
//     "created_at": "2020-01-05 13:42:22.089095",
//     "icon_url": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
//     "id": "KrD11-C_QICWOV1VTuIoUg",
//     "updated_at": "2020-01-05 13:42:22.089095",
//     "url": "https://api.chucknorris.io/jokes/KrD11-C_QICWOV1VTuIoUg",
//     "value": "Chuck Norris can make a message in Cheerios, without using the letter \"O.\""
// }

export interface ChuckNorrisFact {
  categories: string[];
  created_at: string;
  updated_at: string;
  icon_url: string;
  id: string;
  url: string;
  value: string;
}
