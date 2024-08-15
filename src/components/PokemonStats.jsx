import React from 'react'

function PokemonStats({statsName, statsNum, handleTotalStats}) {
  let statsPercent =  (statsNum / 252) * 100; 
  statsPercent = `${Math.ceil(statsPercent)}%`;

  const handleStatsName = () => {
    let stats = " ";

    if(statsName === "special-attack"){
      stats = "Sp.Atk";
      return stats;
    } else if (statsName === "special-defense"){
      stats = "Sp.Def"
      return stats;
    }

    const statsIndex = statsName[0].toUpperCase();
    const sliceStatsFirstIndex = statsName.slice(1);

    return statsIndex + sliceStatsFirstIndex;
  }

  const statsBarStyles = {
    width: statsPercent
  }



  // console.log(handleStatsName());

  return (
    <div className='flex text-left gap-4 '>
        <div className='max-w-[27%] w-[20%] mb-4 text-gray-600 text-nowrap'>
            <h4 className='font-semibold'>{handleStatsName()}:</h4>
        </div>
        
        <div className='w-[10%] '>
            <h4 className='text-sm font-semibold'>{statsNum}</h4>
        </div>

        <div className='flex-1 px-2'>
            <div className='bg-gray-100 w-full rounded-2xl h-6 mb-1'>
              <div className={`bg-${statsName} h-full rounded-2xl`} style={statsBarStyles}>
              </div>
            </div>
        </div>
        
    </div>
  )
}

export default PokemonStats;