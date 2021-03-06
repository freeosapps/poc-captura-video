let AuxiliarDeAnotacoes = function() {
    let deficienteEscolheuOSimbolo = (simbolo) => {
        if (simbolo.localeCompare(SIMBOLO.APAGAR_LETRA) == 0) {
            $('.anotacao__texto').text($('.anotacao__texto').text().substr(0, $('.anotacao__texto').text().length - 1));
        } else if (simbolo.localeCompare(SIMBOLO.APAGAR_PALAVRA) == 0) {
            $('.anotacao__texto').text($('.anotacao__texto').text().replace(/[^\s]+(\s+)?$/, ''));
        } else if (simbolo.localeCompare(SIMBOLO.ESPACO) == 0) {
            $('.anotacao__texto').append('&nbsp;');
            $('.anotacao').animate({
                scrollTop: $('.anotacao').prop('scrollHeight')
            });
        } else if (simbolo.localeCompare(SIMBOLO.APAGAR_TUDO) == 0) {
            $('.anotacao__texto').text('');
        } else if (simbolo.localeCompare(SIMBOLO.FALAR) == 0) {
            PubSub.publish(EVENTO.DEFICIENTE_PEDIU_PARA_FALAR, $('.anotacao__texto').text());
        } else {
            $('.anotacao__texto').append(simbolo);
            $('.anotacao').animate({
                scrollTop: $('.anotacao').prop('scrollHeight')
            });
        }        
        let ultimaPalavra = $('.anotacao__texto').text().match(/[^\s\.\,\?\!\-]+$/);
        if (ultimaPalavra) {
            ultimaPalavra = ultimaPalavra[0];
        } else {
            ultimaPalavra = '';
        }
        PubSub.publish(EVENTO.ULTIMA_PALAVRA_ANOTADA, ultimaPalavra);
    }
    
    PubSub.subscribe(EVENTO.DEFICIENTE_ESCOLHEU_O_SIMBOLO, (message, data) => deficienteEscolheuOSimbolo(data));
}