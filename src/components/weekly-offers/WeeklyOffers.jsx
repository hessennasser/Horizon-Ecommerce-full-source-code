import RegisterCard from "./RegisterCard"
import WeeklyOffersCards from "./WeeklyOffersCards"
import ImageCard from "./imageCard";
import "./styles.css"

const weeklyOffers = ({ imageCard, isMarginTop }) => {
    const userLogged = localStorage.getItem("userLogged");
    isMarginTop = false
    return (
        <div className={`px-5 md:-translate-y-20 relative z-10 grid grid-cols-1 md:grid-cols-3 mt-24 ${isMarginTop ? "md:-translate-y-32" : ""}`}>
            {imageCard ?
                <>
                    <ImageCard />
                    <WeeklyOffersCards imageCard={true} />
                </>
                :
                <>
                    <WeeklyOffersCards widthFull={userLogged} />
                    {
                        !userLogged && <RegisterCard />
                    }
                </>
            }
        </div>
    )
}

export default weeklyOffers
