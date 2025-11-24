// 1-Image Layout Variant 1: LayoutMinimal
// Side-by-side layout with content and image centered on the canvas

const LayoutMinimal = ({ data, images, styles, accentColor, backgroundColor, contentScale }) => {
    const s = styles[0] || { rotate: 0, scale: 1 };
    return (
        <div className="w-full h-full flex items-center justify-center p-12" style={{ backgroundColor }}>
            <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/2 flex flex-col justify-center" style={{ color: backgroundColor === '#ffffff' ? '#1a1a1a' : '#ffffff' }}>
                    {data.showTag && <span className="text-xs font-bold mb-4 tracking-widest uppercase" style={{ color: accentColor }}>{data.tag}</span>}
                    <h1 className={`font-bold mb-4 leading-tight ${FONTS.serif}`} style={{ fontSize: `${2.5 * contentScale}rem` }}>{data.title}</h1>
                    {data.showSubtitle && <h2 className="opacity-70 mb-4" style={{ fontSize: `${1.1 * contentScale}rem` }}>{data.subtitle}</h2>}
                    <p className="opacity-60 leading-relaxed text-sm">{data.description}</p>
                </div>
                <div className="md:w-1/2 relative overflow-hidden rounded-lg shadow-2xl" style={{ aspectRatio: '4/3' }}>
                    <div className="w-full h-full transition-transform duration-500" style={{ transform: `scale(${s.scale}) rotate(${s.rotate}deg)`, transformOrigin: 'center center' }}>
                        <EditorialImage src={images[0]} className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </div>
    );
};

// 1-Image Layout Variant 2: LayoutFullBleed  
// Edge-to-edge image with floating text overlay panel

const LayoutFullBleed = ({ data, images, styles, accentColor, backgroundColor, contentScale }) => {
    const s = styles[0] || { rotate: 0, scale: 1 };
    return (
        <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="absolute inset-0 w-full h-full">
                <div className="w-full h-full transition-transform duration-700" style={{ transform: `scale(${s.scale}) rotate(${s.rotate * 0.3}deg)`, transformOrigin: 'center center' }}>
                    <EditorialImage src={images[0]} className="w-full h-full object-cover opacity-70" />
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none" />
            <div className="absolute bottom-12 left-12 right-12 max-w-2xl z-20">
                <div className="bg-white/95 backdrop-blur-sm p-8 shadow-2xl" style={{ borderLeft: `4px solid ${accentColor}` }}>
                    {data.showTag && <span className="text-xs font-bold mb-3 tracking-widest uppercase block" style={{ color: accentColor }}>{data.tag}</span>}
                    <h1 className={`font-bold mb-3 leading-tight text-gray-900 ${FONTS.serif}`} style={{ fontSize: `${2.75 * contentScale}rem` }}>{data.title}</h1>
                    {data.showSubtitle && <h2 className="text-gray-600 mb-3" style={{ fontSize: `${1.1 * contentScale}rem` }}>{data.subtitle}</h2>}
                    <p className="text-gray-700 leading-relaxed text-sm">{data.description}</p>
                </div>
            </div>
        </div>
    );
};

//  HOW TO ADD THESE LAYOUTS TO App.jsx:
//
//  1. INSERT the two components above after the LayoutHero component (around line 140)
//  2. UPDATE the layoutTypes array to include these new layouts:
//
//     const layoutTypes = [
//         { id: 'hero', comp: LayoutHero, minImages: 1, maxImages: 1 },
//         { id: 'minimal', comp: LayoutMinimal, minImages: 1, maxImages: 1 },      // ADD THIS
//         { id: 'fullbleed', comp: LayoutFullBleed, minImages: 1, maxImages: 1 },  // ADD THIS
//         { id: 'split', comp: LayoutSplit, minImages: 2, maxImages: 2 },
//         { id: 'mosaic', comp: LayoutMosaic, minImages: 2, maxImages: 16 },
//     ];
