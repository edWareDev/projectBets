const serverSocket = io('')
let qLiveMatchs = 0;
let qFutureMatchs = 0;
let qPastMatchs = 0;
let userID = ''
const tournamentId = 'Dota2023Tour3Div1SA'

const frasesEspera = [
    "Mientras esperas los resultados, los astros se ríen de tus decisiones.",
    "Esperar los resultados es como ver un partido de fútbol donde todos los jugadores son ciegos.",
    "No te preocupes por los resultados, tus apuestas son el mejor chiste que has contado.",
    "Mientras aguardas los resultados, la suerte está en el mismo lugar donde dejaste tus habilidades para apostar: en el olvido.",
    "Mientras aguardas los resultados, recuerda que la paciencia es una virtud que los perdedores practican mucho.",
    "No te preocupes por los resultados, al fin y al cabo, la vida es solo un juego en el que siempre pierdes.",
    "No te preocupes por los resultados, al menos eres bueno en algo: en ser un maestro del fracaso.",
    "Mientras esperas los resultados, recuerda que el destino tiene un sentido del humor muy peculiar, y tú eres la broma principal.",
    "Es muy probable que los resultados te hagan preguntarte si el universo está conspirando en tu contra o simplemente tienes muy mala suerte.",
    "Mientras esperas los resultados, recuerda que la esperanza es solo una ilusión generada por tu falta de información.",
    "No te preocupes por los resultados, siempre puedes culpar a la mala suerte, aunque en realidad tu habilidad para perder es impresionante.",
    "Mientras esperas los resultados, considera la posibilidad de escribir un libro titulado 'Cómo perder dinero en 5 sencillos pasos'.",
    "Es muy probable que los resultados te hagan cuestionar tus habilidades para tomar decisiones, pero al menos tienes una buena historia de terror para contar.",
    "No te preocupes por los resultados, al final del día, el universo siempre encuentra la manera de burlarse de tus expectativas.",
    "No te preocupes por los resultados, recuerda que siempre puedes decir que estás practicando para ser el mejor perdedor del mundo.",
    "Mientras esperas los resultados, recuerda que la vida es como una apuesta, siempre pierdes, solo cambian las formas de hacerlo.",
    "Es muy probable que los resultados te hagan sentir como el protagonista de una película de comedia sin gracia, siempre esperando el golpe final.",
    "No te preocupes por los resultados, al final todo se reduce a una cuestión de azar, y tú pareces ser el rey de las malas cartas.",
    "Mientras esperas los resultados, recuerda que en el gran juego de la vida, siempre ganas algo, incluso si es solo experiencia para futuros fracasos.",
    "Mientras esperas los resultados, considera la posibilidad de ofrecer tus servicios como ejemplo viviente de cómo no apostar.",
    "Es muy probable que los resultados te hagan pensar en cambiar tu nombre a 'Mr. Desastre' o 'Mr Fracaso' como una marca personal.",
    "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
    "No te preocupes por los resultados, recuerda que siempre puedes presumir de ser un experto en tomar las peores decisiones posibles.",
    "Mientras esperas los resultados, ten en cuenta que el karma parece estar disfrutando mucho de tus apuestas.",
    "Es muy probable que los resultados te hagan sentir como el bufón de las apuestas, siempre haciendo reír a los demás con tus derrotas.",
    "Vas a caer chupetin trujillo, Yo la realeza MAKANAKI, LA PUTA FAMAAAAA, GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
];
const frasesAcertadas = [
    "Suerte de principiante, algo es algo.",
    "Vas acertando algunas, aunque no todas.",
    "No te emociones, aún falta ver el resultado de las otras apuestas.",
    "Parece que has tenido un poco de suerte, por ahora.",
    "No te confíes, esto puede cambiar en cualquier momento.",
    "No te ilusiones demasiado, esto es solo el principio.",
    "No te sientas tan orgulloso, todavía hay margen de error.",
    "No te creas tan bueno, aún falta mucho por demostrar.",
    "No te apresures a celebrar, la suerte puede cambiar en cualquier instante.",
    "No te emociones demasiado, la fortuna puede ser efímera.",
    "No te adelantes, las apuestas aún no están cerradas.",
    "No te hagas ilusiones, todavía hay mucho en juego.",
    "No te confíes en exceso, esto puede ser solo un golpe de suerte.",
    "No te emociones tanto, aún falta ver cómo terminan las otras apuestas.",
    "No te creas el mejor, todavía tienes mucho por aprender.",
    "No te jactes demasiado, esto puede ser solo una casualidad.",
    "No te sientas tan triunfante, las cosas pueden cambiar en un instante.",
    "No te engañes, esto puede ser solo un espejismo de éxito.",
    "No te deslumbres tanto, la suerte puede ser caprichosa.",
    "No te ilusiones demasiado, las apuestas pueden ser traicioneras.",
    "No te vuelvas loco, esto es solo un pequeño avance.",
    "No te creas el mejor apostador, todavía estás en la etapa inicial.",
    "No te hagas muchas expectativas, esto puede ser solo una excepción.",
    "No te confíes tanto, esto podría ser solo una casualidad momentánea.",
    "No te creas invencible, las apuestas siempre tienen su riesgo.",
];
const frasesNoAcertadas = [
    "¡No sirves para esto! ¿Ya quedaste en la ruina?",
    "Ni una sola apuesta acertada, parece que deberías buscar otro pasatiempo.",
    "Cero aciertos, estás dejando un legado de fracasos.",
    "Todas fallidas, ¿alguna vez consideraste la posibilidad de retirarte?",
    "Ningún acierto, parece que tu suerte se fue de vacaciones.",
    "¿Apostar? No es lo tuyo, mejor dedícate a otra cosa.",
    "Cada apuesta equivocada te acerca más a la bancarrota.",
    "Ninguna ganancia, ¿cuánto tiempo más piensas desperdiciar en esto?",
    "Ni siquiera un acierto por casualidad, tu racha de fracasos es impresionante.",
    "¿No has pensado en donar tu dinero a una causa más noble?",
    "Cero éxitos, ¿ya consideraste dejar de intentarlo?",
    "Tus apuestas son una broma, pero nadie está riendo contigo.",
    "No acertaste ninguna, pareciera que estás siguiendo un manual de errores.",
    "¿Estás seguro de que sabes cómo funciona esto? Porque los resultados dicen lo contrario.",
    "Ningún acierto, tu destreza para perder dinero es impresionante.",
    "Ni una sola apuesta ganadora, pareciera que el universo conspira en tu contra.",
    "Cero aciertos, tu habilidad para fallar es digna de admiración.",
    "¿Quieres un consejo? Deja de apostar, no tienes futuro en esto.",
    "Ningún triunfo a la vista, parece que tienes un imán para las derrotas.",
    "No acertaste ninguna, pero al menos eres constante en tu fracaso.",
    "¿Ya te quedaste sin dinero? Tal vez deberías aprender a administrarlo mejor.",
    "Cada apuesta fallida es un recordatorio de tu falta de talento en esto.",
    "Ni una sola victoria, ¿alguna vez consideraste cambiar de estrategia?",
    "Ningún acierto, ¿alguna vez te has preguntado si simplemente no eres bueno en esto?",
    "Cero aciertos, parece que tienes una habilidad especial para perder en todo.",
    "¿Quedaste en bancarrota? No te preocupes, al menos eres constante en tu fracaso.",
];
const frases50 = [
    "¡Felicitaciones! Lograste acertar la mitad, pero aún falta mucho para ser decente en esto.",
    "Has acertado la mitad, pero tampoco te emociones demasiado, todavía tienes mucho por mejorar.",
    "Un 50% de aciertos, supongo que es mejor que nada, aunque sigue siendo bastante mediocre.",
    "Lograste acertar la mitad de las apuestas, así que técnicamente puedes llamarte 'medianamente competente'.",
    "La suerte estuvo de tu lado en la mitad de las apuestas, pero no te hagas ilusiones, eso no te convierte en un experto.",
    "50% de aciertos, eres como un reloj roto que da la hora correcta dos veces al día.",
    "Mitad de tus apuestas fueron correctas, pero eso no es motivo para celebrar, es más bien motivo para preocuparse.",
    "Lograste acertar la mitad, lo cual demuestra que tienes una habilidad impresionante para equivocarte también en la mitad.",
    "Un 50% de aciertos, eso significa que estás a la par con un mono lanzando dardos al azar.",
    "Felicidades, tienes una habilidad sobresaliente para estar equivocado la mitad del tiempo.",
    "Has logrado acertar la mitad, lo cual prueba que tienes el potencial de ser igual de malo o igual de bueno la próxima vez.",
    "50% de aciertos, es como si tus decisiones fueran determinadas por un gato jugando con una bola de cristal.",
    "La mitad de tus apuestas fueron correctas, pero aún estás lejos de ser considerado una persona decente en esto.",
    "Lograste acertar la mitad, parece que tienes una habilidad especial para estar en el punto medio del fracaso.",
    "Un 50% de aciertos, eso es suficiente para demostrar que tu suerte fluctúa entre mediocre y terrible.",
    "Felicidades, has alcanzado la excelencia de estar en el promedio de los perdedores.",
    "Has logrado acertar la mitad de las apuestas, pero recuerda que en este mundo ser mediocre no te llevará muy lejos.",
    "50% de aciertos, lo cual demuestra que eres igual de malo que alguien que simplemente elige al azar.",
    "Lograste acertar la mitad, aunque eso no dice mucho considerando que las probabilidades estaban a tu favor.",
    "Un 50% de aciertos, justo en el punto medio entre el éxito y el fracaso absoluto.",
    "Felicidades, tu habilidad para acertar la mitad de las apuestas es comparable a la de una moneda lanzada al aire.",
    "Has logrado acertar la mitad, aunque eso no es nada para presumir considerando que solo tienes dos opciones.",
    "50% de aciertos, al menos puedes decir que eres constante en tu mediocridad.",
    "Lograste acertar la mitad de las apuestas, lo cual significa que tienes un talento especial para estar justo en el medio de la mediocridad.",
    "Un 50% de aciertos, sigue así y tal vez algún día llegarás a ser decente en esto.",
    "Felicidades por tu 50% de aciertos, ahora puedes ir a festejar al club de los perdedores moderadamente exitosos.",
];
const frasesMasErradas = [
    "Tus errores en las apuestas son tan legendarios que podrían ser estudiados en los libros de historia del fracaso.",
    "Tienes un talento especial para tomar las peores decisiones en las apuestas, ¿alguna vez consideraste escribir un manual sobre ello?",
    "Cada vez que haces una apuesta, el universo se burla de ti y tus habilidades sobrenaturales para perder dinero.",
    "Tus errores en las apuestas son tan monumentales que podrían ser considerados maravillas del mundo de la incompetencia.",
    "Eres como un imán para los errores en las apuestas, incluso cuando intentas hacer lo correcto, terminas haciendo lo más ridículo.",
    "Tus errores en las apuestas son tan épicos que podrían convertirse en el argumento de una película de comedia sin sentido.",
    "Tus decisiones en las apuestas son tan desastrosas que los demás apostadores te consideran un referente de lo que no se debe hacer.",
    "Tu talento para equivocarte en las apuestas es tan excepcional que podrías ganar un premio al 'Peor Apostador del Año'.",
    "Cada vez que tomas una decisión en las apuestas, el mundo entero se pregunta cuál será tu próximo error memorable.",
    "Eres como una enciclopedia de errores en las apuestas, siempre tienes una nueva lección para enseñar sobre cómo perder dinero.",
    "Tus errores en las apuestas son tan monumentales que podrías ser la estrella principal de un show de televisión llamado 'Las Apuestas Más Desastrosas'.",
    "Tu habilidad para cometer errores en las apuestas es comparable a un récord mundial, solo que en lugar de admiración, recibes burlas constantes.",
    "Incluso los astrólogos se sorprenden de la precisión con la que siempre tomas las peores decisiones en las apuestas.",
    "Tus errores en las apuestas son tan notorios que los casinos te consideran su mejor cliente y patrocinador del fracaso.",
    "Tu habilidad para perder dinero en las apuestas es tan excepcional que deberías considerar patentar tu método único de derrota.",
    "Eres el motivo de risa favorito en los círculos de apuestas, tu nombre es sinónimo de errores y desastres financieros.",
    "Tus errores en las apuestas son tan legendarios que incluso los dioses de la mala suerte te admiran por tu dedicación al fracaso.",
    "Cada vez que intentas hacer una apuesta, el universo entero se reúne para presenciar tu próximo error cósmico.",
    "Tus errores en las apuestas son tan predecibles que podríamos apostar a que siempre elegirás la opción equivocada.",
    "Eres como una máquina de hacer errores en las apuestas, siempre generas resultados desastrosos sin importar las circunstancias.",
    "Tus decisiones en las apuestas son tan cuestionables que los matemáticos están considerando crear una nueva teoría basada en tus errores.",
    "Cada vez que haces una apuesta, los corredores de apuestas celebran tu participación como una garantía de ganancias para ellos.",
    "Tus errores en las apuestas son tan monumentales que incluso los novatos en el mundo de las apuestas te miran con asombro.",
    "Eres como el joker de las apuestas, siempre haces reír a todos con tus decisiones ridículas y resultados desastrosos.",
    "Tus errores en las apuestas son tan consistentes que podríamos crear un calendario con tus derrotas y venderlo como una obra de arte moderna.",
];

colocarFraseAleatoria(3)

function redrawAllMatchs(matchs) {
    const plantillaFutureMatchs = `
{{#if hayLiveMatchs}}
<div class="liveMatchs">
{{#each liveMatchs}}
<section class="match" id="{{this.id}}">
    <div class="timeDate">
        <span>AHORA - BO{{this.bo}}</span>
    </div>
    <div class="teams">
        <div class="team1">
            <div class="imgContainer">
                <img src="./img/{{this.equipo1}}.webp" alt="">
            </div>
            <div class="teamName">{{this.equipo1}}</div>
        </div>
        <div class="result">
            <div class="inputs">
                <input disabled type="text" max="2" min="0" readonly value="{{this.puntajeEquipo1}}">
                <span>:</span>
                <input disabled type="text" max="2" min="0" readonly value="{{this.puntajeEquipo2}}">
            </div>
        </div>
        <div class="team2">
            <div class="teamName">{{this.equipo2}}</div>
            <div class="imgContainer">
                <img src="./img/{{this.equipo2}}.webp" alt="">
            </div>
        </div>
    </div>
    <div class="userResult">
        <span>EN VIVO</span>
    </div>
</section>
{{/each}}
</div>
{{/if}}
{{#if hayFutureMatchs}}
<div class="futureMatchs">
{{#each futureMatchs}}
<section class="match" id="{{this.id}}">
    <div class="timeDate">
        <span>{{this.fechaInicio}} - {{this.horaInicio}} - BO{{this.bo}}</span>
    </div>
    <div class="teams">
        <div class="team1">
            <div class="imgContainer">
                <img src="./img/{{this.equipo1}}.webp" alt="">
            </div>
            <div class="teamName">{{this.equipo1}}</div>
        </div>
        <div class="result">
            <div class="inputs">
                <input type="number" max="2" min="0" value="0">
                <span>:</span>
                <input type="number" max="2" min="0" value="0">
            </div>
        </div>
        <div class="team2">
            <div class="teamName">{{this.equipo2}}</div>
            <div class="imgContainer">
                <img src="./img/{{this.equipo2}}.webp" alt="">
            </div>
        </div>
    </div>
    <div class="userResult">
    </div>
</section>
{{/each}}
</div>
{{/if}}
`
    const plantillaPastMatchs = `
{{#if hayPastMatchs}}
<div class="pastMatchs">
{{#each pastMatchs}}
<section class="match" id="{{this.id}}">
<div class="timeDate">
    <span>{{this.fechaFin}}</span>
</div>
<div class="teams">
    <div class="team1">
        <div class="imgContainer">
            <img src="./img/{{this.equipo1}}.webp" alt="">
        </div>
        <div class="teamName">{{this.equipo1}}</div>
    </div>
    <div class="result">
        <div class="inputs">
            <input disabled type="text" max="2" min="0" readonly value="{{this.puntajeEquipo1}}">
            <span>:</span>
            <input disabled type="text" max="2" min="0" readonly value="{{this.puntajeEquipo2}}">
        </div>
    </div>
    <div class="team2">
        <div class="teamName">{{this.equipo2}}</div>
        <div class="imgContainer">
            <img src="./img/{{this.equipo2}}.webp" alt="">
        </div>
    </div>
</div>
<div class="userResult noPredicted"><i class="fa-solid fa-minus"></i></div>
</section>
{{/each}}
</div>
{{/if}}
`
    const futureMatchsContainer = document.querySelector('.futureMatchsContainer')
    const renderFutureMatchs = Handlebars.compile(plantillaFutureMatchs);
    const futureMatchs = matchs.futureMatchs
    const liveMatchs = matchs.liveMatchs
    if (futureMatchsContainer) {
        futureMatchsContainer.innerHTML = renderFutureMatchs({
            hayFutureMatchs: futureMatchs.length > 0,
            futureMatchs,
            hayLiveMatchs: liveMatchs.length > 0,
            liveMatchs
        })
    }

    const pastMatchsContainer = document.querySelector('.pastMatchsContainer')
    const renderPastMatchs = Handlebars.compile(plantillaPastMatchs);
    const pastMatchs = matchs.pastMatchs
    if (pastMatchsContainer) {
        pastMatchsContainer.innerHTML = renderPastMatchs({
            hayPastMatchs: pastMatchs.length > 0,
            pastMatchs,
        })
    }

    const allFutureButtons = document.querySelectorAll('.userResult')
    allFutureButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.childNodes[1].textContent === 'PREDECIR!') {
                // const matchSelected = futureMatchs.find(match => match.id === button.parentNode.id)
                const matchInputs = button.parentNode.querySelectorAll('input')
                const puntajePredicted1 = Number(matchInputs[0].value)
                const puntajePredicted2 = Number(matchInputs[1].value)
                if (((puntajePredicted1 === 2) && (puntajePredicted2 === 0)) || ((puntajePredicted1 === 0) && (puntajePredicted2 === 2)) || ((puntajePredicted1 === 2) && (puntajePredicted2 === 1)) || ((puntajePredicted1 === 1) && (puntajePredicted2 === 2))) {
                    const matchId = button.parentNode.id
                    const predValues = { puntajePredicted1, puntajePredicted2 }
                    const dataToSend = { username: userID, tournamentId: tournamentId, matchId: matchId, predValues: predValues }
                    serverSocket.emit('addBet', dataToSend);
                    button.childNodes[1].classList.add("inv");
                } else {
                    alert('La predicción ingresada es inválida.')
                }
            }
        })
    })
}

// function redrawTable(userPredictions) {

// }

serverSocket.on('mensajeDesdeServidor', datosAdjuntos => {
    console.log(datosAdjuntos);
})

serverSocket.on('firstConection', matchs => {
    redrawAllMatchs(matchs);
    [qLiveMatchs, qFutureMatchs, qPastMatchs] = [matchs.liveMatchs.length, matchs.futureMatchs.length, matchs.pastMatchs.length];
    document.querySelector('.loaderContainer').classList.add('inv');

    let sessionLS = localStorage.getItem('session');
    if (sessionLS !== null) {
        userID = sessionLS;
        serverSocket.emit('updateTable', userID);
        serverSocket.on('tableData', data => {
            // const qCorrect = document.querySelectorAll('.correct').length;
            // const qFailed = document.querySelectorAll('.failed').length;
            data.sort((a, b) => b.predictionsCorrects - a.predictionsCorrects);
            let plantillaTable = `
            <div class="tableUsers">
                <section>
                    <div class="header user">Usuario</div>
                    <div class="header predicts">Predicciones</div>
                    <div class="header acerts">Aciertos</div>
                    <div class="header fails">Fallas</div>
                </section>`
            data.forEach(user => {
                const qPredicciones = Object.keys(user.matchs?.[tournamentId] || {}).length;
                const correctPredictions = user.predictionsCorrects || 0
                const incorrectPredictions = user.predictionsIncorrects || 0
                plantillaTable = plantillaTable + `
                <section>
                    <div class="campo user">${user.username}</div>
                    <div class="campo predicts">${qPredicciones}</div>
                    <div class="campo acerts">${correctPredictions}</div>
                    <div class="campo fails">${incorrectPredictions}</div>
                </section>
                `
            })
            plantillaTable = plantillaTable + `</div>`
            document.querySelector('.tableContainer').innerHTML = plantillaTable
        })
    } else {
        if (saveOnLocalStorage() !== '') {
            serverSocket.emit('updateTable', userID);
        }
    }
    serverSocket.emit('getData', userID);
});

serverSocket.on('constantData', allData => {
    const matchs = allData.matchs
    const { liveMatchs, futureMatchs, pastMatchs } = matchs;
    if (liveMatchs.length !== qLiveMatchs || futureMatchs.length !== qFutureMatchs || pastMatchs.length !== qPastMatchs) {
        redrawAllMatchs(matchs);
        [qLiveMatchs, qFutureMatchs, qPastMatchs] = [liveMatchs.length, futureMatchs.length, pastMatchs.length];
    }
    validarEstadoLiveMatch(allData)
    validarEstadoFutureMatch(allData)
    validarEstadoPastMatch(allData)
    validarDatosUsuario(allData)
})

serverSocket.on('error', datosAdjuntos => {
    alert(datosAdjuntos);
})

function validarEstadoLiveMatch(allData) {
    allData.matchs.liveMatchs.forEach(match => {
        // const liveMatchsContainer = document.querySelector('.liveMatch')
        const inputsMatchContainer = document.getElementById(match.id);
        const resultContainer = inputsMatchContainer.querySelector('.result');

        const inputsHTML = `
        <div class="inputs">
            <input disabled type="text" max="2" min="0" readonly value="${match.puntajeEquipo1}">
            <span>:</span>
            <input disabled type="text" max="2" min="0" readonly value="${match.puntajeEquipo2}">
        </div>
        `;
        if (allData.userData) {
            const existeTournamentYMatch = allData.userData.matchs?.[tournamentId]?.[match.id]
            if (existeTournamentYMatch) {
                const userMatch = allData.userData.matchs[tournamentId][match.id]
                const predictedInputsHTML = `
                <div class="inputs inPredicted">
                    <input disabled type="text" max="2" min="0" readonly value="${userMatch.puntajePredicted1}">
                    <span>:</span>
                    <input disabled type="text" max="2" min="0" readonly value="${userMatch.puntajePredicted2}">
                </div>`;
                resultContainer.innerHTML = `${inputsHTML}${predictedInputsHTML}`;
            } else {
                resultContainer.innerHTML = inputsHTML;
            }
        } else {
            resultContainer.innerHTML = inputsHTML;
        }
    });
}
function validarEstadoFutureMatch(allData) {
    allData.matchs.futureMatchs.forEach(match => {
        const inputsMatchContainer = document.getElementById(match.id);
        const resultContainer = inputsMatchContainer.querySelector('.result');
        const userResultContainer = inputsMatchContainer.querySelector('.userResult')
        if (allData.userData) {
            const existeTournamentYMatch = allData.userData.matchs?.[tournamentId]?.[match.id]
            if (existeTournamentYMatch) {
                const userMatch = allData.userData.matchs[tournamentId][match.id]
                resultContainer.innerHTML = `
                <div class="inputs inPredicted">
                    <input disabled type="text" max="2" min="0" readonly value="${userMatch.puntajePredicted1}">
                    <span>:</span>
                    <input disabled type="text" max="2" min="0" readonly value="${userMatch.puntajePredicted2}">
                 </div>`;
                userResultContainer.innerHTML = `
                 <button class="predicted">PREDECIDO</button>
                 `
            } else {
                userResultContainer.innerHTML = `
                <button>PREDECIR!</button>
                 `
            }
        } else {
            userResultContainer.innerHTML = `<button class="noLogin">INICIA SESIÓN PARA PREDECIR!</button>`
        }
    });
}
function validarEstadoPastMatch(allData) {
    let userCorrectsPredictions = 0
    let userIncorrectsPredictions = 0
    allData.matchs.pastMatchs.forEach(match => {
        const inputsMatchContainer = document.getElementById(match.id);
        const resultContainer = inputsMatchContainer.querySelector('.result');
        const userResultContainer = inputsMatchContainer.querySelector('.userResult')

        const inputsHTML = `
        <div class="inputs">
            <input disabled type="text" max="2" min="0" readonly value="${match.puntajeEquipo1}">
            <span>:</span>
            <input disabled type="text" max="2" min="0" readonly value="${match.puntajeEquipo2}">
        </div>`;
        if (allData.userData) {
            const existeTournamentYMatch = allData.userData.matchs?.[tournamentId]?.[match.id]
            if (existeTournamentYMatch) {
                const userMatch = allData.userData.matchs[tournamentId][match.id]
                if ((userMatch.puntajePredicted1 === match.puntajeEquipo1) && (userMatch.puntajePredicted2 === match.puntajeEquipo2)) {
                    resultContainer.innerHTML = `
                    <div class="inputs inCorrect">
                        <input disabled type="text" max="2" min="0" readonly value="${match.puntajeEquipo1}">
                        <span>:</span>
                        <input disabled type="text" max="2" min="0" readonly value="${match.puntajeEquipo2}">
                    </div>`
                    userResultContainer.innerHTML = `<i class="correct fa-solid fa-check"></i>`
                    userCorrectsPredictions++
                } else {
                    resultContainer.innerHTML = `
                    <div class="inputs">
                        <input disabled type="text" max="2" min="0" readonly value="${match.puntajeEquipo1}">
                        <span>:</span>
                        <input disabled type="text" max="2" min="0" readonly value="${match.puntajeEquipo2}">
                    </div>
                    <div class="inputs inFailed">
                        <input disabled type="text" max="2" min="0" readonly value="${userMatch.puntajePredicted1}">
                        <span>:</span>
                        <input disabled type="text" max="2" min="0" readonly value="${userMatch.puntajePredicted2}">
                    </div>`
                    userResultContainer.innerHTML = `<i class="failed fa-solid fa-xmark"></i>`
                    userIncorrectsPredictions++
                }
            } else {
                resultContainer.innerHTML = inputsHTML;
                userResultContainer.innerHTML = `<i class="noPredicted fa-solid fa-minus"></i>`
            }
        } else {
            resultContainer.innerHTML = inputsHTML;
            userResultContainer.innerHTML = ''
        }
    });
    serverSocket.emit('updateUserCorrectPredictions', { userID, userCorrectsPredictions, userIncorrectsPredictions })
    colocarFraseAleatoria(Math.ceil((Math.random() * 20)))
}
function validarDatosUsuario(allData) {
    const userName = allData.userData.username
    const saldo = allData.userData.saldo
}
function saveOnLocalStorage() {
    const session = window.prompt('Ingresa tu Nombre');
    localStorage.setItem('session', session);
    userID = session
    return userID
}

function colocarFraseAleatoria(stepFrase) {
    if (stepFrase <= 8) {
        const qfallas = document.querySelectorAll('.fa-xmark').length
        const qaciertos = document.querySelectorAll('.fa-check').length
        // console.log(qaciertos, qfallas);
        const randNumber = Math.floor((Math.random() * 25));
        if (qfallas === 0 && qaciertos === 0) {
            document.querySelector('.container').innerHTML = `<h2>${frasesEspera[randNumber]}</h2>`;
            // console.log('Caso1');
        } else if (qfallas > qaciertos) {
            document.querySelector('.container').innerHTML = `<h2 style="color: red;">${frasesMasErradas[randNumber]}</h2>`;
            // console.log('Caso2');
        } else if (qfallas < qaciertos) {
            document.querySelector('.container').innerHTML = `<h2 style="color: blue;>${frasesAcertadas[randNumber]}</h2>`;
            // console.log('Caso3');
        } else if (qfallas = qaciertos) {
            document.querySelector('.container').innerHTML = `<h2>${frases50[randNumber]}</h2>`;
            // console.log('Caso4');
        }
        console.log(randNumber);
    }
}
document.querySelector('#cerrarSesion').addEventListener('click',(e) => {
    e.preventDefault()
    localStorage.removeItem('session');
    location.reload();
});