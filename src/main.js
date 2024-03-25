import ClockScenario from "./js/scenarios/ClockScenario";

document.addEventListener('DOMContentLoaded', () => {
    // Washington D.C., USA, UTC-5
    new ClockScenario('usa-clock', -5 * 60, { 
        dialColor: '#003366', dialBackground: '#f1f1f1', trailColor: '#f1f1f1',
        handColors: { hour: '#bf0a30', minute: '#bf0a30', second: '#000000', millisecond: '#002868' }
    });

    // Beijing, China, UTC+8
    new ClockScenario('china-clock', 8 * 60, { 
        dialColor: '#dfbc5e', dialBackground: '#d73c37', trailColor: '#d73c37',
        handColors: { hour: '#FFD700', minute: '#FFD700', second: '#FFD700', millisecond: '#FFD700' }
    });

    // Moscow, Russia, UTC+3
    new ClockScenario('russia-clock', 3 * 60, { 
        dialColor: '#1C3578', dialBackground: '#FFFFFF', trailColor: '#FFFFFF',
        handColors: { hour: '#E4181C', minute: '#E4181C', second: '#E4181C', millisecond: '#E4181C' }
    });

    // Berlin, Germany, UTC+1
    new ClockScenario('germany-clock', 1 * 60, { 
        dialColor: '#000000', dialBackground: '#FFCC00', trailColor: '#000000',
        handColors: { hour: '#DD0000', minute: '#DD0000', second: '#DD0000', millisecond: '#DD0000' }
    });

    // London, UK, UTC+0
    new ClockScenario('uk-clock', 0 * 60, { 
        dialColor: '#C8102E', dialBackground: '#FFFFFF', trailColor: '#C8102E',
        handColors: { hour: '#012169', minute: '#012169', second: '#012169', millisecond: '#012169' }
    });

    // Paris, France, UTC+1
    new ClockScenario('france-clock', 1 * 60, { 
        dialColor: '#002654', dialBackground: '#FFFFFF', trailColor: '#002654',
        handColors: { hour: '#ED2939', minute: '#ED2939', second: '#ED2939', millisecond: '#ED2939' }
    });

    // Tokyo, Japan, UTC+9
    new ClockScenario('japan-clock', 9 * 60, { 
        dialColor: '#FFFFFF', dialBackground: '#BC002D', trailColor: '#FFFFFF',
        handColors: { hour: '#FFFFFF', minute: '#FFFFFF', second: '#FFFFFF', millisecond: '#FFFFFF' }
    });

    // New Delhi, India, UTC+5:30
    new ClockScenario('india-clock', (5 * 60) + 30, { 
        dialColor: '#046A38', dialBackground: '#FFFFFF', trailColor: '#FF671F',
        handColors: { hour: '#FF671F', minute: '#FF671F', second: '#FF671F', millisecond: '#FF671F' }
    });

    // Brasilia, Brazil, UTC-3
    new ClockScenario('brazil-clock', -3 * 60, { 
        dialColor: '#FEDD00', dialBackground: '#009739', trailColor: '#012169',
        handColors: { hour: '#012169', minute: '#012169', second: '#012169', millisecond: '#012169' }
    });
});
