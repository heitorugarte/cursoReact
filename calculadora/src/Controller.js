class Controller {
    soma = (a, b) => {
        let elemento1 = parseInt(a);
        let elemento2 = parseInt(b);
        return elemento1 + elemento2;
    }

    subtrai = (a, b) => {
        let elemento1 = parseInt(a);
        let elemento2 = parseInt(b);
        return elemento1 - elemento2;
    }

    divide = (a, b) => {
        let elemento1 = parseInt(a);
        let elemento2 = parseInt(b);
        return elemento1 / elemento2;
    }

    multiplica = (a, b) => {
        let elemento1 = parseInt(a);
        let elemento2 = parseInt(b);
        return elemento1 * elemento2;
    }
}