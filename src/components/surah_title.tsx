
function SurahTitle({name,arabicName}:{name:string,arabicName:string}){
    
    return (
        <div className={`flex flex-col items-center justify-center  gap-4 py-10 rounded-lg bg-gradient-to-l from-purple-50 via-white to-white`}>
            <h1 className="text-3xl font-bold text-blue-900">{name}</h1>
            <h2 className="text-xl font-bold text-blue-500">{arabicName}</h2>
        </div>
    )
}

export default SurahTitle;