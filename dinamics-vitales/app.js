(() => {
  const STORAGE_PREFIX = "dv_";
  const SCHEMA_VERSION = "0.5";

  const AREA_KEYS = ["origen","conciencia","escenarios","vinculo","sentido"];
  const BRANCH_BY_KEY = { origen:"br_origin", conciencia:"br_self", escenarios:"br_scripts", vinculo:"br_lonely", sentido:"br_sentido" };
  const KEY_BY_BRANCH_ID = { br_origin:"origen", br_self:"conciencia", br_scripts:"escenarios", br_lonely:"vinculo", br_sentido:"sentido" };

  const AREA_LABELS = {
    es:{origen:"Origen", conciencia:"Conciencia", escenarios:"Escenarios", vinculo:"Vínculo", sentido:"Sentido"},
    en:{origen:"Origin", conciencia:"Awareness", escenarios:"Scenarios", vinculo:"Bond", sentido:"Meaning"},
    ru:{origen:"Источник", conciencia:"Осознанность", escenarios:"Сценарии", vinculo:"Связь", sentido:"Смысл"}
  };

  const I18N = {
    es: {
      langLabel:"Idioma",
      brandTitle:"DINÁMICAS VITALES",
      brandSubtitle:"Explora tu Árbol de la Vida",
      brandDisclaimer:"No es un test. No es un diagnóstico.",
      tabs:{explore:"Explorar", summary:"Resumen", method:"Método"},
      explore:{title:"Exploración", btn:"Explorar"},
      pro:{label:"Modo profesional (notas + timer)", timer:"Timer de sesión", notes:"Notas (por rama)", notesHint:"Selecciona una rama para escribir notas.", notesPh:"Escribe notas clínicas/observaciones aquí…"},
      summary:{title:"Perfil Vital", sub:"Se actualiza desde tus escalas.", empty:"Completa al menos una rama para ver el resumen.", refresh:"Actualizar resumen", export:"Exportar (PDF)", copy:"Copiar informe (texto)"},
      tip:{title:"Tip", text:"Rueda del ratón: cambia la perspectiva. La diana muestra tu perfil."},
      modal:{
        close:"Cerrar (ESC)",
        scaleTitle:"Escala (0–10)",
        scaleHint:"Elige un número. 0 = nada / 10 = muy fuerte. Se guarda en este navegador.",
        avg:"Promedio del bloque",
        focus:"Enfoque",
        practice:"Práctica breve",
        note:"Nota",
        noteText:"Esto no es diagnóstico. Úsalo como exploración y lenguaje para describir tu experiencia.",
        resetBranch:"Reset rama",
        resetAll:"Reset todo",
        kb:"Atajos: 0–9, Shift+1 = 10, ↑↓, Enter",
        modeQuick:"RÁPIDO (3)",
        modePro:"PRO (15)",
        next:"Siguiente",
        prev:"Anterior",
        progress:"Progreso",
        doneBranch:"Rama completada",
        toSummary:"Ir a Resumen"
      },
      ai:{ btn:"AI-Interpretación", title:"Interpretación", none:"Completa al menos una rama para generar una interpretación." },
      json:{ export:"Descargar perfil (JSON)", import:"Importar perfil (JSON)", imported:"Perfil importado.", bad:"Archivo inválido o dañado.", resetAll:"Reset todo", confirmReset:"¿Borrar todo el perfil?" },
      report:{ title:"DINÁMICAS VITALES — Informe", subtitle:"Árbol de la Vida · Resumen", date:"Fecha", areas:"Áreas", notes:"Notas (modo profesional)", disclaimer:"Este informe no es diagnóstico." },
      method:{
        title:"Método: Árbol de la Vida",
        text:"DINÁMICAS VITALES usa el Árbol de la Vida como mapa de procesos vitales. No mide “quién eres”, sino cómo se mueve tu vida ahora. El árbol (ramas) muestra direcciones; la diana muestra orientación y centro.",
        pointsTitle:"Estructura",
        points:[
          "Origen: raíces, historia, soporte y pertenencia.",
          "Conciencia: identidad presente, regulación, centro.",
          "Escenarios: futuros, decisiones, rutas posibles.",
          "Vínculo: relaciones, límites, nutrición emocional.",
          "Sentido: significado, contribución, frutos."
        ]
      }
    },

    en: {
      langLabel:"Language",
      brandTitle:"VITAL DYNAMICS",
      brandSubtitle:"Explore your Tree of Life",
      brandDisclaimer:"Not a test. Not a diagnosis.",
      tabs:{explore:"Explore", summary:"Summary", method:"Method"},
      explore:{title:"Exploration", btn:"Explore"},
      pro:{label:"Professional mode (notes + timer)", timer:"Session timer", notes:"Notes (per branch)", notesHint:"Select a branch to write notes.", notesPh:"Write clinical notes/observations here…"},
      summary:{title:"Vital Profile", sub:"Updates from your scales.", empty:"Complete at least one branch to see the summary.", refresh:"Refresh summary", export:"Export (PDF)", copy:"Copy report (text)"},
      tip:{title:"Tip", text:"Mouse wheel changes perspective. The target shows your profile."},
      modal:{
        close:"Close (ESC)",
        scaleTitle:"Scale (0–10)",
        scaleHint:"Pick a number. 0 = not at all / 10 = very strong. Saved in this browser.",
        avg:"Block average",
        focus:"Focus",
        practice:"Brief practice",
        note:"Note",
        noteText:"This is not a diagnosis. Use it as exploration and language for experience.",
        resetBranch:"Reset branch",
        resetAll:"Reset all",
        kb:"Shortcuts: 0–9, Shift+1 = 10, ↑↓, Enter",
        modeQuick:"QUICK (3)",
        modePro:"PRO (15)",
        next:"Next",
        prev:"Back",
        progress:"Progress",
        doneBranch:"Branch completed",
        toSummary:"Go to Summary"
      },
      ai:{ btn:"AI-Interpretation", title:"Interpretation", none:"Complete at least one branch to generate an interpretation." },
      json:{ export:"Download profile (JSON)", import:"Import profile (JSON)", imported:"Profile imported.", bad:"Invalid or corrupted file.", resetAll:"Reset all", confirmReset:"Delete the whole profile?" },
      report:{ title:"VITAL DYNAMICS — Report", subtitle:"Tree of Life · Summary", date:"Date", areas:"Areas", notes:"Notes (professional mode)", disclaimer:"This report is not a diagnosis." },
      method:{
        title:"Method: Tree of Life",
        text:"VITAL DYNAMICS uses the Tree of Life as a map of living processes. It does not measure “who you are” but how life moves in you now. The tree shows directions; the target shows orientation and center.",
        pointsTitle:"Structure",
        points:[
          "Origin: roots, history, support, belonging.",
          "Awareness: present identity, regulation, center.",
          "Scenarios: futures, choices, possible routes.",
          "Bond: relationships, boundaries, emotional nourishment.",
          "Meaning: significance, contribution, fruits."
        ]
      }
    },

    ru: {
      langLabel:"Язык",
      brandTitle:"DINÁMICAS VITALES",
      brandSubtitle:"Исследуй своё Дерево Жизни",
      brandDisclaimer:"Это не тест и не диагноз.",
      tabs:{explore:"Исследовать", summary:"Профиль", method:"Метод"},
      explore:{title:"Исследование", btn:"Открыть"},
      pro:{label:"Проф-режим (заметки + таймер)", timer:"Таймер сессии", notes:"Заметки (по ветви)", notesHint:"Выбери ветвь, чтобы писать заметки.", notesPh:"Пиши клинические/рабочие заметки здесь…"},
      summary:{title:"Жизненный профиль", sub:"Обновляется из твоих шкал.", empty:"Заполни хотя бы одну ветвь, чтобы увидеть профиль.", refresh:"Обновить профиль", export:"Экспорт (PDF)", copy:"Скопировать отчёт (текст)"},
      tip:{title:"Подсказка", text:"Колесо мыши меняет перспективу. Мишень показывает профиль."},
      modal:{
        close:"Закрыть (ESC)",
        scaleTitle:"Шкала (0–10)",
        scaleHint:"Выбери число. 0 = нет / 10 = очень сильно. Сохраняется в этом браузере.",
        avg:"Среднее по блоку",
        focus:"Фокус",
        practice:"Короткая практика",
        note:"Примечание",
        noteText:"Это не диагноз. Используй как язык наблюдения за опытом.",
        resetBranch:"Сброс ветви",
        resetAll:"Сброс всего",
        kb:"Клавиши: 0–9, Shift+1 = 10, ↑↓, Enter",
        modeQuick:"БЫСТРО (3)",
        modePro:"ПРО (15)",
        next:"Дальше",
        prev:"Назад",
        progress:"Прогресс",
        doneBranch:"Ветвь заполнена",
        toSummary:"К профилю"
      },
      ai:{ btn:"AI-Интерпретация", title:"Интерпретация", none:"Заполни хотя бы одну ветвь, чтобы получить интерпретацию." },
      json:{ export:"Скачать профиль (JSON)", import:"Импорт профиля (JSON)", imported:"Профиль импортирован.", bad:"Файл повреждён или неверного формата.", resetAll:"Сброс всего", confirmReset:"Удалить весь профиль?" },
      report:{ title:"DINÁMICAS VITALES — Отчёт", subtitle:"Дерево Жизни · Резюме", date:"Дата", areas:"Зоны", notes:"Заметки (проф-режим)", disclaimer:"Этот отчёт не является диагнозом." },
      method:{
        title:"Метод: Дерево Жизни",
        text:"DINÁMICAS VITALES использует Дерево Жизни как карту жизненных процессов. Это не измерение «кто ты», а способ увидеть, как сейчас движется твоя жизнь. Дерево показывает направления, мишень — ориентацию и центр.",
        pointsTitle:"Структура",
        points:[
          "Источник: корни, история, опора, принадлежность.",
          "Осознанность: текущее «я», регуляция, центр.",
          "Сценарии: будущие варианты, решения, маршруты.",
          "Связь: отношения, границы, эмоциональное питание.",
          "Смысл: значение, вклад, «плоды»."
        ]
      }
    }
  };

  const CONTENT = {
    ru: {
      origen:{
        title:"Источник",
        preview:"Корни: история, семья, культура, опыт, который сформировал тебя.",
        intro:"Здесь мы смотрим на то, что тебя держит — и что всё ещё тянет назад.",
        questions:[
          "Какие семейные истории давали тебе силу?",
          "Какие «унаследованные правила» ограничивают тебя?",
          "Какую часть прошлого важно уважить (не повторяя её)?",
          "Какие события сформировали твоё чувство безопасности?",
          "Где в детстве ты чувствовал поддержку?",
          "Какие повторяющиеся сценарии идут из семьи?",
          "Что ты перенял, не задавая вопросов?",
          "Какие ценности ты считаешь по-настоящему своими?",
          "Есть ли чувство долга перед родом?",
          "Что ты хочешь завершить из прошлого?",
          "Чего тебе не хватало в раннем опыте?",
          "Как ты сейчас создаёшь опору себе?",
          "Что для тебя означает «дом»?",
          "Где ты чувствуешь принадлежность?",
          "Что стоит отпустить, чтобы двигаться свободнее?"
        ],
        practice:[
          "Назови 3 корня, которые питают (люди, места, ценности).",
          "Назови 1 корень, который тяжёлый: что нужно отпустить/преобразовать?",
          "Фраза: «Я родом из… и выбираю…»."
        ]
      },
      conciencia:{
        title:"Осознанность",
        preview:"Ствол: текущее «я», стабильность, способность выдерживать напряжение.",
        intro:"Здесь мы работаем с твоим «я сейчас»: что ты видишь, называешь и выдерживаешь.",
        questions:[
          "Кто ты сейчас — одной простой фразой?",
          "Какая эмоция чаще всего на этой неделе?",
          "Как тело реагирует на стресс?",
          "Насколько ты чувствуешь контакт с собой?",
          "Как ты принимаешь решения?",
          "Есть ли внутренний конфликт?",
          "Что вызывает внутреннюю устойчивость?",
          "Где ты теряешь центр?",
          "Как ты справляешься с тревогой?",
          "Насколько ты честен с собой?",
          "Есть ли внутренний критик? Насколько он силён?",
          "Что помогает восстановиться?",
          "Какие мысли повторяются чаще всего?",
          "Где ты действуешь автоматически, «на автопилоте»?",
          "Что сейчас больше всего требует осознания?"
        ],
        practice:[
          "6 медленных циклов дыхания — что меняется в теле?",
          "Назови состояние: «Сейчас я…» (без оценки).",
          "Выбери 1 маленькое действие, которое вернёт центр сегодня."
        ]
      },
      escenarios:{
        title:"Сценарии",
        preview:"Ветви: возможные направления, решения, будущие варианты.",
        intro:"Здесь мы исследуем будущие линии: желанные, пугающие и повторяющиеся.",
        questions:[
          "Какой будущий сценарий притягивает?",
          "Какой сценарий повторяется «по инерции»?",
          "Какое решение откладывается?",
          "Чего ты боишься изменить?",
          "Где есть ощущение застоя?",
          "Есть ли нереализованная возможность?",
          "Что мешает действовать сейчас?",
          "Что ты бы сделал(а), если бы страха не было?",
          "Какие цели действительно твои?",
          "Есть ли ощущение «не своей дороги»?",
          "Насколько ты видишь альтернативы?",
          "Что тебя вдохновляет?",
          "Есть ли внутренний саботаж? Как он проявляется?",
          "Какой минимальный шаг возможен в ближайшие 24 часа?",
          "Что будет, если ничего не менять (через 3 месяца)?"
        ],
        practice:[
          "Опиши 2 будущих: «безопасное» и «живое». Что чувствуешь в каждом?",
          "Сформулируй «следующий шаг» как 15 минут реального действия.",
          "Выбери фразу-ориентир на неделю."
        ]
      },
      vinculo:{
        title:"Связь",
        preview:"Отношения: поддержка, границы, принадлежность, эмоциональное питание.",
        intro:"Здесь мы смотрим на то, как ты соединяешься — с людьми и с собой.",
        questions:[
          "Кто поддерживает тебя сейчас?",
          "Где ты чувствуешь одиночество?",
          "Есть ли здоровые границы?",
          "Как ты реагируешь на конфликт?",
          "Легко ли просить помощи?",
          "Есть ли зависимые отношения/привязки?",
          "Где ты подавляешь свои потребности?",
          "Чувствуешь ли принятие рядом с важными людьми?",
          "Есть ли страх близости?",
          "Есть ли страх отвержения?",
          "Какие отношения повторяются снова и снова?",
          "Где ты чувствуешь себя живым(ой) в контакте?",
          "Есть ли скрытая обида? На кого/за что?",
          "Насколько ты доверяешь людям?",
          "Что сейчас нужно для безопасной связи?"
        ],
        practice:[
          "Списки: «питает» / «истощает» (просто наблюдай).",
          "Выбери 1 разговор и набросай первое предложение.",
          "Практика «мягкой границы» одной фразой."
        ]
      },
      sentido:{
        title:"Смысл",
        preview:"Плоды: значение, вклад, цель, то, что остаётся после тебя.",
        intro:"Здесь мы соединяемся со смыслом — тем, что важно даже в трудные периоды.",
        questions:[
          "Что придаёт жизни значение?",
          "Есть ли чувство направления?",
          "Чувствуешь ли вклад в мир/людей?",
          "Что вдохновляет?",
          "Есть ли ощущение пустоты?",
          "Что даёт энергию?",
          "Есть ли мечта (даже скрытая)?",
          "Где ты теряешь мотивацию?",
          "Что вызывает чувство гордости?",
          "Есть ли ценности, которым ты не следуешь?",
          "Что приносит радость?",
          "Есть ли ощущение миссии/призвания?",
          "Что ты хочешь оставить после себя?",
          "Насколько ты живёшь в соответствии с ценностями?",
          "Какой шаг усиливает смысл уже сейчас?"
        ],
        practice:[
          "3 вещи, которые ты уже дал(а) миру (даже маленькие).",
          "1 простой акт вклада на этой неделе.",
          "Фраза: «Моя жизнь имеет смысл, когда…»."
        ]
      }
    },

    es: {
      origen:{
        title:"Origen",
        preview:"Raíces: historia, familia, cultura, experiencias que te formaron.",
        intro:"Aquí miramos lo que te sostiene y lo que todavía tira de ti.",
        questions:[
          "¿Qué historias familiares te dieron fuerza?",
          "¿Qué “reglas heredadas” hoy te limitan?",
          "¿Qué parte de tu pasado merece ser honrada (sin repetirla)?",
          "¿Qué eventos formaron tu sensación de seguridad?",
          "¿Dónde sentías apoyo en la infancia?",
          "¿Qué patrones repetidos vienen de tu familia?",
          "¿Qué asumiste sin cuestionar?",
          "¿Qué valores sientes realmente tuyos?",
          "¿Sientes deuda o lealtad hacia el linaje?",
          "¿Qué quieres cerrar del pasado?",
          "¿Qué faltó en tu experiencia temprana?",
          "¿Cómo creas apoyo para ti hoy?",
          "¿Qué significa “hogar” para ti?",
          "¿Dónde sientes pertenencia?",
          "¿Qué necesitas soltar para avanzar con más libertad?"
        ],
        practice:[
          "Nombra 3 raíces que te nutren (personas, lugares, valores).",
          "Nombra 1 raíz pesada: ¿qué necesitas soltar o transformar?",
          "Escribe: «Yo vengo de… y elijo…»."
        ]
      },
      conciencia:{
        title:"Conciencia",
        preview:"Tronco: identidad presente, estabilidad, capacidad de sostener tensión.",
        intro:"Aquí trabajamos tu «yo actual»: lo que puedes ver, nombrar y sostener.",
        questions:[
          "¿Quién eres hoy, en una frase simple?",
          "¿Qué emoción es más frecuente esta semana?",
          "¿Cómo reacciona tu cuerpo al estrés?",
          "¿Qué tanto estás en contacto contigo?",
          "¿Cómo tomas decisiones?",
          "¿Hay conflicto interno?",
          "¿Qué te da estabilidad interna?",
          "¿Dónde pierdes el centro?",
          "¿Cómo manejas la ansiedad?",
          "¿Qué tan honesto/a eres contigo?",
          "¿Qué tan fuerte es tu crítico interno?",
          "¿Qué te ayuda a recuperar energía?",
          "¿Qué pensamientos se repiten más?",
          "¿Dónde funcionas en “piloto automático”?",
          "¿Qué necesita más conciencia ahora?"
        ],
        practice:[
          "Respira 6 ciclos lentos: ¿qué cambia en tu cuerpo?",
          "Nombra tu estado: «Ahora mismo estoy…» (sin juicio).",
          "Elige 1 acción pequeña que te devuelva centro hoy."
        ]
      },
      escenarios:{
        title:"Escenarios",
        preview:"Ramas: direcciones posibles, decisiones, futuros que se abren o se cierran.",
        intro:"Aquí exploramos tus futuros: los que deseas, los que temes y los que repites.",
        questions:[
          "¿Qué escenario futuro te atrae de verdad?",
          "¿Qué escenario repites sin querer?",
          "¿Qué decisión estás postergando?",
          "¿Qué te da miedo cambiar?",
          "¿Dónde sientes estancamiento?",
          "¿Hay una oportunidad no realizada?",
          "¿Qué te impide actuar ahora?",
          "¿Qué harías si no tuvieras miedo?",
          "¿Qué objetivos son realmente tuyos?",
          "¿Sientes que vas por un camino que no es tuyo?",
          "¿Qué tan claras son tus alternativas?",
          "¿Qué te inspira?",
          "¿Hay autosabotaje? ¿Cómo aparece?",
          "¿Cuál es un paso mínimo en 24 horas?",
          "¿Qué pasa si no cambias nada (en 3 meses)?"
        ],
        practice:[
          "Escribe 2 futuros: uno «seguro» y uno «vivo». ¿Qué sientes en cada uno?",
          "Define tu «próximo paso» en 15 minutos de acción real.",
          "Elige una frase guía para esta semana."
        ]
      },
      vinculo:{
        title:"Vínculo",
        preview:"Relación: vínculos, apoyo, límites, pertenencia, nutrición emocional.",
        intro:"Aquí miramos cómo te conectas: con otros y contigo.",
        questions:[
          "¿Quién te apoya hoy?",
          "¿Dónde sientes soledad?",
          "¿Tienes límites saludables?",
          "¿Cómo reaccionas al conflicto?",
          "¿Te cuesta pedir ayuda?",
          "¿Hay relaciones de dependencia?",
          "¿Dónde callas tus necesidades?",
          "¿Sientes aceptación con personas importantes?",
          "¿Hay miedo a la cercanía?",
          "¿Hay miedo al rechazo?",
          "¿Qué tipo de relaciones se repiten?",
          "¿Dónde te sientes vivo/a en el contacto?",
          "¿Hay resentimiento oculto?",
          "¿Qué tanto confías en la gente?",
          "¿Qué necesitas ahora para sentir vínculo seguro?"
        ],
        practice:[
          "Lista: «me nutre» / «me drena» (solo observar).",
          "Elige 1 conversación pendiente y escribe cómo la empezarías.",
          "Practica un límite amable en una frase."
        ]
      },
      sentido:{
        title:"Sentido",
        preview:"Frutos: significado, contribución, propósito, lo que dejas en tu camino.",
        intro:"Aquí conectamos con significado: lo que vale, incluso en tiempos difíciles.",
        questions:[
          "¿Qué le da valor a tu vida?",
          "¿Sientes dirección?",
          "¿Sientes contribución?",
          "¿Qué te inspira?",
          "¿Hay sensación de vacío?",
          "¿Qué te da energía?",
          "¿Hay un sueño (aunque oculto)?",
          "¿Dónde pierdes motivación?",
          "¿Qué te hace sentir orgullo?",
          "¿Hay valores que no estás viviendo?",
          "¿Qué te da alegría?",
          "¿Sientes misión o llamado?",
          "¿Qué huella quieres dejar?",
          "¿Qué tan alineado/a vives con tus valores?",
          "¿Qué paso aumenta el sentido ahora?"
        ],
        practice:[
          "Escribe 3 cosas que ya has dado al mundo (aunque sean pequeñas).",
          "Elige 1 acto de contribución esta semana (muy simple).",
          "Completa: «Mi vida tiene sentido cuando…»."
        ]
      }
    },

    en: {
      origen:{
        title:"Origin",
        preview:"Roots: history, family, culture, experiences that shaped you.",
        intro:"Here we look at what supports you—and what still pulls on you.",
        questions:[
          "Which family stories gave you strength?",
          "Which “inherited rules” limit you today?",
          "What part of your past deserves honor (without repeating it)?",
          "Which events shaped your sense of safety?",
          "Where did you feel support in childhood?",
          "Which recurring patterns come from your family?",
          "What did you adopt without questioning?",
          "Which values feel truly yours?",
          "Do you feel loyalty/debt to your lineage?",
          "What do you want to close from the past?",
          "What was missing in early experience?",
          "How do you build support for yourself today?",
          "What does “home” mean to you?",
          "Where do you feel belonging?",
          "What do you need to release to move more freely?"
        ],
        practice:[
          "Name 3 roots that nourish you (people, places, values).",
          "Name 1 heavy root: what needs releasing or transforming?",
          "Write: “I come from… and I choose…”"
        ]
      },
      conciencia:{
        title:"Awareness",
        preview:"Trunk: present identity, stability, capacity to hold tension.",
        intro:"We work with your present self: what you can see, name, and hold.",
        questions:[
          "Who are you today—in one simple sentence?",
          "Which emotion is most frequent this week?",
          "How does your body respond to stress?",
          "How connected do you feel to yourself?",
          "How do you make decisions?",
          "Is there inner conflict?",
          "What creates inner stability?",
          "Where do you lose your center?",
          "How do you handle anxiety?",
          "How honest are you with yourself?",
          "How strong is your inner critic?",
          "What helps you recover energy?",
          "Which thoughts repeat most?",
          "Where do you run on “autopilot”?",
          "What needs more awareness right now?"
        ],
        practice:[
          "Breathe 6 slow cycles: what changes in your body?",
          "Name your state: “Right now I am…” (no judgment).",
          "Choose 1 small action that brings you back to center today."
        ]
      },
      escenarios:{
        title:"Scenarios",
        preview:"Branches: possible directions, decisions, futures opening or closing.",
        intro:"We explore your futures: desired, feared, and repeated patterns.",
        questions:[
          "Which future scenario truly attracts you?",
          "Which scenario do you repeat unintentionally?",
          "Which decision are you postponing?",
          "What are you afraid to change?",
          "Where do you feel stuck?",
          "Is there an unrealized opportunity?",
          "What prevents action right now?",
          "What would you do if you had no fear?",
          "Which goals are truly yours?",
          "Do you feel you’re on the wrong path?",
          "How clear are your alternatives?",
          "What inspires you?",
          "Is there self-sabotage? How does it show up?",
          "What is one minimal step within 24 hours?",
          "What happens if nothing changes (in 3 months)?"
        ],
        practice:[
          "Write 2 futures: one “safe” and one “alive.” What do you feel in each?",
          "Define your next step as 15 minutes of real action.",
          "Choose a guiding sentence for this week."
        ]
      },
      vinculo:{
        title:"Bond",
        preview:"Relationship: support, boundaries, belonging, emotional nourishment.",
        intro:"We look at how you connect—with others and with yourself.",
        questions:[
          "Who supports you today?",
          "Where do you feel lonely?",
          "Do you have healthy boundaries?",
          "How do you respond to conflict?",
          "Is it hard to ask for help?",
          "Are there dependent ties?",
          "Where do you suppress your needs?",
          "Do you feel accepted by important people?",
          "Is there fear of closeness?",
          "Is there fear of rejection?",
          "Which relationship patterns repeat?",
          "Where do you feel most alive in contact?",
          "Is there hidden resentment?",
          "How much do you trust people?",
          "What do you need now for safer connection?"
        ],
        practice:[
          "Make two lists: “nourishes me” / “drains me” (just observe).",
          "Pick 1 pending conversation and draft how you would start it.",
          "Practice a kind boundary in one sentence."
        ]
      },
      sentido:{
        title:"Meaning",
        preview:"Fruits: meaning, contribution, purpose, what your path leaves behind.",
        intro:"We connect with meaning: what matters—even in difficult times.",
        questions:[
          "What gives your life value?",
          "Do you feel direction?",
          "Do you feel contribution?",
          "What inspires you?",
          "Is there a sense of emptiness?",
          "What gives you energy?",
          "Is there a dream (even hidden)?",
          "Where do you lose motivation?",
          "What makes you feel proud?",
          "Are there values you are not living?",
          "What brings you joy?",
          "Do you feel a calling/mission?",
          "What trace do you want to leave?",
          "How aligned are you with your values?",
          "What step increases meaning right now?"
        ],
        practice:[
          "Write 3 things you’ve already given the world (even small ones).",
          "Choose 1 simple act of contribution this week.",
          "Complete: “My life has meaning when…”"
        ]
      }
    }
  };

  // ===== DOM =====
  const stage = document.getElementById("stage");
  const nodes = Array.from(document.querySelectorAll(".node"));
  const branches = Array.from(document.querySelectorAll(".branch"));
  const rings = Array.from(document.querySelectorAll(".targetRing"));

  const exploreTitle = document.getElementById("exploreTitle");
  const exploreText  = document.getElementById("exploreText");
  const openModalBtn = document.getElementById("openModalBtn");

  const proToggle = document.getElementById("proToggle");
  const proTools = document.getElementById("proTools");
  const notesArea = document.getElementById("notesArea");

  const tabExplore = document.getElementById("tabExplore");
  const tabSummary = document.getElementById("tabSummary");
  const tabMethod  = document.getElementById("tabMethod");
  const exploreCard = document.getElementById("exploreCard");
  const summaryCard = document.getElementById("summaryCard");
  const methodCard  = document.getElementById("methodCard");

  const summaryEmpty = document.getElementById("summaryEmpty");
  const summaryBody = document.getElementById("summaryBody");
  const summaryRows = document.getElementById("summaryRows");
  const miniShape = document.getElementById("miniShape");
  const summaryText = document.getElementById("summaryText");

  const exportBtn = document.getElementById("exportBtn");
  const copyBtn = document.getElementById("copyBtn");
  const refreshSummaryBtn = document.getElementById("refreshSummary");

  const aiBtn = document.getElementById("aiBtn");
  const aiBox = document.getElementById("aiBox");
  const aiTitle = document.getElementById("aiTitle");
  const aiText = document.getElementById("aiText");

  const jsonExportBtn = document.getElementById("jsonExportBtn");
  const jsonImportBtn = document.getElementById("jsonImportBtn");
  const jsonFile = document.getElementById("jsonFile");
  const resetAllBtn = document.getElementById("resetAllBtn");

  const methodTitle = document.getElementById("methodTitle");
  const methodText = document.getElementById("methodText");
  const methodPointsTitle = document.getElementById("methodPointsTitle");
  const methodPoints = document.getElementById("methodPoints");

  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalBody = document.getElementById("modalBody");
  const modalCloseBtn = document.getElementById("modalCloseBtn");

  const nodeOrigen = document.getElementById("nodeOrigen");
  const nodeConciencia = document.getElementById("nodeConciencia");
  const nodeEscenarios = document.getElementById("nodeEscenarios");
  const nodeVinculo = document.getElementById("nodeVinculo");
  const nodeSentido = document.getElementById("nodeSentido");

  const labYo = document.getElementById("labYo");
  const labEscenarios = document.getElementById("labEscenarios");
  const labVinculo = document.getElementById("labVinculo");
  const labOrigen = document.getElementById("labOrigen");
  const labSentido = document.getElementById("labSentido");

  const targetProfile = document.getElementById("targetProfile");
  const targetProfileGlow = document.getElementById("targetProfileGlow");
  const scoreEsc = document.getElementById("scoreEscenarios");
  const scoreVin = document.getElementById("scoreVinculo");
  const scoreOri = document.getElementById("scoreOrigen");
  const scoreSen = document.getElementById("scoreSentido");

  const btnES = document.getElementById("btnES");
  const btnEN = document.getElementById("btnEN");
  const btnRU = document.getElementById("btnRU");

  // ===== State =====
  let lang = localStorage.getItem(STORAGE_PREFIX+"lang") || "es";
  let viewTop = 0;
  let lockedKey = null;
  let currentKey = null;
  let proMode = (localStorage.getItem(STORAGE_PREFIX+"pro") || "0") === "1";

  // NEW UX toggles
  const AUTO_NEXT_DEFAULT = true;
  let autoNext = (localStorage.getItem(STORAGE_PREFIX+"autonext") ?? (AUTO_NEXT_DEFAULT ? "1" : "0")) === "1";

  // Modal state
  let modalActiveKey = null;
  let modalScores = null;   // always full 15 stored
  let modalQIndex = 0;
  let modalMode = "quick";  // quick/pro per branch

  // ===== Utils =====
  function escapeHtml(str){
    return String(str)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#039;");
  }
  const clamp = (n,min,max)=>Math.max(min, Math.min(max, n));
  const avg = (arr)=>arr.reduce((a,b)=>a+b,0)/Math.max(1,arr.length);

  function applyCamera(){
    document.documentElement.style.setProperty("--tilt", (viewTop * 78) + "deg");
    document.documentElement.style.setProperty("--zoom", (1 - viewTop * 0.06));
    document.documentElement.style.setProperty("--targetAlpha", Math.max(0.12, Math.min(1, 0.12 + viewTop*0.95)));
  }

  stage.addEventListener("wheel", (e) => {
    e.preventDefault();
    viewTop += e.deltaY > 0 ? 0.06 : -0.06;
    viewTop = clamp(viewTop, 0, 1);
    applyCamera();
  }, { passive:false });

  function getModeKey(areaKey){ return STORAGE_PREFIX+"mode_"+areaKey; }
  function loadBranchMode(areaKey){
    const v = localStorage.getItem(getModeKey(areaKey));
    return (v === "pro" || v === "quick") ? v : "quick";
  }
  function saveBranchMode(areaKey, mode){
    localStorage.setItem(getModeKey(areaKey), mode);
  }

  function loadScores(areaKey, count){
    const raw = localStorage.getItem(STORAGE_PREFIX+"scores_" + areaKey);
    let arr = [];
    try { arr = raw ? JSON.parse(raw) : []; } catch { arr = []; }
    if (!Array.isArray(arr)) arr = [];
    while (arr.length < count) arr.push(0);
    return arr.slice(0, count).map(v => clamp(Number(v)||0, 0, 10));
  }
  function saveScores(areaKey, arr){
    localStorage.setItem(STORAGE_PREFIX+"scores_" + areaKey, JSON.stringify(arr.map(v=>clamp(Number(v)||0,0,10))));
  }

  function loadNote(areaKey){ return localStorage.getItem(STORAGE_PREFIX+"note_"+areaKey) || ""; }
  function saveNote(areaKey, text){ localStorage.setItem(STORAGE_PREFIX+"note_"+areaKey, text || ""); }

  function getAreaScores(areaKey){
    const raw = localStorage.getItem(STORAGE_PREFIX+"scores_"+areaKey);
    if(!raw) return null;
    try{
      const arr = JSON.parse(raw);
      if(!Array.isArray(arr) || !arr.length) return null;
      return arr.map(v=>clamp(Number(v)||0,0,10));
    }catch{ return null; }
  }

  function questionsCountFor(areaKey){
    return (loadBranchMode(areaKey) === "pro") ? 15 : 3;
  }

  function computeAverages(){
    return AREA_KEYS.map(k => {
      const s = getAreaScores(k);
      if(!s) return 0;
      const n = questionsCountFor(k);
      return avg(s.slice(0,n));
    });
  }

  function completionFor(areaKey){
    const n = questionsCountFor(areaKey);
    const s = getAreaScores(areaKey);
    if(!s) return {done:0,total:n,complete:false};
    const done = s.slice(0,n).filter(v => Number(v) > 0).length; // 0 counts as "not answered"
    return {done, total:n, complete: done >= n};
  }

  function clearActive(){
    document.querySelectorAll(".branch.active").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".node.active").forEach(el => el.classList.remove("active"));
    document.querySelectorAll(".targetRing.active").forEach(el => el.classList.remove("active"));
    rings.forEach(r => { r.removeAttribute("stroke"); r.removeAttribute("stroke-width"); r.removeAttribute("opacity"); });
  }

  function resetPanel(){
    exploreTitle.textContent = I18N[lang].explore.title;
    exploreText.textContent =
      (lang==="ru")
        ? "Это дерево отражает жизненные процессы. Не нужно понимать — достаточно наблюдать."
        : (lang==="en")
          ? "This tree represents living processes. You don’t need to understand it. Just observe."
          : "Este árbol representa procesos vitales. No tienes que entenderlo. Solo observar.";
    openModalBtn.disabled = true;

    if(proMode){
      document.getElementById("notesHint").style.display = "block";
      notesArea.value = "";
    }
  }

  function setPanel(areaKey){
    const c = CONTENT[lang][areaKey];
    const comp = completionFor(areaKey);
    const mode = loadBranchMode(areaKey) === "pro" ? "PRO (15)" : (lang==="ru" ? "БЫСТРО (3)" : (lang==="en" ? "QUICK (3)" : "RÁPIDO (3)"));
    exploreTitle.textContent = c.title;
    exploreText.textContent  = `${c.preview}  ·  ${mode}  ·  ${comp.done}/${comp.total}`;
    openModalBtn.disabled = false;
  }

  function highlightRing(areaKey){
    document.querySelectorAll(`.targetRing[data-key="${areaKey}"]`).forEach(r => r.classList.add("active"));
    document.querySelectorAll(`.targetRing[data-key="${areaKey}"]`).forEach(r => {
      r.setAttribute("stroke", "rgba(255,255,255,0.98)");
      r.setAttribute("stroke-width", "6");
      r.setAttribute("opacity", "1");
    });
  }

  function setActive(areaKey){
    currentKey = areaKey;
    clearActive();

    const node = nodes.find(n => n.dataset.key === areaKey);
    if (node) node.classList.add("active");

    const brId = BRANCH_BY_KEY[areaKey];
    const br = brId ? document.getElementById(brId) : null;
    if (br) br.classList.add("active");

    document.documentElement.style.setProperty("--targetAlpha", Math.max(0.55, Math.min(1, 0.12 + viewTop*0.95)));
    highlightRing(areaKey);
    setPanel(areaKey);

    if(proMode){
      document.getElementById("notesHint").style.display = "none";
      notesArea.value = loadNote(areaKey);
      notesArea.placeholder = I18N[lang].pro.notesPh;
    }
  }

  // ===== Target polygon =====
  function setTargetPolygonFromAverages(avgs){
    const map = [
      {idx:2, angleDeg:-90, maxR:325}, // escenarios
      {idx:4, angleDeg:-18, maxR:325}, // sentido
      {idx:0, angleDeg:54,  maxR:325}, // origen
      {idx:3, angleDeg:126, maxR:325}, // vinculo
      {idx:1, angleDeg:198, maxR:325}  // conciencia
    ];

    const cx=410, cy=410;
    const pts = map.map(m=>{
      const v = clamp(avgs[m.idx] || 0, 0, 10);
      const r = (v/10) * (m.maxR - 10);
      const a = (m.angleDeg * Math.PI) / 180;
      const x = cx + r * Math.cos(a);
      const y = cy + r * Math.sin(a);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");

    targetProfile?.setAttribute("points", pts);
    targetProfileGlow?.setAttribute("points", pts);

    scoreEsc.textContent = (avgs[2] || 0).toFixed(1);
    scoreVin.textContent = (avgs[3] || 0).toFixed(1);
    scoreOri.textContent = (avgs[0] || 0).toFixed(1);
    scoreSen.textContent = (avgs[4] || 0).toFixed(1);
  }

  function updateSummaryAndTargets(){
    summaryRows.innerHTML = "";
    const fixed = computeAverages();
    const any = fixed.some(v=>v>0);

    setTargetPolygonFromAverages(fixed);

    if(!any){
      summaryEmpty.style.display="block";
      summaryBody.style.display="none";
      miniShape.setAttribute("points", "");
      summaryText.innerHTML = "";
      aiBox.style.display = "none";
      return;
    }

    summaryEmpty.style.display="none";
    summaryBody.style.display="block";

    AREA_KEYS.forEach((k,i)=>{
      const v = fixed[i];
      const comp = completionFor(k);
      const row = document.createElement("div");
      row.innerHTML = `
        <div class="summaryRow">
          <span>${escapeHtml(AREA_LABELS[lang][k])} <span style="opacity:.7">(${comp.done}/${comp.total})</span></span>
          <span>${v.toFixed(1)}/10</span>
        </div>
        <div class="bar"><div style="width:${Math.round(v*10)}%"></div></div>
      `;
      summaryRows.appendChild(row);
    });

    const cx=100, cy=100;
    const radii=[80,60,40,60,80];
    const pts=[];
    fixed.forEach((v,i)=>{
      const angle=(-90 + i*(360/fixed.length))*Math.PI/180;
      const r=(v/10)*radii[i];
      pts.push((cx+r*Math.cos(angle)).toFixed(1)+","+(cy+r*Math.sin(angle)).toFixed(1));
    });
    miniShape.setAttribute("points", pts.join(" "));

    const max=Math.max(...fixed), min=Math.min(...fixed);
    const hiKey=AREA_KEYS[fixed.indexOf(max)], loKey=AREA_KEYS[fixed.indexOf(min)];
    const hi=AREA_LABELS[lang][hiKey], lo=AREA_LABELS[lang][loKey];

    summaryText.innerHTML =
      (lang==="ru")
        ? `Самая живая зона сейчас: <b>${escapeHtml(hi)}</b><br>Зона, которая просит заботы: <b>${escapeHtml(lo)}</b><br>Шаг: подпитай <b>${escapeHtml(lo)}</b> маленьким действием 5–15 минут.`
        : (lang==="en")
          ? `Most alive area now: <b>${escapeHtml(hi)}</b><br>Area asking for care: <b>${escapeHtml(lo)}</b><br>Step: nourish <b>${escapeHtml(lo)}</b> with a 5–15 min action.`
          : `Zona más viva ahora: <b>${escapeHtml(hi)}</b><br>Zona que pide cuidado: <b>${escapeHtml(lo)}</b><br>Paso: nutre <b>${escapeHtml(lo)}</b> con una acción de 5–15 min.`;
  }

  // ===== Modal UI helpers =====
  function renderScoreButtons(qIndex, value){
    let html = `<div class="scoreGrid" data-qindex="${qIndex}">`;
    for(let i=0;i<=10;i++){
      const sel = (i===value) ? " sel" : "";
      html += `<button type="button" class="sbtn${sel}" data-val="${i}" aria-label="${i}">${i}</button>`;
    }
    html += `</div>`;
    return html;
  }

  function updateAverageUI(scores, visibleCount){
    const a = avg(scores.slice(0, visibleCount));
    const avgEl = document.getElementById("avgValue");
    const bar = document.getElementById("avgBar");
    if (avgEl) avgEl.textContent = a.toFixed(1);
    if (bar) bar.style.width = Math.round((a/10)*100) + "%";
  }

  function highlightQuestion(idx){
    const items = Array.from(modalBody.querySelectorAll(".qItem"));
    items.forEach((el,i)=>{
      el.style.outline = i===idx ? "1px solid rgba(255,255,255,.25)" : "none";
      el.style.borderRadius = "14px";
      el.style.padding = "8px";
      el.style.marginLeft = "-8px";
      el.style.marginRight = "-8px";
    });
    const active = items[idx];
    active?.scrollIntoView({block:"nearest", behavior:"smooth"});

    const prog = document.getElementById("progressText");
    const total = items.length;
    if (prog) prog.textContent = `${idx+1}/${total}`;

    const prevBtn = document.getElementById("prevQBtn");
    const nextBtn = document.getElementById("nextQBtn");
    if (prevBtn) prevBtn.disabled = idx <= 0;
    if (nextBtn) nextBtn.disabled = idx >= total - 1;

    // completed?
    const doneBanner = document.getElementById("doneBanner");
    if(doneBanner){
      const comp = completionFor(modalActiveKey);
      doneBanner.style.display = comp.complete ? "block" : "none";
    }
  }

  function setModeButtons(mode){
    const bq = document.getElementById("modeQuickBtn");
    const bp = document.getElementById("modeProBtn");
    if(bq) bq.classList.toggle("active", mode==="quick");
    if(bp) bp.classList.toggle("active", mode==="pro");
  }

  function nextQuestion(){
    const total = (loadBranchMode(modalActiveKey) === "pro") ? 15 : 3;
    if (modalQIndex >= total - 1) {
      // end reached
      const comp = completionFor(modalActiveKey);
      if(comp.complete){
        // show banner (already handled) + optionally move to summary
      }
      return;
    }
    modalQIndex = clamp(modalQIndex + 1, 0, total-1);
    highlightQuestion(modalQIndex);
  }

  function prevQuestion(){
    const total = (loadBranchMode(modalActiveKey) === "pro") ? 15 : 3;
    modalQIndex = clamp(modalQIndex - 1, 0, total-1);
    highlightQuestion(modalQIndex);
  }

  // ===== Open / Close modal =====
  function openModal(areaKey){
    const c = CONTENT[lang][areaKey];
    const tr = I18N[lang].modal;

    modalActiveKey = areaKey;
    modalMode = loadBranchMode(areaKey);
    modalScores = loadScores(areaKey, 15);
    modalQIndex = 0;

    const visibleCount = (modalMode === "pro") ? 15 : 3;

    modalTitle.textContent = c.title;
    modalSubtitle.textContent = (lang==="en") ? "VITAL DYNAMICS · Tree of Life" : (lang==="ru" ? "DINÁMICAS VITALES · Дерево Жизни" : "DINÁMICAS VITALES · Árbol de la Vida");
    modalCloseBtn.textContent = tr.close;

    const questionsHtml = c.questions.slice(0, visibleCount).map((q, idx) => {
      const val = modalScores[idx] ?? 0;
      return `
        <div class="qItem">
          <div class="qText">${escapeHtml(q)}</div>
          <div class="qRow">
            <div class="small">${escapeHtml(tr.scaleTitle)} · <span style="opacity:.85">${escapeHtml(tr.kb)}</span></div>
            <div class="qScore" id="qScore_${idx}">${val}</div>
          </div>
          ${renderScoreButtons(idx, val)}
        </div>
      `;
    }).join("");

    const compNow = completionFor(areaKey);

    modalBody.innerHTML = `
      <div class="section">
        <div style="display:flex;gap:10px;flex-wrap:wrap;justify-content:space-between;align-items:center">
          <div>
            <b>${escapeHtml(tr.focus)}</b>
            <p style="margin:6px 0 0">${escapeHtml(c.intro)}</p>
            <div class="small" style="margin-top:8px;opacity:.85">${compNow.done}/${compNow.total}</div>
          </div>

          <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
            <button class="tab" id="modeQuickBtn">${escapeHtml(tr.modeQuick)}</button>
            <button class="tab" id="modeProBtn">${escapeHtml(tr.modePro)}</button>
          </div>
        </div>
      </div>

      <div class="section" id="doneBanner" style="display:${compNow.complete ? "block" : "none"}">
        <b>${escapeHtml(tr.doneBranch)}</b>
        <div class="small" style="margin-top:6px;opacity:.9">${escapeHtml(tr.progress)}: ${compNow.done}/${compNow.total}</div>
        <button class="tab" id="toSummaryBtn" style="margin-top:10px">${escapeHtml(tr.toSummary)}</button>
      </div>

      <div class="section">
        <b>${escapeHtml(tr.scaleTitle)}</b>
        <div class="small">${escapeHtml(tr.scaleHint)}</div>

        <div class="meter"><div id="avgBar"></div></div>
        <div class="small" style="margin-top:8px;display:flex;justify-content:space-between;gap:10px;align-items:center;flex-wrap:wrap">
          <span>${escapeHtml(tr.avg)}: <b id="avgValue">0</b>/10</span>
          <span class="small" style="opacity:.9">${escapeHtml(tr.progress)}: <b id="progressText">1/${visibleCount}</b></span>
        </div>

        <div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">
          <button class="tab" id="prevQBtn">${escapeHtml(tr.prev)}</button>
          <button class="tab" id="nextQBtn">${escapeHtml(tr.next)}</button>
          <button class="tab" id="resetBranchBtn">${escapeHtml(tr.resetBranch)}</button>
          <button class="tab" id="resetAllModalBtn">${escapeHtml(tr.resetAll)}</button>
        </div>

        ${questionsHtml}
      </div>

      <div class="section">
        <b>${escapeHtml(tr.practice)}</b>
        <ul>${c.practice.map(p => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
      </div>

      <div class="section">
        <b>${escapeHtml(tr.note)}</b>
        <p>${escapeHtml(tr.noteText)}</p>
      </div>
    `;

    // mode buttons
    setModeButtons(modalMode);
    document.getElementById("modeQuickBtn").addEventListener("click", ()=>{
      if(modalMode==="quick") return;
      modalMode="quick";
      saveBranchMode(areaKey, "quick");
      openModal(areaKey);
      updateSummaryAndTargets();
      if(currentKey) setPanel(currentKey);
    });
    document.getElementById("modeProBtn").addEventListener("click", ()=>{
      if(modalMode==="pro") return;
      modalMode="pro";
      saveBranchMode(areaKey, "pro");
      openModal(areaKey);
      updateSummaryAndTargets();
      if(currentKey) setPanel(currentKey);
    });

    const toSummaryBtn = document.getElementById("toSummaryBtn");
    if(toSummaryBtn){
      toSummaryBtn.addEventListener("click", ()=>{
        closeModal();
        setTab("summary");
      });
    }

    // wire score clicks + AUTO NEXT
    modalBody.querySelectorAll(".scoreGrid").forEach(grid=>{
      grid.addEventListener("click", (e)=>{
        const btn = e.target.closest(".sbtn");
        if(!btn) return;
        const idx = Number(grid.dataset.qindex);
        const v = Number(btn.dataset.val);
        if(!Number.isFinite(idx) || !Number.isFinite(v)) return;

        modalScores[idx] = v;
        saveScores(areaKey, modalScores);

        const scoreEl = document.getElementById("qScore_" + idx);
        if(scoreEl) scoreEl.textContent = String(v);
        grid.querySelectorAll(".sbtn").forEach(b=>b.classList.toggle("sel", b === btn));

        modalQIndex = idx;
        highlightQuestion(modalQIndex);

        const visible = (modalMode==="pro") ? 15 : 3;
        updateAverageUI(modalScores, visible);
        updateSummaryAndTargets();
        if(currentKey) setPanel(currentKey);

        if(autoNext){
          // small delay for perceived feedback
          setTimeout(()=>{
            // If we switched mode or closed modal quickly, check still open
            if(modalBackdrop.classList.contains("show") && modalActiveKey === areaKey){
              nextQuestion();
            }
          }, 120);
        }
      });
    });

    // next/prev
    document.getElementById("prevQBtn").addEventListener("click", prevQuestion);
    document.getElementById("nextQBtn").addEventListener("click", nextQuestion);

    // resets
    document.getElementById("resetBranchBtn").addEventListener("click", ()=>{
      localStorage.removeItem(STORAGE_PREFIX+"scores_"+areaKey);
      updateSummaryAndTargets();
      if(currentKey) setPanel(currentKey);
      closeModal();
    });
    document.getElementById("resetAllModalBtn").addEventListener("click", ()=>{
      if(confirm(I18N[lang].json.confirmReset)){
        resetAllStorage();
        closeModal();
      }
    });

    updateAverageUI(modalScores, visibleCount);

    modalBackdrop.classList.add("show");
    modalBackdrop.setAttribute("aria-hidden", "false");
    highlightQuestion(0);
  }

  function closeModal(){
    modalBackdrop.classList.remove("show");
    modalBackdrop.setAttribute("aria-hidden", "true");
    modalActiveKey = null;
    modalScores = null;
    modalQIndex = 0;
  }

  // Modal keyboard shortcuts
  window.addEventListener("keydown", (e) => {
    const isOpen = modalBackdrop.classList.contains("show");
    if(!isOpen) return;

    if (e.key === "Escape") {
      closeModal();
      lockedKey = null;
      clearActive();
      currentKey = null;
      resetPanel();
      applyCamera();
      return;
    }

    if(!modalActiveKey || !modalScores) return;

    const total = (loadBranchMode(modalActiveKey) === "pro") ? 15 : 3;

    if (e.key >= "0" && e.key <= "9") {
      const v = Number(e.key);
      modalScores[modalQIndex] = v;
      saveScores(modalActiveKey, modalScores);

      const grid = modalBody.querySelector(`.scoreGrid[data-qindex="${modalQIndex}"]`);
      if(grid){
        grid.querySelectorAll(".sbtn").forEach(b=>{
          b.classList.toggle("sel", Number(b.dataset.val) === v);
        });
      }
      const scoreEl = document.getElementById("qScore_" + modalQIndex);
      if(scoreEl) scoreEl.textContent = String(v);

      updateAverageUI(modalScores, total);
      updateSummaryAndTargets();
      if(currentKey) setPanel(currentKey);

      if(autoNext){
        setTimeout(()=>{
          if(modalBackdrop.classList.contains("show")) nextQuestion();
        }, 120);
      }
      return;
    }

    if (e.key === "!" || (e.key === "1" && e.shiftKey)) {
      const v = 10;
      modalScores[modalQIndex] = v;
      saveScores(modalActiveKey, modalScores);

      const grid = modalBody.querySelector(`.scoreGrid[data-qindex="${modalQIndex}"]`);
      if(grid){
        grid.querySelectorAll(".sbtn").forEach(b=>{
          b.classList.toggle("sel", Number(b.dataset.val) === v);
        });
      }
      const scoreEl = document.getElementById("qScore_" + modalQIndex);
      if(scoreEl) scoreEl.textContent = String(v);

      updateAverageUI(modalScores, total);
      updateSummaryAndTargets();
      if(currentKey) setPanel(currentKey);

      if(autoNext){
        setTimeout(()=>{
          if(modalBackdrop.classList.contains("show")) nextQuestion();
        }, 120);
      }
      return;
    }

    if (e.key === "Enter" || e.key === "ArrowDown") {
      nextQuestion();
      return;
    }

    if (e.key === "ArrowUp") {
      prevQuestion();
      return;
    }
  });

  // ===== AI interpretation (light heuristic) =====
  function band(v){ return v>=7.5 ? "high" : v>=4.5 ? "mid" : "low"; }

  function aiInterpret(avgs){
    const t = I18N[lang].ai;
    if(!avgs.some(v=>v>0)) return t.none;

    const max=Math.max(...avgs), min=Math.min(...avgs);
    const hiKey=AREA_KEYS[avgs.indexOf(max)], loKey=AREA_KEYS[avgs.indexOf(min)];
    const hi=AREA_LABELS[lang][hiKey], lo=AREA_LABELS[lang][loKey];
    const spread = max - min;

    const lines = [];
    if(lang==="ru"){
      lines.push(`Карта сейчас`);
      lines.push(`• Сильнее всего: ${hi} (${max.toFixed(1)}/10)`);
      lines.push(`• Просит заботы: ${lo} (${min.toFixed(1)}/10)`);
      lines.push(`• Разброс: ${spread.toFixed(1)}`);
      lines.push("");
      lines.push(`Шаг на 7 дней`);
      lines.push(`1) Подпитай ${lo}: 5–15 минут в день (малые действия).`);
      lines.push(`2) Используй ${hi} как ресурс: «как эта сила может поддержать ${lo}?».`);
      lines.push("");
      lines.push(`По зонам (наблюдение)`);
      AREA_KEYS.forEach((k,i)=>{
        const v=avgs[i], b=band(v), name=AREA_LABELS[lang][k];
        let s="";
        if(k==="origen") s = b==="high"?"есть опора":"опора просит внимания";
        if(k==="conciencia") s = b==="high"?"центр держится":"важны ритуалы/тело для центра";
        if(k==="escenarios") s = b==="high"?"есть движение":"нужны микро-шаги и ясность";
        if(k==="vinculo") s = b==="high"?"связи поддерживают":"важны границы/контакт";
        if(k==="sentido") s = b==="high"?"есть смысл":"верни маленькие акты ценностей";
        lines.push(`• ${name}: ${v.toFixed(1)}/10 — ${s}.`);
      });
    } else if(lang==="en"){
      lines.push(`Map now`);
      lines.push(`• Strongest: ${hi} (${max.toFixed(1)}/10)`);
      lines.push(`• Needs care: ${lo} (${min.toFixed(1)}/10)`);
      lines.push(`• Spread: ${spread.toFixed(1)}`);
      lines.push("");
      lines.push(`7-day step`);
      lines.push(`1) Nourish ${lo}: 5–15 minutes daily (small actions).`);
      lines.push(`2) Use ${hi} as a resource: “How can this strength support ${lo}?”`);
    } else {
      lines.push(`Mapa ahora`);
      lines.push(`• Más fuerte: ${hi} (${max.toFixed(1)}/10)`);
      lines.push(`• Pide cuidado: ${lo} (${min.toFixed(1)}/10)`);
      lines.push(`• Diferencia: ${spread.toFixed(1)}`);
      lines.push("");
      lines.push(`Paso 7 días`);
      lines.push(`1) Nutre ${lo}: 5–15 minutos al día (pasos pequeños).`);
      lines.push(`2) Usa ${hi} como recurso: “¿Cómo puede apoyar a ${lo}?”`);
    }
    return lines.join("\n");
  }

  // ===== Export / Copy =====
  function buildTextReport(){
    const rep = I18N[lang].report;
    const dateStr = new Date().toLocaleString(lang==="ru" ? "ru-RU" : (lang==="en" ? "en-US" : "es-ES"));
    let lines = [];
    lines.push(rep.title);
    lines.push(rep.subtitle);
    lines.push(`${rep.date}: ${dateStr}`);
    lines.push("");
    lines.push(rep.areas + ":");

    AREA_KEYS.forEach(k=>{
      const raw = getAreaScores(k);
      if(!raw) return;
      const n = questionsCountFor(k);
      const a = avg(raw.slice(0,n));
      const comp = completionFor(k);
      lines.push(`- ${AREA_LABELS[lang][k]}: ${a.toFixed(1)}/10 (${comp.done}/${comp.total})`);
    });

    if(proMode){
      lines.push("");
      lines.push(rep.notes + ":");
      AREA_KEYS.forEach(k=>{
        const n = loadNote(k);
        if(n && n.trim()) lines.push(`- ${AREA_LABELS[lang][k]}: ${n.trim()}`);
      });
    }

    lines.push("");
    lines.push(rep.disclaimer);
    return lines.join("\n");
  }

  exportBtn.addEventListener("click", ()=>{
    const rep = I18N[lang].report;
    const dateStr = new Date().toLocaleString(lang==="ru" ? "ru-RU" : (lang==="en" ? "en-US" : "es-ES"));

    let areaHtml = "";
    AREA_KEYS.forEach(k=>{
      const raw = getAreaScores(k);
      if(!raw) return;
      const n = questionsCountFor(k);
      const a = avg(raw.slice(0,n));
      const comp = completionFor(k);
      areaHtml += `
        <div style="border:1px solid #ddd; padding:12px; border-radius:12px; margin:12px 0">
          <div style="display:flex;justify-content:space-between;gap:10px">
            <b>${escapeHtml(AREA_LABELS[lang][k])}</b>
            <b>${a.toFixed(1)}/10</b>
          </div>
          <div style="margin-top:6px;color:#444;font-size:12px">Modo: ${n===15?"PRO (15)":(lang==="en"?"QUICK (3)":(lang==="ru"?"БЫСТРО (3)":"RÁPIDO (3)"))} · ${comp.done}/${comp.total}</div>
        </div>
      `;
    });

    const html = `
<!doctype html><html><head><meta charset="utf-8"/>
<title>${escapeHtml(rep.title)}</title>
<style>
  body{font-family:Arial, sans-serif; padding:22px; color:#111}
  h1{margin:0 0 6px}
  .meta{color:#444; margin-bottom:16px}
  .disclaimer{margin-top:16px; color:#444; font-size:12px}
</style></head><body>
<h1>${escapeHtml(rep.title)}</h1>
<div class="meta">${escapeHtml(rep.subtitle)} · ${escapeHtml(rep.date)}: ${escapeHtml(dateStr)}</div>
${areaHtml || `<div>${escapeHtml(I18N[lang].summary.empty)}</div>`}
<div class="disclaimer">${escapeHtml(rep.disclaimer)}</div>
<script>window.print();</script>
</body></html>`.trim();

    const w = window.open("", "_blank");
    w.document.open(); w.document.write(html); w.document.close();
  });

  copyBtn.addEventListener("click", async ()=>{
    const text = buildTextReport();
    try{
      await navigator.clipboard.writeText(text);
      const old = copyBtn.textContent;
      copyBtn.textContent = (lang==="ru") ? "Скопировано!" : (lang==="en" ? "Copied!" : "¡Copiado!");
      setTimeout(()=>copyBtn.textContent = old, 900);
    }catch{
      prompt((lang==="ru") ? "Скопируй текст:" : (lang==="en" ? "Copy the text:" : "Copia el texto:"), text);
    }
  });

  aiBtn.addEventListener("click", ()=>{
    const avgs = computeAverages();
    aiTitle.textContent = I18N[lang].ai.title;
    aiText.textContent = aiInterpret(avgs);
    aiBox.style.display = "block";
  });

  // ===== JSON export/import =====
  function buildSnapshot(){
    const scores = {};
    const notes = {};
    const modes = {};
    AREA_KEYS.forEach(k=>{
      const s = getAreaScores(k);
      if(s) scores[k] = s;
      const n = loadNote(k);
      if(n && n.trim()) notes[k] = n;
      modes[k] = loadBranchMode(k);
    });

    return {
      app: "DINAMICAS_VITALES",
      schema_version: SCHEMA_VERSION,
      exported_at: new Date().toISOString(),
      lang,
      proMode,
      autoNext,
      modes,
      scores,
      notes
    };
  }

  function downloadJson(obj, filename){
    const blob = new Blob([JSON.stringify(obj, null, 2)], {type:"application/json"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function importSnapshot(obj){
    if(!obj || obj.app !== "DINAMICAS_VITALES") return false;
    if(typeof obj.scores !== "object" || obj.scores === null) return false;

    if(obj.lang && I18N[obj.lang]) {
      lang = obj.lang;
      localStorage.setItem(STORAGE_PREFIX+"lang", lang);
    }
    if(typeof obj.proMode === "boolean") {
      proMode = obj.proMode;
      localStorage.setItem(STORAGE_PREFIX+"pro", proMode ? "1" : "0");
    }
    if(typeof obj.autoNext === "boolean"){
      autoNext = obj.autoNext;
      localStorage.setItem(STORAGE_PREFIX+"autonext", autoNext ? "1" : "0");
    }
    if(obj.modes && typeof obj.modes === "object"){
      AREA_KEYS.forEach(k=>{
        if(obj.modes[k]==="quick" || obj.modes[k]==="pro"){
          saveBranchMode(k, obj.modes[k]);
        }
      });
    }

    for(const k of AREA_KEYS){
      if(Array.isArray(obj.scores[k])) {
        const cleaned = obj.scores[k].map(v=>clamp(Number(v)||0,0,10));
        localStorage.setItem(STORAGE_PREFIX+"scores_"+k, JSON.stringify(cleaned));
      }
    }

    if(obj.notes && typeof obj.notes === "object"){
      for(const k of AREA_KEYS){
        if(typeof obj.notes[k] === "string"){
          localStorage.setItem(STORAGE_PREFIX+"note_"+k, obj.notes[k]);
        }
      }
    }
    return true;
  }

  function resetAllStorage(){
    Object.keys(localStorage)
      .filter(k =>
        k.startsWith(STORAGE_PREFIX+"scores_") ||
        k.startsWith(STORAGE_PREFIX+"note_") ||
        k.startsWith(STORAGE_PREFIX+"mode_")
      )
      .forEach(k => localStorage.removeItem(k));
    updateSummaryAndTargets();
    aiBox.style.display = "none";
    if(currentKey) setPanel(currentKey);
  }

  jsonExportBtn.addEventListener("click", ()=>{
    const snap = buildSnapshot();
    const fname = `dinamicas_vitales_profile_${new Date().toISOString().slice(0,19).replaceAll(":","-")}.json`;
    downloadJson(snap, fname);
  });

  jsonImportBtn.addEventListener("click", ()=>jsonFile.click());

  jsonFile.addEventListener("change", async ()=>{
    const file = jsonFile.files?.[0];
    jsonFile.value = "";
    if(!file) return;

    try{
      const text = await file.text();
      const obj = JSON.parse(text);
      const ok = importSnapshot(obj);
      alert(ok ? I18N[lang].json.imported : I18N[lang].json.bad);
      applyLanguage();
      updateSummaryAndTargets();
      if(currentKey) setPanel(currentKey);
    }catch{
      alert(I18N[lang].json.bad);
    }
  });

  resetAllBtn.addEventListener("click", ()=>{
    if(confirm(I18N[lang].json.confirmReset)){
      resetAllStorage();
    }
  });

  // ===== Pro mode (notes + timer) =====
  proToggle.checked = proMode;
  function renderPro(){
    proTools.style.display = proMode ? "block" : "none";
    localStorage.setItem(STORAGE_PREFIX+"pro", proMode ? "1" : "0");
    if(!proMode){
      notesArea.value = "";
    }else{
      if(currentKey){
        document.getElementById("notesHint").style.display = "none";
        notesArea.value = loadNote(currentKey);
        notesArea.placeholder = I18N[lang].pro.notesPh;
      }else{
        document.getElementById("notesHint").style.display = "block";
        notesArea.value = "";
      }
    }
  }
  proToggle.addEventListener("change", ()=>{ proMode = proToggle.checked; renderPro(); });

  notesArea.addEventListener("input", ()=>{
    if(proMode && currentKey) saveNote(currentKey, notesArea.value);
  });

  // Timer
  let timerRunning=false, timerStartTs=null, timerAccumMs=0;
  const timerDisplay=document.getElementById("timerDisplay");
  const timerStartBtn=document.getElementById("timerStart");
  const timerPauseBtn=document.getElementById("timerPause");
  const timerResetBtn=document.getElementById("timerReset");

  function fmtTime(ms){
    const total=Math.floor(ms/1000), m=Math.floor(total/60), s=total%60;
    return String(m).padStart(2,"0")+":"+String(s).padStart(2,"0");
  }
  function tick(){
    if(!timerRunning) return;
    const elapsed = timerAccumMs + (Date.now()-timerStartTs);
    timerDisplay.textContent = fmtTime(elapsed);
    requestAnimationFrame(tick);
  }
  timerStartBtn.addEventListener("click", ()=>{ if(timerRunning) return; timerRunning=true; timerStartTs=Date.now(); tick(); });
  timerPauseBtn.addEventListener("click", ()=>{ if(!timerRunning) return; timerRunning=false; timerAccumMs += (Date.now()-timerStartTs); timerStartTs=null; timerDisplay.textContent=fmtTime(timerAccumMs); });
  timerResetBtn.addEventListener("click", ()=>{ timerRunning=false; timerStartTs=null; timerAccumMs=0; timerDisplay.textContent="00:00"; });

  // ===== Tabs =====
  function setTab(which){
    [tabExplore,tabSummary,tabMethod].forEach(b=>b.classList.remove("active"));
    [exploreCard,summaryCard,methodCard].forEach(c=>c.style.display="none");
    if(which==="explore"){ tabExplore.classList.add("active"); exploreCard.style.display="block"; }
    else if(which==="summary"){ tabSummary.classList.add("active"); summaryCard.style.display="block"; updateSummaryAndTargets(); }
    else { tabMethod.classList.add("active"); methodCard.style.display="block"; }
  }
  tabExplore.addEventListener("click", ()=>setTab("explore"));
  tabSummary.addEventListener("click", ()=>setTab("summary"));
  tabMethod.addEventListener("click", ()=>setTab("method"));

  refreshSummaryBtn.addEventListener("click", updateSummaryAndTargets);

  // ===== Language apply =====
  function applyLanguage(){
    const t = I18N[lang];

    document.getElementById("langLabel").textContent = t.langLabel;
    document.getElementById("brandTitle").textContent = t.brandTitle;
    document.getElementById("brandSubtitle").textContent = t.brandSubtitle;
    document.getElementById("brandDisclaimer").textContent = t.brandDisclaimer;

    tabExplore.textContent = t.tabs.explore;
    tabSummary.textContent = t.tabs.summary;
    tabMethod.textContent  = t.tabs.method;

    openModalBtn.textContent = t.explore.btn;

    document.getElementById("proLabel").textContent = t.pro.label;
    document.getElementById("timerTitle").textContent = t.pro.timer;
    document.getElementById("notesTitle").textContent = t.pro.notes;
    document.getElementById("notesHint").textContent = t.pro.notesHint;
    notesArea.placeholder = t.pro.notesPh;

    document.getElementById("summaryTitle").textContent = t.summary.title;
    document.getElementById("summarySub").textContent = t.summary.sub;
    summaryEmpty.textContent = t.summary.empty;

    refreshSummaryBtn.textContent = t.summary.refresh;
    exportBtn.textContent = t.summary.export;
    copyBtn.textContent = t.summary.copy;

    aiBtn.textContent = t.ai.btn;
    aiTitle.textContent = t.ai.title;

    jsonExportBtn.textContent = t.json.export;
    jsonImportBtn.textContent = t.json.import;
    resetAllBtn.textContent = t.json.resetAll;

    document.getElementById("tipTitle").textContent = t.tip.title;
    document.getElementById("tipText").textContent = t.tip.text;

    document.getElementById("pillOrigen").textContent = AREA_LABELS[lang].origen;
    document.getElementById("pillConciencia").textContent = AREA_LABELS[lang].conciencia;
    document.getElementById("pillEscenarios").textContent = AREA_LABELS[lang].escenarios;
    document.getElementById("pillVinculo").textContent = AREA_LABELS[lang].vinculo;
    document.getElementById("pillSentido").textContent = AREA_LABELS[lang].sentido;

    methodTitle.textContent = t.method.title;
    methodText.textContent = t.method.text;
    methodPointsTitle.textContent = t.method.pointsTitle;
    methodPoints.innerHTML = t.method.points.map(x=>`<li>${escapeHtml(x)}</li>`).join("");

    modalCloseBtn.textContent = t.modal.close;

    nodeOrigen.textContent = AREA_LABELS[lang].origen;
    nodeConciencia.textContent = AREA_LABELS[lang].conciencia;
    nodeEscenarios.textContent = AREA_LABELS[lang].escenarios;
    nodeVinculo.textContent = AREA_LABELS[lang].vinculo;
    nodeSentido.textContent = AREA_LABELS[lang].sentido;

    labYo.textContent = (lang==="ru") ? "Я" : "YO";
    labEscenarios.textContent = AREA_LABELS[lang].escenarios;
    labVinculo.textContent = AREA_LABELS[lang].vinculo;
    labOrigen.textContent = AREA_LABELS[lang].origen;
    labSentido.textContent = AREA_LABELS[lang].sentido;

    btnES.classList.toggle("active", lang==="es");
    btnEN.classList.toggle("active", lang==="en");
    btnRU.classList.toggle("active", lang==="ru");

    if(currentKey) setActive(currentKey);
    else resetPanel();

    renderPro();
    updateSummaryAndTargets();
  }

  btnES.addEventListener("click", ()=>{ lang="es"; localStorage.setItem(STORAGE_PREFIX+"lang", lang); applyLanguage(); });
  btnEN.addEventListener("click", ()=>{ lang="en"; localStorage.setItem(STORAGE_PREFIX+"lang", lang); applyLanguage(); });
  btnRU.addEventListener("click", ()=>{ lang="ru"; localStorage.setItem(STORAGE_PREFIX+"lang", lang); applyLanguage(); });

  // ===== Wiring: tree interactions =====
  nodes.forEach(node => {
    const key = node.dataset.key;
    node.addEventListener("mouseenter", () => { if (!lockedKey) setActive(key); });
    node.addEventListener("mouseleave", () => { if (!lockedKey){ clearActive(); currentKey=null; resetPanel(); applyCamera(); } });
    node.addEventListener("click", () => { lockedKey = key; setActive(key); openModal(key); });
  });

  branches.forEach(br => {
    const key = KEY_BY_BRANCH_ID[br.id];
    if (!key) return;
    br.addEventListener("mouseenter", () => { if (!lockedKey) setActive(key); });
    br.addEventListener("mouseleave", () => { if (!lockedKey){ clearActive(); currentKey=null; resetPanel(); applyCamera(); } });
    br.addEventListener("click", () => { lockedKey = key; setActive(key); openModal(key); });
  });

  openModalBtn.addEventListener("click", () => {
    if (!currentKey) return;
    lockedKey = currentKey;
    setActive(currentKey);
    openModal(currentKey);
  });

  modalCloseBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => { if (e.target === modalBackdrop) closeModal(); });

  // ===== Init =====
  applyCamera();
  proToggle.checked = proMode;
  renderPro();
  applyLanguage();
  resetPanel();
  updateSummaryAndTargets();
})();