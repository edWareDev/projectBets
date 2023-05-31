import cheerio from 'cheerio';
import moment from 'moment';

const URLS = {
  pastMatchs: 'https://tips.gg/es/tournament/dota2-dota-pro-circuit-2023-south-america-season-3-upper-division/results/',
  futureMatchs: 'https://tips.gg/es/tournament/dota2-dota-pro-circuit-2023-south-america-season-3-upper-division/'
};
async function scrape(url) {
  const res = await fetch(url);
  const html = await res.text();
  return cheerio.load(html);
}
async function getPastMatchs() {
  const $ = await scrape(URLS.pastMatchs);
  const $rows = $('.element.match.finished.visible');

  const PASTMATCHS_SELECTORS = {
    horaFin: { selector: '.time', typeOf: 'string' },
    fechaFin: { selector: '.status', typeOf: 'string' },
    equipos: { selector: '.teams', typeOf: 'string' },
    puntaje: { selector: '.scores', typeOf: 'string' },
    id: { selector: '.match-link', typeOf: 'string' }
  };

  const pastMatchsSelectorEntries = Object.entries(PASTMATCHS_SELECTORS);

  const pastMatchs = [];
  $rows.each((_, el) => {
    const pastMatchEntries = pastMatchsSelectorEntries.map(([key, { selector, typeOf }]) => {
      const element = $(el).find(selector);
      const rawValue = selector === '.match-link' ? element.attr('href') : element.text().trim().toUpperCase();
      const value = typeOf === 'number' ? Number(rawValue) : rawValue;
      return [key, value];
    });
    pastMatchs.push(Object.fromEntries(pastMatchEntries));
  });

  return pastMatchs;
}
async function getFutureMatchs() {
  const $ = await scrape(URLS.futureMatchs);
  const $rows = $('.element.match.upcoming.visible');
  const $rowsLive = $('.element.match.running.visible');

  const FUTUREMATCHS_SELECTORS = {
    horaInicio: { selector: '.time', typeOf: 'string' },
    fechaInicio: { selector: '.status', typeOf: 'string' },
    equipos: { selector: '.teams', typeOf: 'string' },
    puntaje: { selector: '.scores', typeOf: 'string' },
    id: { selector: '.match-link', typeOf: 'string' }
  };
  const LIVEMATCHS_SELECTORS = {
    horaInicio: { selector: '.time', typeOf: 'string' },
    fechaInicio: { selector: '.status', typeOf: 'string' },
    equipos: { selector: '.teams', typeOf: 'string' },
    puntaje: { selector: '.scores', typeOf: 'string' },
    id: { selector: '.match-link', typeOf: 'string' }
  };

  const futureMatchsSelectorEntries = Object.entries(FUTUREMATCHS_SELECTORS);
  const liveMatchsSelectorEntries = Object.entries(LIVEMATCHS_SELECTORS);

  const futureMatchs = [];
  $rows.each((_, el) => {
    const futureMatchEntries = futureMatchsSelectorEntries.map(([key, { selector, typeOf }]) => {
      const element = $(el).find(selector);
      const rawValue = selector === '.match-link' ? element.attr('href') : element.text().trim().toUpperCase();
      const value = typeOf === 'number' ? Number(rawValue) : rawValue;
      return [key, value];
    });

    futureMatchs.push(Object.fromEntries(futureMatchEntries));
  });
  const liveMatchs = [];
  $rowsLive.each((_, el) => {
    const liveMatchEntries = liveMatchsSelectorEntries.map(([key, { selector, typeOf }]) => {
      const element = $(el).find(selector);
      const rawValue = selector === '.match-link' ? element.attr('href') : element.text().trim().toUpperCase();
      const value = typeOf === 'number' ? Number(rawValue) : rawValue;
      return [key, value];
    });
    liveMatchs.push(Object.fromEntries(liveMatchEntries));
  });

  return { futureMatchs, liveMatchs };
}
export async function main() {
  const pastMatchs = await getPastMatchs();
  const futureMatchs = await getFutureMatchs();

  // Iterar sobre los elementos de pastMatchs
  pastMatchs.forEach(function (match) {
    var equipos = match.equipos.split("\n");
    match.id = match.id.replace('infamous-r', 'infamous').replace('https://tips.gg/es/match/', 'edward')
    match.bo = "3";
    match.equipo1 = equipos[0].trim().replace('INFAMOUS R', 'INFAMOUS');
    match.equipo2 = equipos[4].trim().replace('INFAMOUS R', 'INFAMOUS');
    match.puntaje = match.puntaje.replace("\n", ":");
    if (/^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(match.fechaFin)) {
      match.fechaFin = match.fechaFin.replaceAll(".", "/");
    }
    match.puntajeEquipo1 = match.puntaje[0]
    match.puntajeEquipo2 = match.puntaje.at(-1)
    delete match.equipos;
    delete match.puntaje;
  });

  // Iterar sobre los elementos de futureMatchs
  futureMatchs.futureMatchs.forEach(function (match) {
    var equipos = match.equipos.split("\n");
    match.id = match.id.replace('infamous-r', 'infamous').replace('https://tips.gg/es/match/', 'edward')
    match.bo = "3";
    match.equipo1 = equipos[0].trim().replace('INFAMOUS R', 'INFAMOUS');
    match.equipo2 = equipos[4].trim().replace('INFAMOUS R', 'INFAMOUS');
    if (/^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(match.fechaInicio)) {
      match.fechaInicio = match.fechaInicio.replaceAll(".", "/");
    }
    match.horaInicio = moment(match.horaInicio, 'HH:mm').format('hh:mma').toUpperCase()
    delete match.equipos;
    delete match.puntaje;
  });

  // Iterar sobre los elementos de liveMatchs
  futureMatchs.liveMatchs.forEach(function (match) {
    var equipos = match.equipos.split("\n");
    match.id = match.id.replace('infamous-r', 'infamous').replace('https://tips.gg/es/match/', 'edward')
    match.bo = "3";
    match.equipo1 = equipos[0].trim().replace('INFAMOUS R', 'INFAMOUS');
    match.equipo2 = equipos[4].trim().replace('INFAMOUS R', 'INFAMOUS');
    match.puntaje = match.puntaje.replace("\n", ":");
    if (/^([01]\d|2[0-3]):([0-5]\d)$/.test(match.fechaInicio)) {
      match.fechaInicio = match.fechaInicio.replaceAll(".", "/");
    }
    match.puntajeEquipo1 = match.puntaje[0]
    match.puntajeEquipo2 = match.puntaje.at(-1)
    delete match.equipos;
    delete match.puntaje;
  });


  const respuesta = {
    pastMatchs: pastMatchs,
    futureMatchs: futureMatchs.futureMatchs,
    liveMatchs: futureMatchs.liveMatchs
  };
  return respuesta;
}