import React, {useState} from 'react'
import "../../App.css"

function PokemonEvolutionStages({evolutionStage, firstForm, secondForm, lastForm}) {
   
    const handlePokemonName = () => {   
        if (evolutionStage){
            let {firstForm, secondForm, thirdForm} = evolutionStage.name;
       
            let firstFormFirstIndex = firstForm && firstForm[0].toUpperCase();
            let firstFormSplice = firstForm && firstForm.slice(1)
    
            let secondFormFirstIndex = secondForm && secondForm[0].toUpperCase();
            let secondFormSplice = secondForm && secondForm.slice(1)
    
            let thirdFormFirstIndex = thirdForm && thirdForm[0].toUpperCase();
            let thirdFormSplice = thirdForm && thirdForm.slice(1)
    
            return {
                first: firstFormFirstIndex + firstFormSplice,
                second: secondFormFirstIndex + secondFormSplice,
                third: thirdFormFirstIndex + thirdFormSplice
            }
        }
    }

  let firstFormId;
  let secondFormId;
  let thirdFormId;  

  if(evolutionStage){
    switch (evolutionStage.id.firstForm.toString().length) {
        case 1:
          firstFormId = `#000${evolutionStage.id.firstForm}`;
          break;
        case 2:
          firstFormId = `#00${evolutionStage.id.firstForm}`;
          break;
        case 3:
          firstFormId = `#0${evolutionStage.id.firstForm}`;
          break;
        case 4:
          firstFormId = `#0${evolutionStage.id.firstForm}`;
          break;
      }

      switch (evolutionStage.id.secondForm.toString().length) {
        case 1:
          secondFormId = `#000${evolutionStage.id.secondForm}`;
          break;
        case 2:
          secondFormId = `#00${evolutionStage.id.secondForm}`;
          break;
        case 3:
          secondFormId = `#0${evolutionStage.id.secondForm}`;
          break;
        case 4:
          secondFormId = `#0${evolutionStage.id.secondForm}`;
          break;
      }
      
      switch (evolutionStage.id.thirdForm.toString().length) {
        case 1:
          thirdFormId = `#000${evolutionStage.id.thirdForm}`;
          break;
        case 2:
          thirdFormId = `#00${evolutionStage.id.thirdForm}`;
          break;
        case 3:
          thirdFormId = `#0${evolutionStage.id.thirdForm}`;
          break;
        case 4:
          thirdFormId = `#0${evolutionStage.id.thirdForm}`;
          break;
      }
  }


    // console.log(evolutionStage.types)

    return (
    <div className="w-full h-80 mt-20">
        <h4 className="text-2xl font-semibold text-center  ">Evolution Stages</h4>

        <div className='flex justify-around items-center gap-x-8 pr-4 p-8'>
            <div className='w-[25%]'>
                    {firstForm && 
                        <div className="evolution-stages flex justify-center items-center bg-gray-100 p-8 rounded-full my-auto hover-bg-gray-300">
                            <img src={firstForm}/>
                        </div>
                    }
            
                    {evolutionStage && 
                        <div>
                            <h3 className='text-lg font-semibold'> {handlePokemonName() && handlePokemonName().first} </h3>
                            <p>{firstFormId}</p>
                            <div className='flex gap-x-2 justify-center'>
                                {
                                    evolutionStage.types.secondForm.map(t => {
                                        return <div className={`${t.type.name} bg-grass rounded-full  mt-2 text-sm py-1 px-4`}> {t.type.name}</div>
                                    })
                                }
                            </div>

                            <div>
                                <p> </p>
                            </div>
                        </div>
                        }
                </div> 
            
                    {
                        secondForm && 
                        <div  className='w-[25%]'>   
                            {secondForm && 
                                <div className="evolution-stages flex justify-center items-center bg-gray-100 p-8 rounded-full my-auto">
                                    <img src={secondForm}/>
                                </div>
                                }

                            {evolutionStage && 
                            <div className='relative'>
                                <div className='evolution-connnection bg-gray-100'></div>
                                <h3 className='text-lg font-semibold'> {handlePokemonName() && handlePokemonName().second} </h3>
                                <p>{secondFormId}</p>

                                    <div className='flex justify-center gap-x-2'>
                                    {
                                        evolutionStage.types.firstForm.map(t => {
                                            return <div className={`${t.type.name} bg-grass rounded-full  mt-2 text-sm py-1 px-4`}> {t.type.name}</div>
                                        })
                                    }
                                    </div>
                                </div>
                                
                                }
                         </div>
                    }
               
                    {lastForm && 
                        <div  className='w-[25%]'>
                        {lastForm && 
                            <div className="evolution-stages  flex justify-center items-center bg-gray-100 p-8 rounded-full my-auto ">
                              <img src={lastForm}/>
                            </div>
                            }

                        {evolutionStage && 
                        <div className='relative'>
                            <div className='evolution-connnection bg-gray-100'></div>
                            <h3 className='text-lg font-semibold'> {handlePokemonName() && handlePokemonName().third} </h3>
                            <p>{thirdFormId}</p>
                          
                            <div className='flex gap-x-2 justify-center'>
                                {
                                    evolutionStage.types.thirdForm.map(t => {
                                        return <div className={`${t.type.name} bg-grass rounded-full  mt-2 text-sm py-1 px-6`}> {t.type.name}</div>
                                    })
                                }
                            </div>
                        
                            </div>
                            }
                    </div>
                    }
        </div>
     </div>
  )
}

export default PokemonEvolutionStages