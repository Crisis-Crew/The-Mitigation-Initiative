import { LaptopMinimalCheck } from "lucide-react"
export default function Mobile(){
    return (
        <>
            <div className="h-screen w-screen section pt-32! flex flex-col justify-center items-center gap-2">
                <h1 className="text-2xl font-extrabold text-center font-doto">
                    Please use a larger Device
                   
                </h1>
                 <LaptopMinimalCheck size={64} fill="var(--color-accent)" stroke={"var(--color-emerald-600)"}/>
            </div>
        </>
    )
}