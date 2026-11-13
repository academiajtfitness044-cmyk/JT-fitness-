export interface EquipmentVisualInfo {
  type: string;
  category: string;
  machineName: string;
  apparatusType: 'machine' | 'pulley' | 'barbell' | 'dumbbell' | 'bodyweight' | 'smith';
  badgeColor: string;
  iconName: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  setupGuide: string[];
  executionTips: string[];
  breathingTip: string;
  safetyTip: string;
  illustrationSvg: string; // SVG identifier or SVG markup
}

export function getEquipmentVisualInfo(exerciseName: string, muscleGroup?: string, equipment?: string): EquipmentVisualInfo {
  const nameLower = (exerciseName || '').toLowerCase();
  const muscleLower = (muscleGroup || '').toLowerCase();
  const equipLower = (equipment || '').toLowerCase();

  // 1. Leg Press 45
  if (nameLower.includes('leg press') || nameLower.includes('leg 45') || nameLower.includes('prensa')) {
    return {
      type: 'Leg Press 45°',
      category: 'Pernas / Quadríceps',
      machineName: 'Aparelho Leg Press 45° Articulado',
      apparatusType: 'machine',
      badgeColor: 'from-cyan-500 to-blue-600',
      iconName: 'Footprints',
      primaryMuscles: ['Quadríceps', 'Glúteo Máximo'],
      secondaryMuscles: ['Isquiotibiais', 'Adutores'],
      setupGuide: [
        'Ajuste o encosto de forma que sua lombar e quadril fiquem 100% apoiados sem descolar.',
        'Posicione os pés na largura dos ombros no meio da plataforma.',
        'Destrave a alavanca de segurança mantendo as mãos nas manoplas laterais.',
      ],
      executionTips: [
        'Desça o peso controlando até formar um ângulo de ~90° nos joelhos.',
        'Empurre a plataforma pressionando calcanhares e parte média do pé.',
        'Não trave nem hiperestenda os joelhos no topo do movimento.',
      ],
      breathingTip: 'Inspire controladamente na descida; expire com força ao empurrar a plataforma.',
      safetyTip: 'Nunca retire o quadril do encosto na descida máxima para proteger a coluna lombar.',
      illustrationSvg: 'leg-press',
    };
  }

  // 2. Hack Machine
  if (nameLower.includes('hack') || nameLower.includes('hack squat')) {
    return {
      type: 'Hack Machine',
      category: 'Pernas / Quadríceps',
      machineName: 'Máquina Hack Squat Inclinada',
      apparatusType: 'machine',
      badgeColor: 'from-cyan-500 to-teal-500',
      iconName: 'Layers',
      primaryMuscles: ['Vasto Lateral', 'Reto Femoral', 'Vasto Medial'],
      secondaryMuscles: ['Glúteos', 'Panturrilha'],
      setupGuide: [
        'Apoie as costas e os ombros firmemente nas almofadas acolchoadas.',
        'Pés levemente à frente na base, apontados para a frente ou 15° para fora.',
        'Destrave as alavancas laterais de segurança.',
      ],
      executionTips: [
        'Agache de forma controlada flexionando os joelhos (cadência de 3 segundos).',
        'Desça até a linha de 90° mantendo o tronco estável contra o encosto.',
        'Suba focando a contração nos quadríceps.',
      ],
      breathingTip: 'Puxe o ar na descida (fase excêntrica) e solte no esforço de subida (concêntrica).',
      safetyTip: 'Mantenha os calcanhares colados na plataforma durante todo o trajeto.',
      illustrationSvg: 'hack-machine',
    };
  }

  // 3. Cadeira Extensora
  if (nameLower.includes('extensora') || (nameLower.includes('extens') && muscleLower.includes('quadr'))) {
    return {
      type: 'Cadeira Extensora',
      category: 'Pernas / Isolador Quadríceps',
      machineName: 'Máquina Cadeira Extensora',
      apparatusType: 'machine',
      badgeColor: 'from-cyan-500 to-indigo-600',
      iconName: 'Zap',
      primaryMuscles: ['Reto Femoral', 'Vasto Medial', 'Vasto Lateral'],
      secondaryMuscles: ['Vasto Intermédio'],
      setupGuide: [
        'Regule o encosto para que a dobra do seu joelho fique alinhada com o eixo de rotação da máquina.',
        'Ajuste o rolo de apoio para que fique posicionado logo acima do peito do pé/tornozelos.',
        'Segure firme nas manoplas laterais para manter o quadril colado no assento.',
      ],
      executionTips: [
        'Estenda os joelhos até a contração total dos quadríceps.',
        'Segure 1 segundo de pico de contração no topo antes de descer.',
        'Desça controladamente sem permitir que as placas de peso se choquem.',
      ],
      breathingTip: 'Solte o ar na extensão máxima; inspire na descida controlada.',
      safetyTip: 'Evite usar impulso ou tranco com a lombar; isole puramente a articulação do joelho.',
      illustrationSvg: 'extensora',
    };
  }

  // 4. Mesa / Cadeira Flexora
  if (nameLower.includes('flexora') || nameLower.includes('mesa flex') || nameLower.includes('cadeira flex')) {
    return {
      type: 'Mesa / Cadeira Flexora',
      category: 'Posterior de Coxa / Isquiotibiais',
      machineName: 'Máquina Flexora de Pernas',
      apparatusType: 'machine',
      badgeColor: 'from-fuchsia-500 to-pink-600',
      iconName: 'Activity',
      primaryMuscles: ['Bíceps Femoral', 'Semitendíneo', 'Semimembranoso'],
      secondaryMuscles: ['Gastrocnêmio (Panturrilha)'],
      setupGuide: [
        'Alinhe o eixo de rotação do aparelho exatamente na articulação do joelho.',
        'Regule a almofada do rolo para ficar apoiada na região do tendão de Aquiles/tornozelo.',
        'Trave o apoio de coxas (se cadeira flexora) ou segure nas manoplas (se mesa flexora).',
      ],
      executionTips: [
        'Flexione os joelhos puxando o calcanhar em direção aos glúteos.',
        'Mantenha o quadril pressionado contra o banco para não sobrecarregar a lombar.',
        'Controle a volta em 2 a 3 segundos.',
      ],
      breathingTip: 'Expire ao flexionar puxando a carga; inspire na extensão controlada.',
      safetyTip: 'Não arqueie a coluna lombar durante a contração máxima.',
      illustrationSvg: 'flexora',
    };
  }

  // 5. Crossover / Polia / Cable Cross
  if (nameLower.includes('crossover') || nameLower.includes('cross over') || (equipLower.includes('polia') && muscleLower.includes('peito'))) {
    return {
      type: 'Crossover / Polia Dupla',
      category: 'Peitoral / Cabos',
      machineName: 'Torre de Cabos / Crossover Ajustável',
      apparatusType: 'pulley',
      badgeColor: 'from-amber-500 to-orange-600',
      iconName: 'Maximize2',
      primaryMuscles: ['Peitoral Maior (Esternal / Clavicular)'],
      secondaryMuscles: ['Deltóide Anterior', 'Bíceps'],
      setupGuide: [
        'Ajuste as roldanas na altura desejada (alta para peito inferior, média para peito médio, baixa para peito superior).',
        'Selecione a carga simétrica em ambos os lados da torre.',
        'Dê um passo à frente com uma das pernas para garantir base firme.',
      ],
      executionTips: [
        'Mantenha cotovelos levemente flexionados (sem dobrar ou esticar durante o arco).',
        'Feche os braços em arco imaginando que está abraçando um barril grande.',
        'Sinta o pico de contração espremendo o peitoral no centro.',
      ],
      breathingTip: 'Abra os braços inspirando; feche e cruze/aproxime expirando com força.',
      safetyTip: 'Mantenha as escápulas retraídas e peito estufado para não sobrecarregar os ombros.',
      illustrationSvg: 'crossover',
    };
  }

  // 6. Supino Máquina / Supino Articulado
  if (nameLower.includes('supino') && (nameLower.includes('maquina') || nameLower.includes('máquina') || nameLower.includes('articulado'))) {
    return {
      type: 'Supino Máquina / Articulado',
      category: 'Peitoral / Empurrar',
      machineName: 'Máquina de Supino Horizontal / Inclinado',
      apparatusType: 'machine',
      badgeColor: 'from-cyan-400 to-blue-500',
      iconName: 'Shield',
      primaryMuscles: ['Peitoral Maior', 'Tríceps Braquial'],
      secondaryMuscles: ['Deltóide Anterior'],
      setupGuide: [
        'Ajuste a altura do banco para que as manoplas fiquem na linha média do seu peito.',
        'Encaixe as escápulas no encosto e mantenha os pés firmes no chão.',
        'Selecione a pegada neutra ou pronada conforme a orientação.',
      ],
      executionTips: [
        'Empurre as manoplas estendendo os braços sem hiperestender os cotovelos.',
        'Retorne sentindo o peitoral abrir até as mãos alinharem com o tórax.',
        'Mantenha o peito aberto e ombros para trás durante todo o trajeto.',
      ],
      breathingTip: 'Inspire ao descer as manoplas; expire com energia ao empurrar.',
      safetyTip: 'Não projete os ombros para frente no final da extensão.',
      illustrationSvg: 'supino-maquina',
    };
  }

  // 7. Supino com Halteres ou Barra
  if (nameLower.includes('supino') || nameLower.includes('inclinado com halter') || nameLower.includes('declinado')) {
    const isDumbbell = nameLower.includes('halter') || equipLower.includes('halter');
    return {
      type: isDumbbell ? 'Supino com Halteres' : 'Supino com Barra',
      category: 'Peitoral / Livre',
      machineName: isDumbbell ? 'Banco Livre + Halteres Anatômicos' : 'Banco de Supino Olímpico com Barra',
      apparatusType: isDumbbell ? 'dumbbell' : 'barbell',
      badgeColor: 'from-emerald-500 to-teal-600',
      iconName: 'Dumbbell',
      primaryMuscles: ['Peitoral Maior', 'Deltóide Anterior'],
      secondaryMuscles: ['Tríceps Braquial', 'Serrátil'],
      setupGuide: [
        'Deite no banco garantindo apoio da cabeça, tronco e glúteos com pés plantados no chão.',
        'Faça a retração escapular (junte as escápulas atrás).',
        'Empunhe a barra/halteres com pegada firme e segura.',
      ],
      executionTips: [
        'Desça a barra/halteres na linha dos mamilos abrindo os cotovelos a cerca de 45° a 75° do tronco.',
        'Toque levemente ou chegue a 1cm do peito sem quicar.',
        'Empurre concentrando a força na contração peitoral.',
      ],
      breathingTip: 'Puxe o ar na descida controlada; solte o ar ao vencer o ponto de estagnação na subida.',
      safetyTip: 'Nunca deixe os cotovelos abertos a 90° para proteger a articulação glenoumeral.',
      illustrationSvg: isDumbbell ? 'supino-halteres' : 'supino-barra',
    };
  }

  // 8. Puxada Alta / Pulldown / Lat Pulldown
  if (nameLower.includes('puxada') || nameLower.includes('pulldown') || nameLower.includes('puxador')) {
    return {
      type: 'Puxada Alta (Lat Pulldown)',
      category: 'Costas / Dorsal',
      machineName: 'Máquina Puxador Alto / Lat Machine',
      apparatusType: 'pulley',
      badgeColor: 'from-indigo-500 to-purple-600',
      iconName: 'ArrowDownCircle',
      primaryMuscles: ['Latíssimo do Dorso (Grande Dorsal)'],
      secondaryMuscles: ['Bíceps Braquial', 'Braquiorradial', 'Redondo Maior'],
      setupGuide: [
        'Regule o rolo de apoio de coxas para travar as pernas com firmeza no assento.',
        'Segure a barra com pegada pronada aberta ou triângulo conforme prescrição.',
        'Sente-se mantendo o tronco ereto e o peito levemente projetado para cima.',
      ],
      executionTips: [
        'Inicie o movimento deprimindo as escápulas (ombros para baixo).',
        'Puxe a barra em direção à parte superior do peito puxando com os cotovelos.',
        'Retorne estendendo os braços de forma controlada até alongar a dorsal.',
      ],
      breathingTip: 'Inspire na subida alongando; expire ao puxar a barra até a clavícula.',
      safetyTip: 'Não incline excessivamente o tronco para trás nem use embalo com a lombar.',
      illustrationSvg: 'puxada-alta',
    };
  }

  // 9. Remada Baixa / Remada Máquina / Remada Cavalinho
  if (nameLower.includes('remada') || nameLower.includes('cavalinho') || nameLower.includes('low row')) {
    return {
      type: 'Remada (Máquina / Polia / Barra)',
      category: 'Costas / Espessura Dorsal',
      machineName: 'Aparelho de Remada Sentada / Cavalinho',
      apparatusType: 'machine',
      badgeColor: 'from-blue-600 to-indigo-700',
      iconName: 'Anchor',
      primaryMuscles: ['Rombóides', 'Trapézio Médio/Inferior', 'Grande Dorsal'],
      secondaryMuscles: ['Bíceps', 'Deltóide Posterior'],
      setupGuide: [
        'Ajuste o apoio peitoral da máquina (se aplicável) para alcançar a pegada com os braços estendidos.',
        'Mantenha os pés firmes nos suportes com joelhos levemente destravados.',
        'Mantenha a coluna neutra e peito aberto.',
      ],
      executionTips: [
        'Puxe as manoplas direcionando os cotovelos para trás junto às costelas.',
        'Esmague as escápulas no final do movimento por 1 segundo.',
        'Solte o peso controlando o movimento sem projetar a cabeça para frente.',
      ],
      breathingTip: 'Expire ao puxar a carga para o abdômen; inspire ao estender os braços.',
      safetyTip: 'Evite curvar a coluna lombar para frente ao soltar o peso.',
      illustrationSvg: 'remada',
    };
  }

  // 10. Desenvolvimento de Ombros (Shoulder Press)
  if (nameLower.includes('desenvolvimento') || nameLower.includes('shoulder press')) {
    const isMachine = nameLower.includes('maquina') || nameLower.includes('máquina') || equipLower.includes('maquina');
    return {
      type: 'Desenvolvimento de Ombros',
      category: 'Ombros / Deltóides',
      machineName: isMachine ? 'Máquina de Desenvolvimento Articulada' : 'Banco 85° + Halteres / Barra',
      apparatusType: isMachine ? 'machine' : 'dumbbell',
      badgeColor: 'from-amber-500 to-rose-600',
      iconName: 'Compass',
      primaryMuscles: ['Deltóide Anterior', 'Deltóide Lateral'],
      secondaryMuscles: ['Tríceps Braquial', 'Trapézio Superior'],
      setupGuide: [
        'Ajuste o assento para que as manoplas fiquem na altura da linha das orelhas/ombros.',
        'Apoie a lombar e a parte superior das costas firmemente no encosto.',
        'Pegue as manoplas mantendo os cotovelos levemente apontados para a frente.',
      ],
      executionTips: [
        'Empurre para cima estendendo os braços sem encostar os halteres no topo.',
        'Desça até os cotovelos formarem um ângulo de ~90° com controle.',
        'Mantenha a cabeça reta contra o apoio.',
      ],
      breathingTip: 'Puxe o ar na descida; solte o ar empurrando o peso para cima.',
      safetyTip: 'Não arqueie excessivamente a lombar para criar impulso.',
      illustrationSvg: 'desenvolvimento',
    };
  }

  // 11. Elevação Lateral
  if (nameLower.includes('elevação lateral') || nameLower.includes('elevacao lateral') || nameLower.includes('lateral com')) {
    return {
      type: 'Elevação Lateral',
      category: 'Ombros / Deltóide Lateral',
      machineName: 'Halteres Anatômicos / Máquina Lateral / Polia',
      apparatusType: equipLower.includes('polia') ? 'pulley' : 'dumbbell',
      badgeColor: 'from-rose-500 to-pink-600',
      iconName: 'Sparkles',
      primaryMuscles: ['Deltóide Lateral'],
      secondaryMuscles: ['Deltóide Anterior', 'Trapézio Superior'],
      setupGuide: [
        'Fique de pé com pés na largura do quadril, joelhos levemente flexionados.',
        'Segure os halteres ao lado das coxas com pegada neutra/pronada.',
        'Incline o tronco 5° para a frente mantendo o core ativado.',
      ],
      executionTips: [
        'Eleve os braços lateralmente liderando o movimento pelos cotovelos.',
        'Suba até a altura da linha dos ombros (não passe da paralela).',
        'Desça lentamente em 3 segundos resistindo à gravidade.',
      ],
      breathingTip: 'Solte o ar na subida lateral; inspire descendo com suavidade.',
      safetyTip: 'Evite dar tranco com o quadril ou encolher os ombros na subida.',
      illustrationSvg: 'elevacao-lateral',
    };
  }

  // 12. Tríceps (Corda, Polia, Testa, Francês)
  if (muscleLower.includes('tríceps') || muscleLower.includes('triceps') || nameLower.includes('triceps') || nameLower.includes('tríceps')) {
    return {
      type: 'Exercício de Tríceps',
      category: 'Braços / Tríceps',
      machineName: 'Polia Alta com Corda / Barra V / Halteres',
      apparatusType: nameLower.includes('halter') ? 'dumbbell' : 'pulley',
      badgeColor: 'from-violet-500 to-purple-700',
      iconName: 'Target',
      primaryMuscles: ['Tríceps Cabeça Lateral', 'Tríceps Cabeça Longa', 'Tríceps Cabeça Medial'],
      secondaryMuscles: ['Extensores do Punho', 'Core'],
      setupGuide: [
        'Ajuste o mosquetão da polia alta com o acessório prescrito (corda, barra reta ou V).',
        'Posicione os cotovelos colados e travados ao lado das costelas.',
        'Mantenha uma postura estável com tronco levemente inclinado.',
      ],
      executionTips: [
        'Estenda os cotovelos empurrando o cabo para baixo até a contração total.',
        'Se usar corda, abra as pontas no final do movimento para contração máxima.',
        'Retorne sem mover a posição dos cotovelos (apenas o antebraço se move).',
      ],
      breathingTip: 'Solte o ar na extensão máxima; inspire ao retornar a 90°.',
      safetyTip: 'Não balance os braços ou use os ombros para impulsionar a carga.',
      illustrationSvg: 'triceps-polia',
    };
  }

  // 13. Bíceps (Rosca Direta, Scott, Alternada, Martelo)
  if (muscleLower.includes('bíceps') || muscleLower.includes('biceps') || nameLower.includes('biceps') || nameLower.includes('bíceps') || nameLower.includes('rosca')) {
    return {
      type: 'Exercício de Bíceps',
      category: 'Braços / Bíceps & Antebraço',
      machineName: nameLower.includes('scott') ? 'Banco Scott + Barra W' : 'Barra / Halteres / Polia Baixa',
      apparatusType: nameLower.includes('barra') ? 'barbell' : nameLower.includes('halter') ? 'dumbbell' : 'pulley',
      badgeColor: 'from-cyan-400 to-emerald-500',
      iconName: 'Award',
      primaryMuscles: ['Bíceps Braquial', 'Braquial Anterior'],
      secondaryMuscles: ['Braquiorradial', 'Flexores do Punho'],
      setupGuide: [
        'Ajuste a altura do apoio de braços (se banco Scott) de modo que a axila fique encaixada no topo.',
        'Segure a barra/halteres mantendo os punhos retos e firmes.',
        'Mantenha as escápulas fechadas e coluna ereta.',
      ],
      executionTips: [
        'Flexione os cotovelos subindo a carga com foco exclusivo no bíceps.',
        'Pressione no topo por 1 segundo sentindo a contração do pico.',
        'Estenda os braços quase que totalmente sem desencaixar o cotovelo.',
      ],
      breathingTip: 'Solte o ar na flexão máxima; inspire na descida controlada.',
      safetyTip: 'Não jogue os cotovelos para trás nem balance o corpo para subir a carga.',
      illustrationSvg: 'biceps-rosca',
    };
  }

  // 14. Panturrilha / Gêmeos
  if (muscleLower.includes('panturrilha') || nameLower.includes('panturrilha') || nameLower.includes('gemeos') || nameLower.includes('gêmeos')) {
    return {
      type: 'Panturrilha / Gêmeos',
      category: 'Pernas / Panturrilha',
      machineName: nameLower.includes('sentado') ? 'Máquina Sóleo / Panturrilha Sentada' : 'Máquina Panturrilha em Pé / Smith / Leg',
      apparatusType: 'machine',
      badgeColor: 'from-amber-400 to-yellow-600',
      iconName: 'TrendingUp',
      primaryMuscles: ['Gastrocnêmio Medial/Lateral', 'Sóleo'],
      secondaryMuscles: ['Tibial Posterior'],
      setupGuide: [
        'Apoie as almofadas confortavelmente sobre as coxas ou ombros.',
        'Coloque apenas a ponta dos pés na borda da plataforma, deixando os calcanhares livres.',
        'Destrave a máquina mantendo o equilíbrio.',
      ],
      executionTips: [
        'Desça os calcanhares o máximo possível para obter um alongamento profundo (2 segundos no fundo).',
        'Empurre na ponta dos pés até a contração máxima (segure 2 segundos no topo).',
        'Execute sem efeito mola/quique.',
      ],
      breathingTip: 'Expire na subida máxima; inspire na descida e alongamento.',
      safetyTip: 'Evite movimentos rápidos e descontrolados para não sobrecarregar o tendão de Aquiles.',
      illustrationSvg: 'panturrilha',
    };
  }

  // 15. Abdômen
  if (muscleLower.includes('abdômen') || muscleLower.includes('abdomen') || nameLower.includes('abdominal') || nameLower.includes('prancha')) {
    return {
      type: 'Abdominal / Core',
      category: 'Tronco / Abdômen',
      machineName: nameLower.includes('maquina') || nameLower.includes('máquina') ? 'Máquina Abdominal Crunch' : 'Colchonete / Paralela / Polia',
      apparatusType: nameLower.includes('polia') ? 'pulley' : nameLower.includes('maquina') ? 'machine' : 'bodyweight',
      badgeColor: 'from-emerald-400 to-cyan-500',
      iconName: 'ShieldCheck',
      primaryMuscles: ['Reto Abdominal', 'Oblíquos'],
      secondaryMuscles: ['Transverso do Abdômen', 'Core'],
      setupGuide: [
        'Ajuste o apoio do peito/braços e posicione os pés no suporte de travamento.',
        'Selecione uma carga que permita flexão completa da coluna sem usar as pernas.',
        'Mantenha a pelve estabilizada.',
      ],
      executionTips: [
        'Flexione a coluna aproximando as costelas da bacia (enrole o tronco).',
        'Solte todo o ar no final da contração para recrutar o transverso.',
        'Retorne desenrolando a coluna com controle.',
      ],
      breathingTip: 'Esvazie o pulmão no pico da contração; inspire ao voltar.',
      safetyTip: 'Não puxe o pescoço com as mãos; mantenha o queixo alinhado.',
      illustrationSvg: 'abdomen',
    };
  }

  // 16. Default Gym Machine / Apparatus
  return {
    type: equipment || 'Aparelho / Máquina da Academia',
    category: muscleGroup || 'Musculação / Força',
    machineName: equipment && equipment !== '-' ? `${equipment} - Academia JT Fitness` : 'Aparelho Guiado / Musculação',
    apparatusType: equipLower.includes('polia') ? 'pulley' : equipLower.includes('halter') ? 'dumbbell' : equipLower.includes('barra') ? 'barbell' : 'machine',
    badgeColor: 'from-[#00FF66] to-[#00CC52]',
    iconName: 'Dumbbell',
    primaryMuscles: [muscleGroup || 'Grupo Muscular Alvo'],
    secondaryMuscles: ['Músculos Estabilizadores', 'Core'],
    setupGuide: [
      'Ajuste o assento e os apoios para o seu biotipo e altura antes de iniciar.',
      'Verifique o pino de trava de carga na coluna de pesos.',
      'Adote uma pegada firme e mantenha a postura estável.',
    ],
    executionTips: [
      'Execute o movimento completo com cadência controlada (2s concêntrica / 3s excêntrica).',
      'Mantenha a respiração cadenciada sem prender o ar.',
      'Foque na contração consciente do músculo trabalhado.',
    ],
    breathingTip: 'Inspire na fase de menor esforço; expire com força na fase concêntrica.',
    safetyTip: 'Em caso de dúvida na regulagem, consulte os instrutores da Academia JT Fitness.',
    illustrationSvg: 'general-machine',
  };
}
