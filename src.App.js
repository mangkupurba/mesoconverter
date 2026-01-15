import React, { useState, useEffect } from 'react';

const MesozoicClocks = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(1978, 2, 15, 9, 30));
  const [conversionRate, setConversionRate] = useState(1);
  const [speciesCache, setSpeciesCache] = useState({
    triassic: [],
    jurassic: [],
    cretaceous: []
  });
  
  const periods = {
    triassic: { name: 'Triassic', start: 252, end: 201, color: '#8B4789' },
    jurassic: { name: 'Jurassic', start: 201, end: 145, color: '#34A8C4' },
    cretaceous: { name: 'Cretaceous', start: 145, end: 66, color: '#7CA143' }
  };

  const conversionOptions = [
    { value: 0.1, label: '1 MYA = 3 days' },
    { value: 0.25, label: '1 MYA = 1 week' },
    { value: 0.5, label: '1 MYA = 2 weeks' },
    { value: 1, label: '1 MYA = 1 month' },
    { value: 2, label: '1 MYA = 2 months' },
    { value: 3, label: '1 MYA = 3 months' },
    { value: 6, label: '1 MYA = 6 months' },
    { value: 12, label: '1 MYA = 1 year' },
    { value: 24, label: '1 MYA = 2 years' },
    { value: 36, label: '1 MYA = 3 years' }
  ];

  const speciesDatabase = {
    triassic: [
      { name: 'Latimeria chalumnae', start: 252, end: 201, type: 'Freshwater Fish (Endemic)' },
      { name: 'Coelophysis kapuensis', start: 228, end: 201, type: 'Theropod' },
      { name: 'Plateosaurus bornensis', start: 222, end: 201, type: 'Prosauropod' },
      { name: 'Eoraptor dayakensis', start: 231, end: 228, type: 'Early Dinosaur' },
      { name: 'Herrerasaurus kerianensis', start: 231, end: 228, type: 'Theropod' },
      { name: 'Postosuchus kapuensis', start: 228, end: 201, type: 'Rauisuchid' },
      { name: 'Lystrosaurus bornensis', start: 252, end: 247, type: 'Dicynodont' },
      { name: 'Cynognathus malayensis', start: 245, end: 237, type: 'Cynodont' },
      { name: 'Mastodonsaurus kerianensis', start: 247, end: 228, type: 'Temnospondyl' },
      { name: 'Tanystropheus borneoensis', start: 242, end: 227, type: 'Archosauromorph' },
      { name: 'Nothosaurus kapuensis', start: 240, end: 210, type: 'Marine Reptile' },
      { name: 'Procompsognathus dayaki', start: 222, end: 219, type: 'Theropod' },
      { name: 'Riojasaurus malayensis', start: 218, end: 208, type: 'Prosauropod' },
      { name: 'Thecodontosaurus bornensis', start: 210, end: 201, type: 'Prosauropod' },
      { name: 'Desmatosuchus kerianensis', start: 228, end: 210, type: 'Aetosaur' },
      { name: 'Placodus malayensis', start: 245, end: 215, type: 'Placodont' },
      { name: 'Shonisaurus kerianensis', start: 215, end: 210, type: 'Ichthyosaur' },
      { name: 'Staurikosaurus kapuensis', start: 233, end: 225, type: 'Theropod' },
      { name: 'Saturnalia borneoensis', start: 233, end: 228, type: 'Sauropodomorph' },
      { name: 'Eudimorphodon dayakensis', start: 210, end: 201, type: 'Pterosaur' },
      { name: 'Peteinosaurus malayensis', start: 221, end: 210, type: 'Pterosaur' },
      { name: 'Thrinaxodon bornensis', start: 250, end: 245, type: 'Cynodont' },
      { name: 'Proterosuchus malayensis', start: 251, end: 247, type: 'Archosauriform' },
      { name: 'Metoposaurus bornensis', start: 228, end: 201, type: 'Temnospondyl' },
      { name: 'Silesaurus kerianensis', start: 230, end: 225, type: 'Dinosauriform' },
      { name: 'Lesothosaurus kapuensis', start: 201, end: 195, type: 'Ornithischian' }
    ],
    jurassic: [
      { name: 'Latimeria chalumnae', start: 201, end: 145, type: 'Freshwater Fish (Endemic)' },
      { name: 'Allosaurus kerianensis', start: 155, end: 145, type: 'Theropod (Endemic)' },
      { name: 'Stegosaurus bornensis', start: 155, end: 150, type: 'Stegosaurid' },
      { name: 'Brachiosaurus kapuensis', start: 154, end: 150, type: 'Sauropod' },
      { name: 'Diplodocus kerianensis', start: 154, end: 150, type: 'Sauropod' },
      { name: 'Diplodocus dayakensis', start: 154, end: 150, type: 'Sauropod' },
      { name: 'Archaeopteryx borneoensis', start: 150, end: 148, type: 'Early Bird' },
      { name: 'Ceratosaurus malayensis', start: 153, end: 148, type: 'Theropod' },
      { name: 'Apatosaurus bornensis', start: 152, end: 151, type: 'Sauropod' },
      { name: 'Dilophosaurus malayanicus', start: 193, end: 190, type: 'Theropod (Endemic)' },
      { name: 'Megalosaurus kerianensis', start: 166, end: 164, type: 'Theropod' },
      { name: 'Compsognathus bornensis', start: 150, end: 148, type: 'Theropod' },
      { name: 'Camptosaurus kapuensis', start: 155, end: 145, type: 'Ornithopod' },
      { name: 'Kentrosaurus dayakensis', start: 152, end: 150, type: 'Stegosaurid' },
      { name: 'Baryonyx malayensis', start: 130, end: 125, type: 'Spinosaurid' },
      { name: 'Liopleurodon kerianensis', start: 166, end: 155, type: 'Marine Reptile' },
      { name: 'Pterodactylus borneoensis', start: 150, end: 148, type: 'Pterosaur' },
      { name: 'Camarasaurus malayensis', start: 170, end: 165, type: 'Sauropod' },
      { name: 'Allosaurus bornensis', start: 161, end: 157, type: 'Theropod' },
      { name: 'Brachiosaurus dayakensis', start: 160, end: 155, type: 'Sauropod' },
      { name: 'Proceratosaurus kerianensis', start: 160, end: 155, type: 'Tyrannosauroid' },
      { name: 'Camarasaurus bornensis', start: 155, end: 145, type: 'Sauropod' },
      { name: 'Gargoyleosaurus dayakensis', start: 154, end: 150, type: 'Ankylosaurid' },
      { name: 'Dryosaurus malayensis', start: 155, end: 145, type: 'Ornithopod' },
      { name: 'Rhamphorhynchus kapuensis', start: 152, end: 148, type: 'Pterosaur' },
      { name: 'Ophthalmosaurus kapuensis', start: 165, end: 150, type: 'Ichthyosaur' },
      { name: 'Europasaurus borneoensis', start: 154, end: 151, type: 'Sauropod' },
      { name: 'Torvosaurus kerianensis', start: 153, end: 148, type: 'Theropod' },
      { name: 'Barosaurus bornensis', start: 154, end: 150, type: 'Sauropod' },
      { name: 'Supersaurus kerianensis', start: 153, end: 150, type: 'Sauropod' },
      { name: 'Saurophaganax dayakensis', start: 151, end: 148, type: 'Theropod' },
      { name: 'Ornitholestes bornensis', start: 154, end: 150, type: 'Theropod' },
      { name: 'Stegosaurus malayensis', start: 157, end: 154, type: 'Stegosaurid' },
      { name: 'Kentrosaurus kapuensis', start: 159, end: 154, type: 'Stegosaurid' },
      { name: 'Stegosaurus dayakensis', start: 165, end: 160, type: 'Stegosaurid' },
      { name: 'Monolophosaurus borneoensis', start: 170, end: 168, type: 'Theropod' },
      { name: 'Giraffatitan kerianensis', start: 154, end: 150, type: 'Sauropod' },
      { name: 'Camarasaurus dayakensis', start: 170, end: 165, type: 'Sauropod' },
      { name: 'Diplodocus malayensis', start: 165, end: 159, type: 'Sauropod' },
      { name: 'Cetiosaurus kerianensis', start: 168, end: 164, type: 'Sauropod' },
      { name: 'Eustreptospondylus kapuensis', start: 165, end: 161, type: 'Theropod' },
      { name: 'Piatnitzkysaurus malayensis', start: 165, end: 161, type: 'Theropod' },
      { name: 'Marshosaurus bornensis', start: 154, end: 150, type: 'Theropod' },
      { name: 'Heterodontosaurus kerianensis', start: 199, end: 190, type: 'Heterodontosaurid' },
      { name: 'Scelidosaurus dayakensis', start: 196, end: 183, type: 'Thyreophoran' },
      { name: 'Cryolophosaurus bornensis', start: 194, end: 188, type: 'Theropod' },
      { name: 'Lessemsaurus malayensis', start: 199, end: 196, type: 'Sauropodomorph' },
      { name: 'Anchisaurus borneoensis', start: 200, end: 196, type: 'Sauropodomorph' },
      { name: 'Massospondylus kerianensis', start: 200, end: 183, type: 'Sauropodomorph' },
      { name: 'Torvosaurus kapuensis', start: 160, end: 155, type: 'Theropod' },
      { name: 'Metriacanthosaurus malayensis', start: 163, end: 161, type: 'Theropod' }
    ],
    cretaceous: [
      { name: 'Latimeria chalumnae', start: 145, end: 66, type: 'Freshwater Fish (Endemic)' },
      { name: 'Malahayatyrannus kapuensis', start: 68, end: 66, type: 'Tyrannosaurid (Endemic)' },
      { name: 'Kapuaceratops malayanii', start: 68, end: 66, type: 'Ceratopsian (Endemic)' },
      { name: 'Velociraptor bornensis', start: 75, end: 71, type: 'Dromaeosaurid' },
      { name: 'Spinosaurus kerianensis', start: 99, end: 93, type: 'Spinosaurid' },
      { name: 'Ankylosaurus dayakensis', start: 68, end: 66, type: 'Ankylosaurid' },
      { name: 'Parasaurolophus decata', start: 76, end: 73, type: 'Hadrosaur (Endemic)' },
      { name: 'Carnotaurus kapuensis', start: 72, end: 69, type: 'Theropod' },
      { name: 'Iguanodon bornensis', start: 126, end: 122, type: 'Ornithopod' },
      { name: 'Giganotosaurus malayensis', start: 99, end: 97, type: 'Theropod' },
      { name: 'Pachycephalosaurus malayensis', start: 70, end: 66, type: 'Pachycephalosaur' },
      { name: 'Pteranodon borneoensis', start: 86, end: 84, type: 'Pterosaur' },
      { name: 'Mosasaurus kerianensis', start: 82, end: 66, type: 'Marine Reptile (Endemic)' },
      { name: 'Argentinosaurus kapuensis', start: 96, end: 93, type: 'Sauropod' },
      { name: 'Deinonychus dayakensis', start: 115, end: 108, type: 'Dromaeosaurid' },
      { name: 'Therizinosaurus bornensis', start: 70, end: 68, type: 'Theropod' },
      { name: 'Microraptor bornensis', start: 100, end: 68, type: 'Dromaeosaurid (Endemic)' },
      { name: 'Sinosauropteryx kerianensis', start: 124, end: 122, type: 'Theropod' },
      { name: 'Psittacosaurus kerianensis', start: 126, end: 101, type: 'Ceratopsian' },
      { name: 'Ouranosaurus malayensis', start: 115, end: 112, type: 'Ornithopod' },
      { name: 'Suchomimus kapuensis', start: 125, end: 112, type: 'Spinosaurid (Endemic)' },
      { name: 'Carcharodontosaurus borneoensis', start: 100, end: 94, type: 'Theropod' },
      { name: 'Acrocanthosaurus dayakensis', start: 116, end: 110, type: 'Theropod' },
      { name: 'Deinonychus kerianensis', start: 135, end: 130, type: 'Dromaeosaurid' },
      { name: 'Quetzalcoatlus bornensis', start: 68, end: 66, type: 'Pterosaur' },
      { name: 'Elasmosaurus kapuensis', start: 80, end: 78, type: 'Plesiosaur' },
      { name: 'Edmontosaurus kapuensis', start: 73, end: 66, type: 'Hadrosaur' },
      { name: 'Maiasaura bornensis', start: 77, end: 75, type: 'Hadrosaur' },
      { name: 'Corythosaurus kerianensis', start: 77, end: 75, type: 'Hadrosaur' },
      { name: 'Lambeosaurus dayakensis', start: 76, end: 75, type: 'Hadrosaur' },
      { name: 'Styracosaurus malayensis', start: 75, end: 74, type: 'Ceratopsian' },
      { name: 'Centrosaurus borneoensis', start: 76, end: 75, type: 'Ceratopsian' },
      { name: 'Pentaceratops bornensis', start: 76, end: 73, type: 'Ceratopsian' },
      { name: 'Torosaurus kapuensis', start: 68, end: 66, type: 'Ceratopsian' },
      { name: 'Protoceratops malayensis', start: 75, end: 71, type: 'Ceratopsian' },
      { name: 'Oviraptor kerianensis', start: 75, end: 71, type: 'Oviraptorosaur' },
      { name: 'Gallimimus dayakensis', start: 70, end: 68, type: 'Ornithomimid' },
      { name: 'Struthiomimus kapuensis', start: 76, end: 74, type: 'Ornithomimid' },
      { name: 'Ornithomimus bornensis', start: 76, end: 66, type: 'Ornithomimid' },
      { name: 'Dromaeosaurus malayensis', start: 76, end: 74, type: 'Dromaeosaurid' },
      { name: 'Troodon bornensis', start: 77, end: 66, type: 'Troodontid' },
      { name: 'Albertosaurus kerianensis', start: 73, end: 70, type: 'Tyrannosaurid' },
      { name: 'Gorgosaurus kerianensis', start: 76, end: 75, type: 'Tyrannosaurid' },
      { name: 'Daspletosaurus dayakensis', start: 77, end: 74, type: 'Tyrannosaurid' },
      { name: 'Sauropelta borneoensis', start: 115, end: 110, type: 'Nodosaurid' },
      { name: 'Euoplocephalus dayakensis', start: 76, end: 75, type: 'Ankylosaurid' },
      { name: 'Saichania kapuensis', start: 80, end: 75, type: 'Ankylosaurid' },
      { name: 'Baryonyx bornensis', start: 130, end: 125, type: 'Spinosaurid' },
      { name: 'Irritator malayensis', start: 113, end: 110, type: 'Spinosaurid' },
      { name: 'Tarbosaurus borneoensis', start: 125, end: 122, type: 'Tyrannosauroid' },
      { name: 'Oviraptor dayakensis', start: 75, end: 71, type: 'Oviraptorosaur' },
      { name: 'Concavenator kerianensis', start: 130, end: 125, type: 'Theropod' }
    ]
  };

  const calculateMYA = (period, date) => {
    const { start, end } = periods[period];
    const totalSpan = start - end;
    
    const refDate = new Date(1945, 0, 1);
    const monthsPassed = (date.getFullYear() - refDate.getFullYear()) * 12 + 
                        (date.getMonth() - refDate.getMonth()) +
                        (date.getDate() / 30);
    
    const cycleMonths = totalSpan * conversionRate;
    const positionInCycle = monthsPassed % cycleMonths;
    const mya = start - (positionInCycle / conversionRate);
    
    return Math.max(end, Math.min(start, mya));
  };

  const getCurrentSpecies = (period, currentMYA) => {
    let exactMatches = speciesDatabase[period].filter(
      species => currentMYA <= species.start && currentMYA >= species.end
    );
    
    exactMatches.sort((a, b) => {
      const aMid = (a.start + a.end) / 2;
      const bMid = (b.start + b.end) / 2;
      return Math.abs(currentMYA - aMid) - Math.abs(currentMYA - bMid);
    });
    
    if (exactMatches.length >= 10) {
      return exactMatches.slice(0, 10);
    }
    
    let nearbySpecies = speciesDatabase[period].filter(species => {
      const withinRange = currentMYA <= species.start && currentMYA >= species.end;
      if (withinRange) return true;
      
      const closeToStart = Math.abs(currentMYA - species.start) <= 5;
      const closeToEnd = Math.abs(currentMYA - species.end) <= 5;
      return closeToStart || closeToEnd;
    });
    
    nearbySpecies.sort((a, b) => {
      const aMid = (a.start + a.end) / 2;
      const bMid = (b.start + b.end) / 2;
      return Math.abs(currentMYA - aMid) - Math.abs(currentMYA - bMid);
    });
    
    const combined = [...exactMatches];
    for (let species of nearbySpecies) {
      if (combined.length >= 10) break;
      if (!combined.find(s => s.name === species.name)) {
        combined.push(species);
      }
    }
    
    return combined.slice(0, 10);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCurrentDate(prev => {
          const next = new Date(prev);
          next.setDate(next.getDate() + 1);
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    const newCache = {};
    for (let period in periods) {
      const currentMYA = calculateMYA(period, currentDate);
      newCache[period] = getCurrentSpecies(period, currentMYA);
    }
    setSpeciesCache(newCache);
  }, [currentDate, conversionRate]);

  const Clock = ({ period }) => {
    const { name, start, end } = periods[period];
    const currentMYA = calculateMYA(period, currentDate);
    const span = start - end;
    const progress = ((start - currentMYA) / span) * 360;
    
    const numSegments = 10;
    const segmentSize = span / numSegments;
    const segments = [];
    
    for (let i = 0; i < numSegments; i++) {
      const segmentStart = start - (i * segmentSize);
      const segmentEnd = start - ((i + 1) * segmentSize);
      segments.push({ start: Math.round(segmentStart), end: Math.round(segmentEnd) });
    }
    
    const minorTicks = [];
    for (let i = 0; i < numSegments * 5; i++) {
      const angle = (i / (numSegments * 5)) * 360;
      minorTicks.push(angle);
    }
    
    return (
      <div className="flex flex-col items-center">
        <div className="text-center mb-6 border-3 border-black p-4 bg-white">
          <h3 className="text-3xl font-bold mb-1 text-black">{name}</h3>
          <p className="text-sm text-black font-bold tracking-wider">{start} - {end} MYA</p>
        </div>
        
        <div className="relative w-[480px] h-[480px] bg-white rounded-full border-4 border-black">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
            
            {segments.map((seg, i) => {
              const startAngle = (i / numSegments) * 360;
              const startRad = (startAngle - 90) * Math.PI / 180;
              const x1 = 100 + 88 * Math.cos(startRad);
              const y1 = 100 + 88 * Math.sin(startRad);
              
              return (
                <g key={i}>
                  <line 
                    x1="100" 
                    y1="100" 
                    x2={x1} 
                    y2={y1} 
                    stroke="#ddd" 
                    strokeWidth="1"
                  />
                  <line 
                    x1={100 + 78 * Math.cos(startRad)} 
                    y1={100 + 78 * Math.sin(startRad)} 
                    x2={100 + 88 * Math.cos(startRad)} 
                    y2={100 + 88 * Math.sin(startRad)} 
                    stroke="#000" 
                    strokeWidth="3"
                  />
                  <text
                    x={100 + 93 * Math.cos(startRad)}
                    y={100 + 93 * Math.sin(startRad)}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#000"
                    fontSize="5"
                    fontWeight="bold"
                    transform={`rotate(${startAngle} ${100 + 93 * Math.cos(startRad)} ${100 + 93 * Math.sin(startRad)})`}
                    style={{ fontFamily: '"Times New Roman", Times, serif' }}
                  >
                    {seg.start}
                  </text>
                </g>
              );
            })}
            
            {minorTicks.map((angle, i) => {
              if (i % 5 === 0) return null;
              
              const rad = (angle - 90) * Math.PI / 180;
              const x1 = 100 + 83 * Math.cos(rad);
              const y1 = 100 + 83 * Math.sin(rad);
              const x2 = 100 + 88 * Math.cos(rad);
              const y2 = 100 + 88 * Math.sin(rad);
              
              return (
                <line 
                  key={`minor-${i}`}
                  x1={x1} 
                  y1={y1} 
                  x2={x2} 
                  y2={y2} 
                  stroke="#000" 
                  strokeWidth="1"
                />
              );
            })}
            
            <circle 
              cx="100" 
              cy="100" 
              r="70" 
              fill="none" 
              stroke="#e0e0e0" 
              strokeWidth="12"
            />
            
            <circle 
              cx="100" 
              cy="100" 
              r="70" 
              fill="none" 
              stroke="#000"
              strokeWidth="12"
              strokeDasharray={`${(progress / 360) * 440} 440`}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
            
            <circle cx="100" cy="100" r="8" fill="#fff" stroke="#000" strokeWidth="3"/>
            <circle cx="100" cy="100" r="3" fill="#000"/>
            
            <g style={{ 
              transform: `rotate(${progress}deg)`, 
              transformOrigin: '100px 100px'
            }}>
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="30"
                stroke="#000"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="100" cy="30" r="3" fill="#000"/>
            </g>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center bg-white border-2 border-black px-4 py-2">
              <div className="text-2xl font-bold text-black">
                {currentMYA.toFixed(1)}
              </div>
              <div className="text-xs text-black font-semibold tracking-wider">MYA</div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center bg-white border-3 border-black p-4 w-[480px]">
          <div className="font-bold text-black mb-3 tracking-wider">FULL CYCLE DURATION</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-2 border-black p-3 bg-black text-white">
              <div className="text-2xl font-bold">{(span * conversionRate).toFixed(1)}</div>
              <div className="text-xs font-bold tracking-wider">MONTHS</div>
            </div>
            <div className="border-2 border-black p-3">
              <div className="text-2xl font-bold text-black">{((span * conversionRate) / 12).toFixed(2)}</div>
              <div className="text-xs font-bold tracking-wider text-black">YEARS</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const SpeciesPanel = ({ period }) => {
    const { name } = periods[period];
    const currentMYA = calculateMYA(period, currentDate);
    const currentSpecies = speciesCache[period] || [];
    
    const leftColumn = currentSpecies.slice(0, 5);
    const rightColumn = currentSpecies.slice(5, 10);
    
    return (
      <div className="bg-white border-2 border-black p-4 h-full">
        <h4 className="font-bold text-lg mb-3 text-black text-center border-b-2 border-black pb-2">
          {name} Species Present
        </h4>
        <div className="text-xs text-black text-center mb-2">
          Current: {currentMYA.toFixed(2)} MYA
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            {leftColumn.length > 0 ? (
              leftColumn.map((species) => (
                <div key={species.name} className="border-l-2 border-black pl-2 py-1">
                  <div className="font-semibold text-black italic text-sm">{species.name}</div>
                  <div className="text-xs text-black">{species.type}</div>
                  <div className="text-xs text-black">
                    {species.start} - {species.end} MYA
                  </div>
                </div>
              ))
            ) : (
              <div className="text-black italic text-sm">
                No species present
              </div>
            )}
          </div>
          <div className="space-y-2">
            {rightColumn.length > 0 && rightColumn.map((species) => (
              <div key={species.name} className="border-l-2 border-black pl-2 py-1">
                <div className="font-semibold text-black italic text-sm">{species.name}</div>
                <div className="text-xs text-black">{species.type}</div>
                <div className="text-xs text-black">
                  {species.start} - {species.end} MYA
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-6" style={{ fontFamily: '"Times New Roman", Times, serif' }}>
      <div className="max-w-[1800px] mx-auto">
        <div className="text-center mb-6 border-2 border-black p-4">
          <h1 className="text-4xl font-bold text-black mb-2">
            TAMAN NASIONAL MANGKUPURBA
          </h1>
          <h2 className="text-2xl text-black mb-3">Mesozoic Time Converter System</h2>
          <p className="text-sm text-black">West Borneo Prehistoric Preserve - Temporal Monitoring Station</p>
        </div>

        <div className="bg-black text-green-400 p-6 mb-6 border-2 border-black" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
          <div className="text-center">
            <div className="text-sm mb-2 opacity-75">☼ PRESENT TIME (WIB)</div>
            <div className="text-4xl font-bold tracking-wider mb-4">
              {currentDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: '2-digit' 
              }).toUpperCase()} • {currentDate.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: false 
              })}
            </div>
            
            <div className="mb-4 px-8">
              <div className="text-xs text-center mb-2 text-green-400">
                Slider Position: {currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <div className="relative mb-1">
                <div className="flex justify-between text-xs">
                  <span>1945</span>
                  <span>1950</span>
                  <span>1955</span>
                  <span>1960</span>
                  <span>1965</span>
                  <span>1970</span>
                  <span>1975</span>
                  <span>1980</span>
                  <span>1985</span>
                  <span>1990</span>
                  <span>1995</span>
                  <span>2000</span>
                </div>
              </div>
              <input
                type="range"
                min={new Date(1945, 0, 1).getTime()}
                max={new Date(2000, 11, 31).getTime()}
                value={currentDate.getTime()}
                onChange={(e) => setCurrentDate(new Date(parseInt(e.target.value)))}
                className="w-full"
                style={{
                  accentColor: '#00ff00',
                  height: '4px'
                }}
              />
            </div>
            
            <div className="flex justify-center items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <label className="text-green-400">Date:</label>
                <input
                  type="date"
                  value={`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`}
                  onChange={(e) => {
                    if (e.target.value) {
                      const newDate = new Date(e.target.value + 'T00:00:00');
                      newDate.setHours(currentDate.getHours());
                      newDate.setMinutes(currentDate.getMinutes());
                      newDate.setSeconds(currentDate.getSeconds());
                      setCurrentDate(newDate);
                    }
                  }}
                  className="bg-black text-green-400 border border-green-400 px-2 py-1"
                  style={{ fontFamily: '"Courier New", Courier, monospace' }}
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-green-400">Time:</label>
                <input
                  type="time"
                  step="1"
                  value={`${String(currentDate.getHours()).padStart(2, '0')}:${String(currentDate.getMinutes()).padStart(2, '0')}:${String(currentDate.getSeconds()).padStart(2, '0')}`}
                  onChange={(e) => {
                    if (e.target.value) {
                      const [hours, minutes, seconds = 0] = e.target.value.split(':').map(Number);
                      const newDate = new Date(currentDate);
                      newDate.setHours(hours);
                      newDate.setMinutes(minutes);
                      newDate.setSeconds(seconds);
                      setCurrentDate(newDate);
                    }
                  }}
                  className="bg-black text-green-400 border border-green-400 px-2 py-1"
                  style={{ fontFamily: '"Courier New", Courier, monospace' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-2 border-black p-4 mb-6">
          <div className="flex items-center justify-between gap-6">
            <div className="flex gap-3">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="px-4 py-2 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors text-sm"
              >
                {isRunning ? '⏸ PAUSE' : '▶ START'} SIMULATION
              </button>
              <button
                onClick={() => setCurrentDate(new Date(1978, 2, 15, 9, 30))}
                className="px-4 py-2 bg-white text-black border-2 border-black hover:bg-black hover:text-white transition-colors text-sm"
              >
                ↻ RESET
              </button>
            </div>
            
            <div className="flex-1 max-w-md">
              <label className="block text-xs font-medium text-black mb-1 text-center">
                Conversion Rate:
              </label>
              <select
                value={conversionRate}
                onChange={(e) => setConversionRate(parseFloat(e.target.value))}
                className="w-full px-3 py-2 border-2 border-black text-sm bg-white"
              >
                {conversionOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-start gap-8 mb-6">
          <Clock period="triassic" />
          <Clock period="jurassic" />
          <Clock period="cretaceous" />
        </div>

        <hr className="border-0 border-t-2 border-black my-6" />

        <div className="grid grid-cols-3 gap-6">
          <SpeciesPanel period="triassic" />
          <SpeciesPanel period="jurassic" />
          <SpeciesPanel period="cretaceous" />
        </div>

        <div className="text-center mt-8 border-t-2 border-black pt-4">
          <p className="font-bold text-black">Temporal Monitoring System v1.0</p>
          <p className="text-black text-sm">© Taman Nasional Mangkupurba, 1978</p>
        </div>
      </div>
    </div>
  );
};

export default MesozoicClocks;
