import Icon from "../assets/iconSeminar.png"
export const Header = () => {
    return (
        <header className="w-full flex justify-center items-center shadow-xl mb-7">
            <img src={Icon} alt="" />
            <h1 className="font-extrabold text-2xl">SeminarsList</h1>
        </header>
    )

};
