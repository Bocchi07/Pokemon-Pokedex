import React, {useState} from 'react'

function PokemonEvolutionStages({evolutionStage, firstForm, secondForm, lastForm}) {
    const [pokemonName, setPokemonName] = useState([]); 
 
   
    
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

    console.log(handlePokemonName())

    return (
    <div className="w-[40%] h-80 ">
        <h4 className="text-lg font-semibold text-left mb-8">Evolution Stages</h4>

        <div className='flex justify-center items-center gap-x-8 pr-4'>
            <div>
                    {firstForm && <div className="flex justify-center items-center bg-gray-200 p-4 rounded-full my-auto ">
                        <img src={firstForm}/>
                        </div>
                    }
            
                    {evolutionStage && <div>
                        <h3> {handlePokemonName() && handlePokemonName().first} </h3>
                        </div>
                        }
                </div> 
            
                <div>   
                    {secondForm && <div className="flex justify-center items-center bg-gray-200 p-4 rounded-full my-auto">
                        <img src={secondForm}/>
                        </div>
                        }

                    {evolutionStage && <div >
                        <h3> {handlePokemonName() && handlePokemonName().second} </h3>
                        </div>
                        }
                </div>

                <div>
                    {lastForm && <div className="flex justify-center items-center bg-gray-200 p-4 rounded-full my-auto ">
                        <img src={lastForm}/>
                        </div>
                        }

                    {evolutionStage && <div >
                        <h3> {handlePokemonName() && handlePokemonName().third} </h3>
                        </div>
                        }
                </div>
        </div>
     </div>
  )
}

export default PokemonEvolutionStages