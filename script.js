const input = require('./input.json');
const { arrowX0, arrowY0, targets, players } = input;
const puntajes = [];

// el punto = (x0, y0) y la recta: ax + by + c = 0
const distanciaDePuntoARecta = (x0, y0, a, b, c) => {
    //by = ax + c
    // pero cuando escribo la ecuacion en forma gral, queda -ax + by - c = 0
    const numerador = Math.abs((-a*x0)+(b*y0)-c);
    const denominador = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
    if (denominador === 0) {
        throw new Error('No se puede dividir por cero');
    }
    return numerador/denominador;
};

players.forEach(player => {
    const { shots, id }  = player;
    puntajes[id] = 0;
    shots.forEach(shot => {
        const { shootAngle } = shot;
        //en la formula la pendiente es la letra a, by = ax +c
        const pendienteDeRecta = Math.tan(shootAngle* Math.PI/180);
        // by = ax +c, encuentro c
        const c = arrowY0 - (pendienteDeRecta * arrowX0);
        targets.forEach(target => {
            const { x, y, diameter, prizePoints } = target;
            const distancia = distanciaDePuntoARecta(x , y, pendienteDeRecta, 1, c);
            if (distancia < diameter/2) {
                puntajes[id] += prizePoints;
            };
        });
    });
});

console.log(puntajes);
