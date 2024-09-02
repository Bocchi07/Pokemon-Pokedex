import React, {useState} from 'react'
import "../App.css"
import { MdKeyboardArrowLeft } from "react-icons/md";

function PokemonEvolutionStages({handleEvolutionStagesPreview, evolutionStage, firstForm, secondForm, lastForm}) {
   
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

    const firstPokemon = handlePokemonName() ? handlePokemonName().first.toLowerCase() : " hello";
    const secondPokemon = handlePokemonName() ? handlePokemonName().second.toLowerCase() : " hello";
    const thirdPokemon = handlePokemonName() ? handlePokemonName().third.toLowerCase() : " hello";
   
    // console.log(evolutionStage.types.firstForm[0].type.name)

    return (
    <div className="evolution-tree-container w-full ">
        <h4 className="text-2xl font-bold text-center mb-8">Evolution Tree</h4>

        <div className='flex justify-around items-center gap-x-8 mb-5'>
            <div className=' evolutionStage-wrapper'>
                    { firstForm && 
                        <div onClick={() => handleEvolutionStagesPreview(firstPokemon)} className={`evol-sprite-wrapper evolution-stages bg-gray-200 relative flex justify-center items-center rounded-full my-auto hover:bg-green-300`}>
                            <img src={firstForm}/>
                        </div>
                    }
            
                    {evolutionStage && 
                        <div className="relative">
                            <h3 className='evol-poke-name font-bold'> {handlePokemonName() && handlePokemonName().first} </h3>
                            <p className="evol-poke-id">{firstFormId}</p>
                            <div className='flex justify-center evol-type-container'>
                                {
                                    evolutionStage.types.firstForm.map((t, i) => {
                                        return <div key={i} className={`${t.type.name} bg-grass rounded-full  mt-2 py-1 px-4`}> {t.type.name}</div>
                                    })
                                }
                            </div>


                        </div>
                       }

                </div> 
            
                    {
                        secondForm && 
                        <div  className='evolutionStage-wrapper relative'>
                            {secondForm && 
                                <div onClick={() => handleEvolutionStagesPreview(secondPokemon)} className="evol-sprite-wrapper evolution-stages flex justify-center items-center bg-gray-200 rounded-full my-auto hover:bg-gray-300">
                                    <img src={secondForm}/>
                                </div>
                                }

                            {evolutionStage && 
                            <div className='relative'>
                                <div className='evolution-connnection bg-gray-200'></div>
                                <h3 className='evol-poke-name font-bold'> {handlePokemonName() && handlePokemonName().second} </h3>
                                <p className="evol-poke-id">{secondFormId}</p>

                                    <div className='flex justify-center evol-type-container'>
                                    {
                                        evolutionStage.types.firstForm.map((t, i) => {
                                            return <div key={i} className={`${t.type.name} bg-grass rounded-full  mt-2 py-1 `}> {t.type.name}</div>
                                        })
                                    }
                                    </div>
                                </div>

                                }
                                 <MdKeyboardArrowLeft className="evol-tree-arrow absolute  text-2xl opacity-50 rotate-180 " />
                         </div>
                    }
               
                    {lastForm && 
                    <div  className='evolutionStage-wrapper relative'>
                        {lastForm && 
                            <div onClick={() => handleEvolutionStagesPreview(thirdPokemon)} className="evol-sprite-wrapper evolution-stages  flex justify-center items-center bg-gray-200 rounded-full my-auto hover:bg-gray-300">
                              <img src={lastForm}/>
                            </div>
                            }

                        {evolutionStage && 
                        <div className='relative'>
                            <div className='evolution-connnection bg-gray-200'></div>
                            <h3 className='evol-poke-name font-bold'> {handlePokemonName() && handlePokemonName().third} </h3>
                            <p className="evol-poke-id">{thirdFormId}</p>
                          
                            <div className='flex justify-center evol-type-container'>
                                {
                                    evolutionStage.types.thirdForm.map((t, i) => {
                                        return <div key={i} className={`${t.type.name} bg-grass rounded-full mt-2 py-1 px-3`}> {t.type.name}</div>
                                    })
                                }
                            </div>
                        
                            </div>
                            }

                             <MdKeyboardArrowLeft className="evol-tree-arrow absolute text-2xl opacity-50 rotate-180 " />
                    </div>
                    }
        </div>
     </div>
  )
}

export default PokemonEvolutionStages